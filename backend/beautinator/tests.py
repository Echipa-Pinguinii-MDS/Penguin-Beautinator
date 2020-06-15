import datetime
import random
import string
import json
import os
import requests

#from django.core.handlers import wsgi
from random import randint
from django.test import TestCase, Client
from django.forms.models import model_to_dict
from django.http import JsonResponse
from django.http import HttpRequest
from .views import *
from .models import *


def create_user(email, password):
    """
    Creates a user with the given email and password
    """
    return User.objects.create(email=email, password=password)


def create_salon(email, password, loc_id):
    """
    Creates a salon with the given email and password
    """
    loc = Location(loc_id)
    loc.save()
    return Salon.objects.create(email=email, password=password, location_id=loc.id)


def create_data():
    """
    Creates some data for the test
    """
    users = []
    for i in range(3):
        mail = ''.join(random.choices(string.printable, k=12))
        while len(User.objects.filter(email=mail)) > 0:
            mail = ''.join(random.choices(string.printable, k=12))
        pw = ''.join(random.choices(string.printable, k=6))
        pw = 'pas' + pw
        name1 = 'elita' + str(i)
        name2 = 'tare' + str(i)
        phon = str(i) + str(i) + str(i)
        gen = 'M' if i == 0 else 'F' if i == 1 else 'N'
        u = User(email=mail, password=pw, first_name=name1,
                 last_name=name2, phone=phon, gender=gen)
        u.save()
        users.append(u)

    locations = []
    for i in range(3):
        cnty = 'PH' if i < 2 else 'MS'
        loc = Location(i + 1, country='RO', county=cnty, city='Fierbinti' + str(i + 1))
        loc.save()
        locations.append(loc)

    salons = []
    for i in range(3):
        mail = ''.join(random.choices(string.printable, k=12))
        pw = ''.join(random.choices(string.printable, k=6))
        pw = 'pas' + pw
        name = 'beauty of ' + str(i + 1)
        phon = str(i) + str(i) + str(i)
        loc = locations[i]
        address = str(i) + ' street'
        wom = True if i < 2 else False
        m = False if i < 1 else True
        k = True if i == 2 else False
        sal = Salon(email=mail, password=pw, name=name, phone=phon,
                    location_id=loc.id, address=address, women_services=wom,
                    men_services=m, kids_services=k)
        sal.save()
        salons.append(sal)

    services = []
    for i in range(6):
        sal = salons[i % 3]
        cat = random.choice(['FH', 'BE', 'MH', 'MP', 'MG'])
        t = "service" + str(i)
        pr = random.random() * 77
        ser = Service(salon_id=sal.id, category=cat, title=t, price=pr)
        ser.save()
        services.append(ser)

    appo = []
    for i in range(5):
        cl = users[i % 3]
        ser = services[i % 6]#random.choice(services)
        startd = datetime.date(randint(2005,2025), randint(1,12),randint(1,28))
        startt = time(hour=4, minute=20)
        a = Appointment(client_id=cl.id, service_id=ser.id, start_time=startt,
                        day=startd)
        a.save()
        appo.append(a)



