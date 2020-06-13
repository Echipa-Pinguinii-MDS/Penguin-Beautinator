from django.forms.models import model_to_dict
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse, HttpResponse
import json
from datetime import timedelta, date, time

from itertools import permutations

from .models import User, Salon, Service, Appointment, Location


def time_to_int(gvn_time):
    return int((gvn_time.hour * 60 + gvn_time.minute) // 15)


def duration_to_int(duration):
    return int((duration.total_seconds() // 60) // 15)


def duration_in_minutes(duration):
    return int(duration.total_seconds() // 60)


def int_to_duration(duration):
    return timedelta(minutes=(15 * duration))


def int_to_time(index):
    minutes = index * 15
    return time(hour=minutes // 60, minute=minutes % 60)


def get_data_from_request(request, is_test=False):
    if not is_test:
        return json.loads(request.body.decode('utf-8'))
    return request.POST


def user_data_by_email(request, is_test=False):
    data = get_data_from_request(request, is_test)
    email = data['user_email']

    try:
        data = User.objects.get(email=email)
    except (KeyError, User.DoesNotExist):
        return HttpResponse("No user with email: " + email, status=404)
    else:
        user = model_to_dict(data)
        user.pop('password')
        user['birthday'] = user['birthday'].__str__()
        user['gender'] = data.get_gender()
        return JsonResponse({"user_data": user})


def user_data_by_id(request, is_test=False):
    data = get_data_from_request(request, is_test)
    user_id = data['user_id']
    # full_id = data['user_id']
    # user_id = full_id[1:len(full_id)]
    # if full_id[0] != 'u':
    #     return JsonResponse({"user_data": None})

    try:
        data = User.objects.get(id=user_id)
    except (KeyError, User.DoesNotExist):
        return HttpResponse("User " + user_id + " does not exist", status=404)
    else:
        user = model_to_dict(data)
        user.pop('password')
        user['birthday'] = user['birthday'].__str__()
        user['gender'] = data.get_gender()
        return JsonResponse({"user_data": user})


def salons_list(request):
    salons = list(Salon.objects.values())
    for i in range(len(salons)):
        salons[i].pop('password')
        salons[i]['location'] = Location.objects.get(pk=salons[i]['location_id']).__str__()
        salons[i].pop('location_id')
    return JsonResponse({"salons_list": salons})


def salon_data_by_id(request, salon_id):
    try:
        data = Salon.objects.get(id=salon_id)
    except (KeyError, Salon.DoesNotExist):
        return HttpResponse("Salon " + salon_id + " does not exist", status=404)
    else:
        salon = model_to_dict(data)
        salon.pop('password')
        salon['location'] = data.get_location()

        return JsonResponse({"salon_data": salon})


def salon_services(request, salon_id):
    services = list(Service.objects.filter(salon=salon_id).values())
    for service in services:
        service['duration'] = duration_in_minutes(service['duration'])
        service['category'] = Service.objects.get(pk=service['id']).get_category()
        service.pop('salon_id')
    return JsonResponse({"salon_services": services})


def user_appointments(request):
    data = json.loads(request.body.decode('utf-8'))
    user_id = data['user_id']

    appointments = list(Appointment.objects.filter(client_id=user_id).values())
    for appointment in appointments:
        appointment['start_date_time'] = appointment['start_date_time'].__str__()
        appointment.pop('client_id')
        service = Service.objects.get(pk=appointment['service_id'])
        appointment.pop('service_id')
        appointment['price'] = service.price
        appointment['duration'] = service.duration_in_minutes()
        appointment['service'] = service.get_category() + ': ' + service.title
        appointment['salon_id'] = service.salon_id

    return JsonResponse({"user_appointments": appointments})


def salon_appointments(request, is_test = False):
    data = get_data_from_request(request, is_test)
    salon_id = data['salon_id']

    services = Service.objects.filter(salon_id=salon_id)
    appointments = []
    for service in services:
        service_appointments = Appointment.objects.filter(service=service).values()
        for appointment in service_appointments:
            appointment['start_date_time'] = appointment['start_date_time'].__str__()
            appointment['price'] = service.price
            appointment['duration'] = service.duration_in_minutes()
            appointment['service'] = service.get_category() + ': ' + service.title
            appointment.pop('service_id')
        appointments.extend(service_appointments)

    return JsonResponse({"salon_appointments": appointments})


def available_hours(request, is_test=False):
    data = get_data_from_request(request, is_test)

    day = date.fromisoformat(data['date'])

    salon_id = data['salon_id']
    try:
        salon = Salon.objects.get(pk=salon_id)
    except (KeyError, Salon.DoesNotExist):
        return HttpResponse("Salon " + salon_id + " does not exist", status=418)

    services_id = data['services']
    services = {}
    for service_id in services_id:
        try:
            service = Service.objects.get(pk=service_id)
        except (KeyError, Service.DoesNotExist):
            return HttpResponse("Service " + services_id + " does not exist", status=418)

        if service.category not in services.keys():
            services[service.category] = 0
        services[service.category] += service.duration_to_int()

    categories = []
    booked_hours = {}
    for (key, value) in services:
        booked_hours[key] = [True] * (4 * 9)
        booked_hours[key].extend([False] * (4 * 10))
        booked_hours[key].extend([True] * (4 * 5))
        categories.append(key)

    appointments = Appointment.objects.filter(start_date=day, salon=salon)
    for appointment in appointments:
        category = appointment.service.category
        if category in booked_hours.keys():
            start = appointment.start_time_to_int()
            size = appointment.duration_to_int()
            for i in range(start, start + size):
                booked_hours[category][i] = True

    start_hours = []
    for hour in range(4 * 24):
        for perm in permutations(categories):
            current_hour = hour
            check = True
            for category in perm:
                for i in range(current_hour, current_hour + services[category]):
                    if booked_hours[category][i]:
                        check = False
                current_hour += services[category]

            if check:
                start_hours.append(int_to_time(hour).__str__())
                break

    return JsonResponse({'available_hours': start_hours})


def add_user(request):
    data = json.loads(request.body.decode('utf-8'))
    email = data['user_email']
    password = data['user_password']
    first_name = data['user_first_name']
    last_name = data['user_last_name']
    phone = data['phone']
    birthday = date.fromisoformat(data['birthday'])
    gender = data['gender']

    if User.objects.filter(email=email).exists():
        return JsonResponse({'added': False, 'message': 'Email already registered'})

    user = User(email=email,
                password=password,
                first_name=first_name,
                last_name=last_name,
                phone=phone,
                birthday=birthday,
                gender=gender)
    user.save()

    return JsonResponse({'added': True})


def add_salon(request):
    data = json.loads(request.body.decode('utf-8'))
    email = data['salon_email']
    password = data['salon_password']
    name = data['salon_name']
    description = data['description']
    address = data['salon_address']
    phone = data['phone']
    women_services = data['women_services']
    men_services = data['men_services']
    kids_services = data['kids_services']
    location = Location.objects.get(pk=data['location_id'])

    if Salon.objects.filter(email=email).exists():
        return JsonResponse({'added': False, 'message': 'Email already registered'})

    salon = Salon(
        email=email,
        password=password,
        name=name,
        description=description,
        address=address,
        phone=phone,
        location=location,
        women_services=women_services,
        men_services=men_services,
        kids_services=kids_services)
    salon.save()

    return JsonResponse({'check': True})


def add_service(request):
    data = json.loads(request.body.decode('utf-8'))
    salon = Salon.objects.get(pk=data['salon_id'])
    category = data['service_category']
    title = data['service_title']
    description = data['service_description']
    price = data['service_price']
    duration = int_to_duration(data['service_duration'])

    service = Service(
        salon=salon,
        category=category,
        title=title,
        description=description,
        price=price,
        duration=duration)
    service.save()


# def add_appointment(request):



"""Daca user-ul si parola sunt bune returneaza
id ul user-ului precedat de 'u' 
Daca doar parola nu e buna returneaza check_password false
Daca user-ul nu e bun returneaza check_user false"""


@csrf_exempt
def user_login(request, is_test=False):
    data = get_data_from_request(request, is_test)
    email = data['user_email']

    try:
        user = User.objects.get(email=email)
    except (KeyError, User.DoesNotExist):
        return JsonResponse({"check_user": False})
    else:
        password = data['user_password']
        if password == user.password:
            current_id = user.pk
        else:
            return JsonResponse({
                "check_user": True,
                "check_password": False})
        output = 'u' + str(current_id)
        return JsonResponse({
            "check_user": True,
            "check_password": True,
            "user_id": output})


"""Daca salonul si parola sunt bune returneaza
id ul salonului precedat de 's' 
Daca doar parola nu e buna returneaza check_password false
Daca salonul nu e bun returneaza check_user false"""


def salon_login(request, is_test=False):
    data = get_data_from_request(request, is_test)
    email = data['user_email']

    try:
        salon = Salon.objects.get(email=email)
    except (KeyError, Salon.DoesNotExist):
        return JsonResponse({"check_user": False})
    else:
        password = data['user_password']
        if password == salon.password:
            current_id = salon.pk
        else:
            return JsonResponse({
                "check_user": True,
                "check_password": False
            })
        output = 's' + str(current_id)
        return JsonResponse({
            "check_user": True,
            "check_password": True,
            "salon_id": output
        })
