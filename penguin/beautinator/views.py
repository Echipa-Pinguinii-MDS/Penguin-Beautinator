from django.shortcuts import render


# Create your views here.
def check_email(request, email):
    isthere = Users.objects.exists(email=email)
    return JsonResponse({"check_email": isthere})


def check_password(request, email, password):
    user = Users.objects.get(email=email)
    if password == user.password:
        correct = True
    else:
        correct = False
    return JsonResponse({"check_password": correct})


def user_data_by_email(request, user_mail):
    data = Users.objects.get(email=user_mail)
    return JsonResponse({"user_data": list(data)})


def user_data_by_id(request, user_id):
    data = Users.objects.get(id=user_id)
    return JsonResponse({"user_data": list(data)})


def salons_list(request):
    salons = Salon.objects.all()
    return JsonResponse({"salons_list": list(salons)})


def all_services(request):
    services = Services.objects.all()
    return JsonResponse({"all_services": list(services)})


def salon_services(request, salon_id):
    services = Services.objects.get(salon=salon_id)
    return JsonResponse({"salon_services": list(services)})


def user_appointments(request, user_id):
    appts = Appointments.objects.get(client=user_id)
    return JsonResponse({"user_appointments": list(appts)})


def add_user(request, email, password, first_name, last_name):
    user = User.objects.create(email=email, password=password, first_name=first_name, last_name=last_name)
