from django.forms.models import model_to_dict
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
import json
from datetime import timedelta

from .models import User, Salon, Service, Appointment, Location


def time_to_int(gvn_time):
    return (gvn_time.hour * 60 + gvn_time.minute) // 15


def duration_to_int(duration):
    return (duration.total_seconds() // 60) // 15


def int_to_duration(duration):
    return timedelta(minutes=(15 * duration))


def get_data_from_request(request, is_test=False):
    if not is_test:
        return json.loads(request.body.decode('utf-8'))
    return request.POST


def check_email(request):
    data = json.loads(request.body.decode('utf-8'))
    email = data['user_email']

    return JsonResponse({"check_email": User.objects.filter(email=email).exists()})


def user_data_by_email(request, is_test=False):
    data = get_data_from_request(request, is_test)
    #data = json.loads(request.body.decode('utf-8'))
    email = data['user_email']

    try:
        data = User.objects.get(email=email)
    except (KeyError, User.DoesNotExist):
        return JsonResponse({"user_data": None})
    else:
        return JsonResponse({"user_data": model_to_dict(data)})


def user_data_by_id(request, is_test=False):
    data = get_data_from_request(request, is_test)
    full_id = data['user_id']
    user_id = full_id[1:len(full_id)]
    if full_id[0] != 'u':
        return JsonResponse({"user_data": None})

    try:
        data = User.objects.get(id=user_id)
    except (KeyError, User.DoesNotExist):
        return JsonResponse({"user_data": None})
    else:
        return JsonResponse({"user_data": model_to_dict(data)})


def salons_list(request):
    salons = Salon.objects.values()
    return JsonResponse({"salons_list": list(salons)})


def salon_data_by_id(request, salon_id):
    try:
        data = Salon.objects.values().get(id=salon_id)
    except (KeyError, Salon.DoesNotExist):
        return JsonResponse({"salon_data": None})
    else:
        data.pop("password")
        return JsonResponse({"salon_data": data})


def salon_services(request, salon_id):
    services = Service.objects.filter(salon=salon_id).values()
    return JsonResponse({"salon_services": list(services)})


def user_appointments(request):
    data = json.loads(request.body.decode('utf-8'))
    user_id = data['user_id']

    appts = Appointment.objects.filter(client=user_id).values()
    return JsonResponse({"user_appointments": list(appts)})


# def available_hours(request, is_test=False):
#     data = get_data_from_request(request, is_test)




def add_user(request):
    data = json.loads(request.body.decode('utf-8'))
    email = data['user_email']
    password = data['user_password']
    first_name = data['user_first_name']
    last_name = data['user_last_name']
    phone_no = data['phone_no']
    # birthday = data['birthday']
    gender = data['gender']

    user = User(email=email,
                password=password,
                first_name=first_name,
                last_name=last_name,
                phone_no=phone_no,
                # birthday=birthday,
                gender=gender)
    user.save()


def add_salon(request):
    data = json.loads(request.body.decode('utf-8'))
    email = data['salon_email']
    password = data['salon_password']
    name = data['salon_name']
    description = data['description']
    address = data['salon_address']
    phone_no = data['phone_no']
    women_services = data['women_services']
    men_services = data['men_services']
    kids_services = data['kids_services']
    location = Location.objects.get(pk=data['location_id'])

    salon = Salon(
        email=email,
        password=password,
        name=name,
        description=description,
        address=address,
        phone_no=phone_no,
        location=location,
        women_services=women_services,
        men_services=men_services,
        kids_services=kids_services)
    salon.save()


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
