import datetime
import random
import string
import json
import os
import requests

#from django.core.handlers import wsgi
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


#class AppointmentsModelTests(TestCase):


#class ServiceModelTests(TestCase):


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

    def test_user_data_by_id_bad_id(self):
        """
        Checks what the function will return if
        the id provided is not in the good format
        """
        current = ''.join(random.choices(string.printable, k=12))
        while len(User.objects.filter(email=current)) > 0:
            current = ''.join(random.choices(string.printable, k=12))

        create_user(current, "123456789")
        user = User.objects.filter(email=current)[0]
        dictionary = {"user_id": 's' + str(user.pk)}
        req = HttpRequest()
        req.POST = dictionary
        res = user_data_by_id(req, True)
        dictionary = json.loads(res.getvalue().decode('utf-8'))
        self.assertIs(res.status_code, 200)
        self.assertIs(dictionary["user_data"], None)

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
        dictionary = {"user_id": 'u' + str(user.pk + 1)}
        req = HttpRequest()
        req.POST = dictionary
        res = user_data_by_id(req, True)
        dictionary = json.loads(res.getvalue().decode('utf-8'))
        self.assertIs(res.status_code, 200)
        self.assertIs(dictionary["user_data"], None)

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
        dictionary = {"user_id": 'u' + str(user.pk)}
        req = HttpRequest()
        req.POST = dictionary
        res = user_data_by_id(req, True)
        dictionary = json.loads(res.getvalue().decode('utf-8'))
        self.assertIs(res.status_code, 200)
        answer = dictionary["user_data"]
        self.assertEqual(answer["id"], user.pk)
        self.assertEqual(answer["email"], current)
        self.assertEqual(answer["password"], "123456789")
        self.assertEqual(answer["first_name"], '')
        self.assertEqual(answer["birthday"], None)
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
        dictionary = json.loads(res.getvalue().decode('utf-8'))
        self.assertIs(res.status_code, 200)
        self.assertIs(dictionary["user_data"], None)

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
        self.assertEqual(answer["password"], "123456789")
        self.assertEqual(answer["first_name"], '')
        self.assertEqual(answer["birthday"], None)
        self.assertEqual(answer["gender"], '')

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
        dictionary = json.loads(res.getvalue().decode('utf-8'))
        self.assertIs(res.status_code, 200)
        self.assertIs(dictionary["salon_data"], None)

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
        self.assertEqual(answer["phone_no"], '')
        self.assertEqual(answer["location"], 777777)
        self.assertEqual(answer["address"], '')
        self.assertEqual(answer["women_services"], False)
        self.assertEqual(answer["men_services"], False)
        self.assertEqual(answer["kids_services"], False)
