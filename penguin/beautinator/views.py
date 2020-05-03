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


def service_open_timeslots(request, service_id):               #timesloturile din orar
    open = Services.objects.get(id=service_id)
    openstr = open[0].open_timeslots   #string de 0 si 1
    return JsonResponse({"open_timeslots": openstr})


def service_available_timeslots(request, service_id):          #timesloturile libere din orar
    available = Services.objects.get(id=service_id)
    availablestr = available[0].available_timeslots   #string de 0 si 1
    return JsonResponse({"open_timeslots": availablestr})


def next_available_timeslot_for_service(request, service_id, current_timeslot): #returneaza -1 daca nu exista sau un int ce reprezinta un timeslot
    available = Services.objects.get(id=service_id)
    availablestr = available[0].available_timeslots
    next_available = -1
    for i in range(current_timeslot+1 , len(availablestr)):
        if availablestr[i] == 1:
            return JsonResponse({"next_available_timeslot": i})


def add_user(request, email, password, first_name, last_name):
    user = Users.objects.create(email=email, password=password, first_name=first_name, last_name=last_name)


def add_salon(request, email, password, name, address):
    salon = Salons.objects.create(email=email, password=password, name=first, address=address)


def add_service(request, salon, employee, title, description, price, open_timeslots, available_timeslots):
    service = Services.objects.create(salon=salon, employee=employee, title=title, description=description, price=price, open_timeslots=open_timeslots, available_timeslots=available_timeslots)

