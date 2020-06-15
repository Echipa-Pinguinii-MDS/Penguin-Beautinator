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


@csrf_exempt
def user_data_by_id(request, is_test=False):
    data = get_data_from_request(request, is_test)
    user_id = data['user_id']

    try:
        data = User.objects.get(id=user_id)
    except (KeyError, User.DoesNotExist):
        return HttpResponse("User " + str(user_id) + " does not exist", status=404)
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
        return HttpResponse("Salon " + str(salon_id) + " does not exist", status=404)
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


def user_appointments(request, is_test):
    data = get_data_from_request(request, is_test)
    user_id = data['user_id']

    appointments = list(Appointment.objects.filter(client_id=user_id).values())
    for appointment in appointments:
        appointment['day'] = appointment['day'].__str__()
        appointment['start_time'] = appointment['start_time'].__str__()
        appointment.pop('client_id')
        service = Service.objects.get(pk=appointment['service_id'])
        appointment.pop('service_id')
        appointment['price'] = service.price
        appointment['service'] = {service.get_category(): service.title}
        appointment['salon_id'] = service.salon_id
        appointment['duration'] = service.duration_in_minutes()
        appointment['salon_name'] = service.salon.name

    return JsonResponse({"user_appointments": appointments})


def salon_appointments(request, is_test=False):
    data = get_data_from_request(request, is_test)
    salon_id = data['salon_id']

    services = Service.objects.filter(salon_id=salon_id)
    appointments = []
    for service in services:
        service_appointments = Appointment.objects.filter(service=service).values()
        for appointment in service_appointments:
            appointment['day'] = appointment['day'].__str__()
            appointment['start_time'] = appointment['start_time'].__str__()
            appointment['price'] = service.price
            appointment['duration'] = service.duration_in_minutes()
            appointment['service'] = service.get_category() + ': ' + service.title
            appointment.pop('service_id')
            user = User.objects.get(pk=appointment['client_id'])
            appointment['client_name'] = user.first_name + ' ' + user.last_name
        appointments.extend(service_appointments)

    return JsonResponse({"salon_appointments": appointments})


def available_hours_per_category(salon, day, categories):
    appointments = Appointment.objects.filter(day=day, service__salon=salon)
    booked_hours = {}

    for category in categories:
        booked_hours[category] = [True] * (4 * 9)
        booked_hours[category].extend([False] * (4 * 10))
        booked_hours[category].extend([True] * (4 * 5))

    for appointment in appointments:
        category = appointment.service.category
        if category in categories:
            start = appointment.start_time_to_int()
            size = appointment.duration_to_int()
            for i in range(start, start + size):
                booked_hours[category][i] = True

    return booked_hours


def get_services(services_id):
    services = {}
    for service_id in services_id:
        try:
            service = Service.objects.get(pk=service_id)
        except (KeyError, Service.DoesNotExist):
            return HttpResponse("Service " + str(service_id) + " does not exist", status=418)

        if service.category not in services.keys():
            services[service.category] = []
        services[service.category].append(service)

    return services


def is_available(categories, start_index, services, booked):
    current_index = start_index
    for category in categories:
        for i in range(current_index, current_index + services[category]):
            if booked[category][i]:
                return False
        current_index += services[category]
    return True


def get_services_duration(services):
    services_duration = {}
    for key in services.keys():
        services_duration[key] = 0
        for service in services[key]:
            services_duration[service.category] += service.duration_to_int()
    return services_duration


def available_hours(request, is_test=False):
    data = get_data_from_request(request, is_test)

    day = date.fromisoformat(data['day'])

    salon_id = data['salon_id']
    try:
        salon = Salon.objects.get(pk=salon_id)
    except (KeyError, Salon.DoesNotExist):
        return HttpResponse("Salon " + str(salon_id) + " does not exist", status=418)

    services_list = get_services(data['services'])
    if type(services_list) == HttpResponse:
        return services_list

    services_duration = get_services_duration(services_list)
    categories = services_duration.keys()
    booked_hours = available_hours_per_category(salon, day, categories)

    start_hours = []
    for hour in range(4 * 24):
        for perm in permutations(categories):
            if is_available(perm, hour, services_duration, booked_hours):
                start_hours.append(int_to_time(hour).__str__())
                break

    return JsonResponse({'available_hours': start_hours})


def add_user(request, is_test=False):
    data = get_data_from_request(request, is_test)
    email = data['user_email']
    password = data['user_password']
    first_name = data['user_first_name']
    last_name = data['user_last_name']
    phone = data['user_phone']
    birthday = date.fromisoformat(data['user_birthday'])
    gender = data['user_gender']

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


def update_user(request, is_test=False):
    data = get_data_from_request(request, is_test)
    user_id = data['user_id']
    first_name = data['user_first_name']
    last_name = data['user_last_name']
    phone = data['user_phone']
    birthday = date.fromisoformat(data['user_birthday'])
    gender = data['user_gender']

    try:
        user = User.objects.get(pk=user_id)
    except (KeyError, User.DoesNotExist):
        return HttpResponse("User " + str(user_id) + " does not exist", status=418)

    user.last_name = last_name
    user.first_name = first_name
    user.phone = phone
    user.birthday = birthday
    user.gender = gender
    user.save()

    return JsonResponse({'updated': True})


def add_salon(request, is_test=False):
    data = get_data_from_request(request, is_test)
    email = data['salon_email']
    password = data['salon_password']
    name = data['salon_name']
    description = data['description']
    address = data['salon_address']
    phone = data['phone']
    women_services = data['women_services']
    men_services = data['men_services']
    kids_services = data['kids_services']
    logo = data['logo']
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
        kids_services=kids_services,
        logo=logo)
    salon.save()

    return JsonResponse({'added': True})


def add_service(request, is_test=False):
    data = get_data_from_request(request, is_test)
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


def add_appointment(request, is_test=False):
    data = get_data_from_request(request, is_test)
    client_id = data['user_id']
    salon_id = data['salon_id']
    services_id = data['services']
    day = date.fromisoformat(data['day'])
    start_time = time.fromisoformat(data['time'])

    try:
        salon = Salon.objects.get(pk=salon_id)
    except (KeyError, Salon.DoesNotExist):
        return HttpResponse("Salon " + str(salon_id) + " does not exist", status=418)

    try:
        user = User.objects.get(pk=client_id)
    except (KeyError, User.DoesNotExist):
        return HttpResponse("User " + str(client_id) + " does not exist", status=418)

    services = get_services(services_id)
    if type(services) == HttpResponse:
        return services

    services_duration = get_services_duration(services)
    categories = services.keys()
    booked_hours = available_hours_per_category(salon, day, categories)

    check = False
    start_index = time_to_int(start_time)
    for perm in permutations(categories):
        if is_available(perm, start_index, services_duration, booked_hours):
            categories = perm
            check = True
            break

    if not check:
        return JsonResponse({'added': False, 'message': 'Time not available'})

    for category in categories:
        for service in services[category]:
            appointment = Appointment(
                client=user,
                service=service,
                day=day,
                start_time=int_to_time(start_index)
            )
            appointment.save()
            start_index += service.duration_to_int()

    return JsonResponse({'added': True})


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