class AppointmentsModelTests(TestCase):
    def test_add_appointment_user_not_existing(self):
        """
        Checks what happens when the appointment's client
        is not in database
        """
        create_data()
        uid = len(User.objects.all().values()) + 1
        sid = len(Salon.objects.all().values())
        sids = [len(Service.objects.all().values()) - 1,
                len(Service.objects.all().values())]
        dict = {
            'user_id': uid,
            'salon_id': sid,
            'services': sids,
            'day': '2020-07-03',
            'time': '16:20:00'
        }
        req = HttpRequest()
        req.POST = dict
        res = add_appointment(req, True)
        self.assertEqual(res.status_code, 418)

    def test_add_appointment_salon_not_existing(self):
        """
        Checks what happens when the appointment's salon
        is not in database
        """
        create_data()
        uid = len(User.objects.all().values())
        sid = len(Salon.objects.all().values()) + 1
        sids = [len(Service.objects.all().values()) - 1,
                len(Service.objects.all().values())]
        dict = {
            'user_id': uid,
            'salon_id': sid,
            'services': sids,
            'day': '2020-07-03',
            'time': '16:20:00'
        }
        req = HttpRequest()
        req.POST = dict
        res = add_appointment(req, True)
        self.assertEqual(res.status_code, 418)

    def test_add_appointment_service_not_existing(self):
        """
        Checks what happens when the appointment's service
        is not in database
        """
        create_data()
        uid = len(User.objects.all().values())
        sid = len(Salon.objects.all().values())
        sids = [len(Service.objects.all().values()) + 1,
                len(Service.objects.all().values())]
        dict = {
            'user_id': uid,
            'salon_id': sid,
            'services': sids,
            'day': '2020-07-03',
            'time': '16:20:00'
        }
        req = HttpRequest()
        req.POST = dict
        res = add_appointment(req, True)
        self.assertEqual(res.status_code, 418)

    def test_add_appointment_not_all_services_in_the_salon(self):
        """
        Checks what happens when the appointment wants
        services that are not in the salon
        """
        create_data()
        uid = len(User.objects.all().values())
        sid = len(Salon.objects.all().values())
        sids = [len(Service.objects.all().values()) - 1,
                len(Service.objects.all().values())]
        new_id = len(Appointment.objects.all().values()) + 1
        dict = {
            'user_id': uid,
            'salon_id': sid,
            'services': sids,
            'day': '2020-07-03',
            'time': '16:20:00'
        }
        req = HttpRequest()
        req.POST = dict
        res = add_appointment(req, True)
        self.assertEqual(res.status_code, 200)
        a = Appointment.objects.get(pk=new_id)
        #print(a)

    def test_add_appointment_good_attempt(self):
        """
        Checks what happens when the appointment
        can be created
        """
        create_data()
        uid = 1
        sid = 1
        sids = [1, 4]
        new_id = len(Appointment.objects.all().values()) + 1
        dict = {
            'user_id': uid,
            'salon_id': sid,
            'services': sids,
            'day': '2020-07-03',
            'time': '16:30:00'
        }
        req = HttpRequest()
        req.POST = dict
        res = add_appointment(req, True)
        self.assertEqual(res.status_code, 200)
        a = Appointment.objects.get(pk=new_id)
        new_dict = model_to_dict(a)
        new_dict.pop('id')
        dict['services'] = dict['services'][0]
        dict['day'] = date.fromisoformat(dict['day'])
        dict['time'] = time.fromisoformat(dict['time'])
        self.assertEqual(set(dict.values()), set(new_dict.values()))



class ServiceModelTests(TestCase):
    def test_add_service_good_attempt(self):
        """
        Checks what happens when one tries to
        create an account with an email that is not used
        """
        create_data()
        sid = Salon.objects.all().values()[0]['id']
        new_id = len(Service.objects.all().values()) + 1
        dict = {
            'salon_id': sid,
            'service_category': 'BE',
            'service_title': 'blanaoizare',
            'service_description': 'eblanao',
            'service_price': 29.99,
            'service_duration': 2
        }
        req = HttpRequest()
        req.POST = dict
        res = add_service(req, True)
        service = Service.objects.get(pk=new_id)
        new_dict = model_to_dict(service)
        new_dict.pop('id')
        new_dict.pop('duration')
        dict.pop('service_duration')
        self.assertEqual(set(dict.values()), set(new_dict.values()))


