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

def create_salon(email, password):
    """
    Creates a salon with the given email and password
    """
    return Salon.objects.create(email=email, password=password)


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

        create_salon(current, "123456789")
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

        create_salon(current, "123456789")
        dictionary = {
            "user_email": current,
            "user_password": "123456789"
        }
        req = HttpRequest()
        req.POST = dictionary
        res = salon_login(req, True)
        dictionary = json.loads(res.getvalue().decode('utf-8'))
        print("good attempt")
        print(res.status_code)
        print(dictionary["check_user"])
        print(dictionary["check_password"])
        print(dictionary["salon_id"])
        self.assertIs(res.status_code, 200)
        self.assertIs(dictionary["check_user"], True)
        self.assertIs(dictionary["check_password"], True)
        user = Salon.objects.filter(email=current)[0]
        expected = 's' + str(user.pk)
        self.assertEqual(dictionary["salon_id"], expected)

