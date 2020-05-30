from django.forms.models import model_to_dict
from django.http import JsonResponse

from .models import Users, Salons, Services, Appointments


def check_email(request):
    email = request.POST['user_email']

    return JsonResponse({"check_email": Users.objects.filter(email=email).exists()})


def user_data_by_email(request):
    user_email = request.POST['user_email']

    try:
        data = Users.objects.get(email=user_email)
    except (KeyError, Users.DoesNotExist):
        return JsonResponse({"user_data": None})
    else:
        return JsonResponse({"user_data": model_to_dict(data)})


def user_data_by_id(request):
    user_id = request.POST['user_id']

    try:
        data = Users.objects.get(id=user_id)
    except (KeyError, Users.DoesNotExist):
        return JsonResponse({"user_data": None})
    else:
        return JsonResponse({"user_data": model_to_dict(data)})


def salons_list(request):
    salons = Salons.objects.values()
    return JsonResponse({"salons_list": list(salons)})


def all_services(request):
    services = Services.objects.values()
    return JsonResponse({"all_services": list(services)})


def salon_data_by_id(request, salon_id):
    try:
        data = Salons.objects.get(id=salon_id)
    except (KeyError, Salons.DoesNotExist):
        return JsonResponse({"salon_data": None})
    else:
        return JsonResponse({"salon_data": model_to_dict(data)})


def salon_services(request, salon_id):
    #salon_id = request.POST['salon_id']

    services = Services.objects.filter(salon=salon_id).values()
    return JsonResponse({"salon_services": list(services)})


def user_appointments(request):
    user_id = request.POST['user_id']

    appts = Appointments.objects.filter(client=user_id).values()
    return JsonResponse({"user_appointments": list(appts)})


# timesloturile din orar
def service_open_timeslots(request):
    service_id = request.POST['service_id']

    open = Services.objects.get(id=service_id)
    # string de 0 si 1
    return JsonResponse({"open_timeslots": open.open_timeslots})


# timesloturile libere din orar
def service_available_timeslots(request):
    service_id = request.POST['service_id']

    available = Services.objects.get(id=service_id)
    # string de 0 si 1
    return JsonResponse({"open_timeslots": available.available_timeslots})


# returneaza None daca nu exista sau un int ce reprezinta un timeslot
def service_next_available_timeslot(request):
    service_id = request.POST['service_id']
    current_timeslot = request.POST['current_timeslot']

    available = Services.objects.get(id=service_id)
    availablestr = available.available_timeslots
    for i in range(current_timeslot + 1, len(availablestr)):
        if availablestr[i] == 1:
            return JsonResponse({"next_available_timeslot": i})
    return JsonResponse({"next_available_timeslot": None})


def add_user(request):
    email = request.POST['user_email']
    password = request.POST['user_password']
    first_name = request.POST['user_first_name']
    last_name = request.POST['user_last_name']

    user = Users(email=email, password=password, first_name=first_name, last_name=last_name)
    user.save()


def add_salon(request):
    email = request.POST['salon_email']
    password = request.POST['salon_password']
    name = request.POST['salon_name']
    address = request.POST['salon_address']

    # Cam asa ar trebui sa arate asta, altfel nu salveaza, dar nu-s sigura de sintaxa
    # salon = Salons.objects.create(email=email, password=password, name=name, address=address)
    # entry.salons.add(salon)
    # In schimb iti recomand forma asta
    salon = Salons(email=email, password=password, name=name, address=address)
    salon.save()


def add_service(request):
    salon = request.POST['salon_id']
    employee = request.POST['service_employee']
    title = request.POST['service_title']
    description = request.POST['service_description']
    price = request.POST['service_price']
    # Tine cont ca e mai probabil sa primesti orar pentru tot salonul si sa trebuiasca mutat de mana aici
    # De asemenea ar trebui sa tinem cont ca probabil frontendul nu o sa fie sa trimita direct stringul pt asta
    # ci o lista de ore, dar vorbim cu ei
    open_timeslots = request.POST['service_open_timeslots']
    # Putin probabil sa vina deja cu chestii ocupate atunci cand e adaugat
    available_timeslots = request.POST['service_available_timeslots']

    service = Services(salon=salon, employee=employee, title=title, description=description, price=price,
                       open_timeslots=open_timeslots, available_timeslots=available_timeslots)
    service.save()


"""Daca user-ul si parola sunt bune returneaza
id ul user-ului precedat de 'u' 
Daca doar parola nu e buna returneaza check_password false
Daca user-ul nu e bun returneaza check_user false"""


def user_login(request):
    email = request.POST['user_email']
    password = request.POST['user_password']

    try:
        user = Users.objects.get(email=email)
    except (KeyError, Users.DoesNotExist):
        return JsonResponse({"check_user": False})
    else:
        if password == user.password:
            current_id = user.pk
        else:
            return JsonResponse({"check_password": False})
        output = 'u' + str(current_id)
        return JsonResponse({"user_id": output})


"""Daca salonul si parola sunt bune returneaza
id ul salonului precedat de 's' 
Daca doar parola nu e buna returneaza check_password false
Daca salonul nu e bun returneaza check_user false"""


def salon_login(request):
    email = request.POST['user_email']
    password = request.POST['user_password']

    try:
        salon = Salons.objects.get(email=email)
    except (KeyError, Salons.DoesNotExist):
        return JsonResponse({"check_user": False})
    else:
        if password == salon.password:
            current_id = salon.pk
        else:
            return JsonResponse({"check_password": False})
        output = 's' + str(current_id)
        return JsonResponse({"user_id": output})