class UserModelTests(TestCase):
    def test_user_login_wrong_email(self):
        """
        Checks what a wrong email will produce when
        trying to login
        """
        current = ''.join(random.choices(string.printable, k=12))
        while len(User.objects.filter(email=current)) > 0:
            current = ''.join(random.choices(string.printable, k=12))

        dictionary = {"user_email" : current}
        req = HttpRequest()
        req.POST = dictionary
        res = user_login(req, True)
        dictionary = json.loads(res.getvalue().decode('utf-8'))
        self.assertIs(res.status_code, 200)
        self.assertIs(dictionary["check_user"], False)

    def test_user_login_good_email_wrong_password(self):
        """
        Checks what a good email with a wrong password will produce
        when trying to login
        """
        current = ''.join(random.choices(string.printable, k=12))
        while len(User.objects.filter(email=current)) > 0:
            current = ''.join(random.choices(string.printable, k=12))

        create_user(current, "123456789")
        dictionary = {
            "user_email": current,
            "user_password": "12345678"
        }
        req = HttpRequest()
        req.POST = dictionary
        res = user_login(req, True)
        dictionary = json.loads(res.getvalue().decode('utf-8'))
        self.assertIs(res.status_code, 200)
        self.assertIs(dictionary["check_user"], True)
        self.assertIs(dictionary["check_password"], False)

    def test_user_login_good_attempt(self):
        """
        Checks how a good login attempt will behave
        """
        current = ''.join(random.choices(string.printable, k=12))
        while len(User.objects.filter(email=current)) > 0:
            current = ''.join(random.choices(string.printable, k=12))

        create_user(current, "123456789")
        dictionary = {
            "user_email": current,
            "user_password": "123456789"
        }
        req = HttpRequest()
        req.POST = dictionary
        res = user_login(req, True)
        dictionary = json.loads(res.getvalue().decode('utf-8'))
        self.assertIs(res.status_code, 200)
        self.assertIs(dictionary["check_user"], True)
        self.assertIs(dictionary["check_password"], True)
        user = User.objects.filter(email=current)[0]
        expected = 'u' + str(user.pk)
        self.assertEqual(dictionary["user_id"], expected)

    # def test_user_data_by_id_bad_id(self):
    #     """
    #     Checks what the function will return if
    #     the id provided is not in the good format
    #     """
    #     current = ''.join(random.choices(string.printable, k=12))
    #     while len(User.objects.filter(email=current)) > 0:
    #         current = ''.join(random.choices(string.printable, k=12))
    #
    #     create_user(current, "123456789")
    #     user = User.objects.filter(email=current)[0]
    #     dictionary = {"user_id": 's' + str(user.pk)}
    #     req = HttpRequest()
    #     req.POST = dictionary
    #     res = user_data_by_id(req, True)
    #     dictionary = json.loads(res.getvalue().decode('utf-8'))
    #     self.assertIs(res.status_code, 200)
    #     self.assertIs(dictionary["user_data"], None)

    def test_user_data_by_id_id_not_in_database(self):
        """
        Checks what the function will return if
        the id provided is not in the database
        """
        current = ''.join(random.choices(string.printable, k=12))
        while len(User.objects.filter(email=current)) > 0:
            current = ''.join(random.choices(string.printable, k=12))

        create_user(current, "123456789")
        user = User.objects.filter(email=current)[0]
        dictionary = {"user_id": (user.pk + 1)}
        req = HttpRequest()
        req.POST = dictionary
        res = user_data_by_id(req, True)
        #dictionary = json.loads(res.getvalue().decode('utf-8'))
        self.assertEqual(res.status_code, 404)
        #verifica ce intoarce res
        #self.assertEqual(res.)

    def test_user_data_by_id_good_attempt(self):
        """
        Checks the data returned when the id
        provided is valid and in the database
        """
        current = ''.join(random.choices(string.printable, k=12))
        while len(User.objects.filter(email=current)) > 0:
            current = ''.join(random.choices(string.printable, k=12))

        create_user(current, "123456789")
        user = User.objects.filter(email=current)[0]
        dictionary = {"user_id": user.pk}
        req = HttpRequest()
        req.POST = dictionary
        res = user_data_by_id(req, True)
        self.assertIs(res.status_code, 200)
        dictionary = json.loads(res.getvalue().decode('utf-8'))
        answer = dictionary["user_data"]
        self.assertEqual(answer["id"], user.pk)
        self.assertEqual(answer["email"], current)
        self.assertEqual("password" in answer.keys(), False)
        self.assertEqual(answer["first_name"], '')
        self.assertEqual(answer["birthday"], 'None')
        self.assertEqual(answer["gender"], '')

    def test_user_data_by_email_email_not_in_database(self):
        """
        Checks what the function will return if
        the email provided is not in the database
        """
        current = ''.join(random.choices(string.printable, k=12))
        while len(User.objects.filter(email=current)) > 0:
            current = ''.join(random.choices(string.printable, k=12))

        create_user(current, "123456789")
        dictionary = {"user_email": 'u' + current}
        req = HttpRequest()
        req.POST = dictionary
        res = user_data_by_email(req, True)
        self.assertEqual(res.status_code, 404)

    def test_user_data_by_email_good_attempt(self):
        """
        Checks the data returned when the id
        provided is valid and in the database
        """
        current = ''.join(random.choices(string.printable, k=12))
        while len(User.objects.filter(email=current)) > 0:
            current = ''.join(random.choices(string.printable, k=12))

        create_user(current, "123456789")
        dictionary = {"user_email": current}
        req = HttpRequest()
        req.POST = dictionary
        res = user_data_by_email(req, True)
        dictionary = json.loads(res.getvalue().decode('utf-8'))
        self.assertIs(res.status_code, 200)
        answer = dictionary["user_data"]
        user = User.objects.filter(email=current)[0]
        self.assertEqual(answer["id"], user.pk)
        self.assertEqual(answer["email"], current)
        self.assertEqual("password" in answer.keys(), False)
        self.assertEqual(answer["first_name"], '')
        self.assertEqual(answer["birthday"], 'None')
        self.assertEqual(answer["gender"], '')

    def test_user_appointments_id_not_in_database(self):
        current = ''.join(random.choices(string.printable, k=12))
        while len(User.objects.filter(email=current)) > 0:
            current = ''.join(random.choices(string.printable, k=12))

        create_user(current, "123456789")
        user = User.objects.filter(email=current)[0]
        dictionary = {"user_id": (user.pk + 1)}
        req = HttpRequest()
        req.POST = dictionary
        res = user_appointments(req, True)
        self.assertEqual(res.status_code, 200)
        data = json.loads(res.getvalue().decode('utf-8'))
        self.assertEqual(data["user_appointments"], [])

    def test_user_appointments_user_with_no_appointments(self):
        current = ''.join(random.choices(string.printable, k=12))
        while len(User.objects.filter(email=current)) > 0:
            current = ''.join(random.choices(string.printable, k=12))

        create_user(current, "123456789")
        user = User.objects.filter(email=current)[0]
        dictionary = {"user_id": user.pk}
        req = HttpRequest()
        req.POST = dictionary
        res = user_appointments(req, True)
        self.assertEqual(res.status_code, 200)
        data = json.loads(res.getvalue().decode('utf-8'))
        self.assertEqual(data["user_appointments"], [])

    def test_user_appointments_general_case(self):
        create_data()
        dictionary = {"user_id": 1}
        req = HttpRequest()
        req.POST = dictionary
        res = user_appointments(req, True)
        self.assertEqual(res.status_code, 200)
        data = json.loads(res.getvalue().decode('utf-8'))
        self.assertEqual(len(data["user_appointments"]), 2)
        self.assertEqual(data["user_appointments"][0]['id'], 1)
        self.assertEqual(data["user_appointments"][1]['id'], 4)

    def test_add_user_duplicate(self):
        """
        Checks what happens when one tries to
        create an account with an email that is used
        """
        create_data()
        used_mail = User.objects.all().values()[0]['email']
        data = {
            "user_email": used_mail,
            'user_password': '12333',
            'user_first_name': 'prenume',
            'user_last_name': 'nume',
            'user_phone': '0004242',
            'user_birthday': '1947-07-03',
            'user_gender': 'N'
        }
        req = HttpRequest()
        req.POST = data
        res = add_user(req, True)
        self.assertEqual(res.status_code, 200)
        data = json.loads(res.getvalue().decode('utf-8'))
        self.assertEqual(data['added'], False)

    def test_add_user_good_attempt(self):
        """
        Checks what happens when one tries to
        create an account with an email that is not used
        """
        create_data()
        mail = ''.join(random.choices(string.printable, k=10))
        dict = {
            "user_email": mail,
            'user_password': '12333',
            'user_first_name': 'prenume',
            'user_last_name': 'nume',
            'user_phone': '0004242',
            'user_birthday': '1947-07-03',
            'user_gender': 'N'
        }
        req = HttpRequest()
        req.POST = dict
        res = add_user(req, True)
        self.assertEqual(res.status_code, 200)
        data = json.loads(res.getvalue().decode('utf-8'))
        self.assertEqual(data['added'], True)
        user = User.objects.filter(email=mail)[0]
        new_dict = model_to_dict(user)
        new_dict.pop('id')
        new_dict.pop('birthday')
        dict.pop('user_birthday')
        self.assertEqual(set(dict.values()), set(new_dict.values()))

    def test_update_user_user_id_not_in_database(self):
        create_data()
        uid = len(User.objects.all().values()) + 1
        data = {
            "user_id": uid,
            'user_first_name': 'prenume',
            'user_last_name': 'nume',
            'user_phone': '0004242',
            'user_birthday': '1947-07-03',
            'user_gender': 'N'
        }
        req = HttpRequest()
        req.POST = data
        res = update_user(req, True)
        self.assertEqual(res.status_code, 418)

    def test_update_user_good_attempt(self):
        create_data()
        uid = len(User.objects.all().values())
        dict = {
            "user_id": uid,
            'user_first_name': 'prenume',
            'user_last_name': 'nume',
            'user_phone': '0004242',
            'user_birthday': '1947-07-03',
            'user_gender': 'N'
        }
        req = HttpRequest()
        req.POST = dict
        res = update_user(req, True)
        self.assertEqual(res.status_code, 200)
        data = json.loads(res.getvalue().decode('utf-8'))
        self.assertEqual(data['updated'], True)
        user = User.objects.get(pk=uid)
        new_dict = model_to_dict(user)
        new_dict.pop('email')
        new_dict.pop('password')
        dict['user_birthday'] = date.fromisoformat(dict['user_birthday'])
        self.assertEqual(set(dict.values()), set(new_dict.values()))

class SalonModelTests(TestCase):
    def test_salon_login_wrong_email(self):
        """
        Checks what a wrong email will produce when
        trying to login
        """
        current = ''.join(random.choices(string.printable, k=12))
        while len(Salon.objects.filter(email=current)) > 0:
            current = ''.join(random.choices(string.printable, k=12))

        dictionary = {"user_email" : current}
        req = HttpRequest()
        req.POST = dictionary
        res = salon_login(req, True)
        dictionary = json.loads(res.getvalue().decode('utf-8'))
        self.assertIs(res.status_code, 200)
        self.assertIs(dictionary["check_user"], False)

    def test_salon_login_good_email_wrong_password(self):
        """
        Checks what a good email with a wrong password will produce
        when trying to login
        """
        current = ''.join(random.choices(string.printable, k=12))
        while len(Salon.objects.filter(email=current)) > 0:
            current = ''.join(random.choices(string.printable, k=12))

        create_salon(current, "123456789", 777777)
        dictionary = {
            "user_email": current,
            "user_password": "12345678"
        }
        req = HttpRequest()
        req.POST = dictionary
        res = salon_login(req, True)
        dictionary = json.loads(res.getvalue().decode('utf-8'))
        self.assertIs(res.status_code, 200)
        self.assertIs(dictionary["check_user"], True)
        self.assertIs(dictionary["check_password"], False)

    def test_salon_login_good_attempt(self):
        """
        Checks how a good login attempt will behave
        """
        current = ''.join(random.choices(string.printable, k=12))
        while len(Salon.objects.filter(email=current)) > 0:
            current = ''.join(random.choices(string.printable, k=12))

        create_salon(current, "123456789", 777777)
        dictionary = {
            "user_email": current,
            "user_password": "123456789"
        }
        req = HttpRequest()
        req.POST = dictionary
        res = salon_login(req, True)
        dictionary = json.loads(res.getvalue().decode('utf-8'))
        self.assertIs(res.status_code, 200)
        self.assertIs(dictionary["check_user"], True)
        self.assertIs(dictionary["check_password"], True)
        user = Salon.objects.filter(email=current)[0]
        expected = 's' + str(user.pk)
        self.assertEqual(dictionary["salon_id"], expected)

    def test_salon_data_by_id_id_not_in_database(self):
        """
        Checks what the function will return if
        the id provided is not in the database
        """
        current = ''.join(random.choices(string.printable, k=12))
        while len(Salon.objects.filter(email=current)) > 0:
            current = ''.join(random.choices(string.printable, k=12))

        create_salon(current, "123456789", 777777)
        salon = Salon.objects.filter(email=current)[0]
        req = HttpRequest()
        res = salon_data_by_id(req, salon.pk + 1)
        self.assertEqual(res.status_code, 404)

    def test_salon_data_by_id_good_attempt(self):
        """
        Checks the data returned when the id
        provided is valid and in the database
        """
        current = ''.join(random.choices(string.printable, k=12))
        while len(Salon.objects.filter(email=current)) > 0:
            current = ''.join(random.choices(string.printable, k=12))

        create_salon(current, "123456789", 777777)
        salon = Salon.objects.filter(email=current)[0]
        req = HttpRequest()
        res = salon_data_by_id(req, salon.pk)
        dictionary = json.loads(res.getvalue().decode('utf-8'))
        self.assertIs(res.status_code, 200)
        answer = dictionary["salon_data"]
        self.assertEqual(answer["id"], salon.pk)
        self.assertEqual(answer["email"], current)
        self.assertEqual("password" in answer.keys(), False)
        self.assertEqual(answer["name"], '')
        self.assertEqual(answer["description"], '')
        self.assertEqual(answer["phone"], '')
        self.assertEqual(answer["location"], str(Location(777777)))
        self.assertEqual(answer["address"], '')
        self.assertEqual(answer["women_services"], False)
        self.assertEqual(answer["men_services"], False)
        self.assertEqual(answer["kids_services"], False)

    def test_salons_list_empty(self):
        req = HttpRequest()
        res = salons_list(req)
        self.assertEqual(res.status_code, 200)
        data = json.loads(res.getvalue().decode('utf-8'))
        self.assertEqual(len(data["salons_list"]), 0)

    def test_salons_list_non_empty(self):
        create_data()
        req = HttpRequest()
        res = salons_list(req)
        self.assertEqual(res.status_code, 200)
        data = json.loads(res.getvalue().decode('utf-8'))
        self.assertEqual(len(data["salons_list"]), 3)

    def test_salon_services_id_not_in_database(self):
        """
        Check how the function will behave when
        given an invalid id
        """
        current = ''.join(random.choices(string.printable, k=12))
        while len(Salon.objects.filter(email=current)) > 0:
            current = ''.join(random.choices(string.printable, k=12))

        create_salon(current, "123456789", 777777)
        salon = Salon.objects.filter(email=current)[0]
        req = HttpRequest()
        res = salon_services(req, salon.pk + 1)
        self.assertEqual(res.status_code, 200)
        data = json.loads(res.getvalue().decode('utf-8'))
        self.assertEqual(len(data["salon_services"]), 0)

    def test_salon_services_salon_with_no_services(self):
        """
        Check how the function will behave when
        given a salon without services
        """
        current = ''.join(random.choices(string.printable, k=12))
        while len(Salon.objects.filter(email=current)) > 0:
            current = ''.join(random.choices(string.printable, k=12))

        create_salon(current, "123456789", 777777)
        create_data()
        salon = Salon.objects.filter(email=current)[0]
        req = HttpRequest()
        res = salon_services(req, salon.pk)
        self.assertEqual(res.status_code, 200)
        data = json.loads(res.getvalue().decode('utf-8'))
        self.assertEqual(len(data["salon_services"]), 0)

    def test_salon_services_general_case(self):
        """
        Checks if the function returns just the services
        of the specified salon
        """
        create_data()
        req = HttpRequest()
        res = salon_services(req, 1)
        self.assertEqual(res.status_code, 200)
        data = json.loads(res.getvalue().decode('utf-8'))
        self.assertEqual(len(data["salon_services"]), 2)
        self.assertEqual(data["salon_services"][0]['id'], 1)
        self.assertEqual(data["salon_services"][1]['id'], 4)

    def test_salon_appointmens_id_not_in_database(self):
        current = ''.join(random.choices(string.printable, k=12))
        while len(Salon.objects.filter(email=current)) > 0:
            current = ''.join(random.choices(string.printable, k=12))

        create_salon(current, "123456789", 777777)
        salon = Salon.objects.filter(email=current)[0]
        dictionary = {"salon_id": (salon.pk + 1)}
        req = HttpRequest()
        req.POST = dictionary
        res = salon_appointments(req, True)
        self.assertEqual(res.status_code, 200)
        data = json.loads(res.getvalue().decode('utf-8'))
        self.assertEqual(data["salon_appointments"], [])

    def test_salon_appointments_salon_with_no_appointments(self):
        current = ''.join(random.choices(string.printable, k=12))
        while len(Salon.objects.filter(email=current)) > 0:
            current = ''.join(random.choices(string.printable, k=12))

        create_salon(current, "123456789", 777777)
        salon = Salon.objects.filter(email=current)[0]
        dictionary = {"salon_id": salon.pk}
        req = HttpRequest()
        req.POST = dictionary
        res = salon_appointments(req, True)
        self.assertEqual(res.status_code, 200)
        data = json.loads(res.getvalue().decode('utf-8'))
        self.assertEqual(data["salon_appointments"], [])

    def test_salon_appointments_general_case(self):
        create_data()
        dictionary = {"salon_id": 1}
        req = HttpRequest()
        req.POST = dictionary
        res = salon_appointments(req, True)
        self.assertEqual(res.status_code, 200)
        data = json.loads(res.getvalue().decode('utf-8'))
        self.assertEqual(len(data["salon_appointments"]), 2)
        self.assertEqual(data["salon_appointments"][0]['id'], 1)
        self.assertEqual(data["salon_appointments"][1]['id'], 4)

    def test_add_salon_duplicate(self):
        """
        Checks what happens when one tries to
        create an account with an email that is used
        """
        create_data()
        used_mail = Salon.objects.all().values()[0]['email']
        loc_id = Location.objects.all().values()[0]['id']
        dict = {
            'salon_email': used_mail,
            'salon_password': '12333',
            'salon_name': 'salonblanao',
            'description': 'eblanao',
            'phone': '0004242',
            'salon_address': 'km0distractie',
            'women_services': False,
            'men_services': True,
            'kids_services': False,
            'location_id': loc_id,
            'logo': 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Logo_TV_2015.svg/1200px-Logo_TV_2015.svg.png'
        }
        req = HttpRequest()
        req.POST = dict
        res = add_salon(req, True)
        self.assertEqual(res.status_code, 200)
        data = json.loads(res.getvalue().decode('utf-8'))
        self.assertEqual(data['added'], False)

    def test_add_salon_good_attempt(self):
        """
        Checks what happens when one tries to
        create an account with an email that is not used
        """
        create_data()
        mail = ''.join(random.choices(string.printable, k=10))
        loc_id = Location.objects.all().values()[0]['id']
        dict = {
            'salon_email': mail,
            'salon_password': '12333',
            'salon_name': 'salonblanao',
            'description': 'eblanao',
            'phone': '0004242',
            'location_id': loc_id,
            'salon_address': 'km0distractie',
            'women_services': False,
            'men_services': True,
            'kids_services': False,
            'logo': 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Logo_TV_2015.svg/1200px-Logo_TV_2015.svg.png'
        }
        req = HttpRequest()
        req.POST = dict
        res = add_salon(req, True)
        self.assertEqual(res.status_code, 200)
        data = json.loads(res.getvalue().decode('utf-8'))
        self.assertEqual(data['added'], True)
        salon = Salon.objects.filter(email=mail)[0]
        new_dict = model_to_dict(salon)
        new_dict.pop('id')
        self.assertEqual(set(dict.values()), set(new_dict.values()))

    def test_available_hours_salon_not_in_database(self):
        create_data()
        sid = len(Salon.objects.all().values()) + 1
        sids = [1, 4]
        dict = {
            'salon_id': sid,
            'day': '2020-07-03',
            'services': sids
        }
        req = HttpRequest()
        req.POST = dict
        res = available_hours(req, True)
        self.assertEqual(res.status_code, 418)

    def test_available_hours_service_not_in_database(self):
        create_data()
        sid = len(Salon.objects.all().values())
        sids = [1, len(Service.objects.all().values()) + 1]
        dict = {
            'salon_id': sid,
            'day': '2020-07-03',
            'services': sids
        }
        req = HttpRequest()
        req.POST = dict
        res = available_hours(req, True)
        self.assertEqual(res.status_code, 418)

    def test_available_hours_general_case(self):
        create_data()
        sid = 1
        sids = [1, 4]
        dict = {
            'salon_id': sid,
            'day': '2020-07-03',
            'services': sids
        }
        req = HttpRequest()
        req.POST = dict
        res = available_hours(req, True)
        self.assertEqual(res.status_code, 200)
        #data = json.loads(res.getvalue().decode('utf-8'))
        #print(data['available_hours'])