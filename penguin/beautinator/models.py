from django.db import models


# Create your models here.
class Appointments(models.Model):
    salon = models.IntegerField()
    client = models.IntegerField()
    date_time = models.DateTimeField()
    type = models.IntegerField()
    duration = models.IntegerField()


class Salons(models.Model):
    email = models.CharField(primary_key=True, unique=True, max_length=100)
    password = models.CharField(max_length=100)
    name = models.CharField(max_length=100)
    address = models.CharField(max_length=100)


class Services(models.Model):
    salon = models.IntegerField()
    employee = models.CharField(max_length=100)
    title = models.CharField(max_length=100)
    description = models.CharField(max_length=400)
    price = models.FloatField()
    open_timeslots = models.CharField(max_length=3000)
    available_timeslots = models.CharField(max_length=3000)


class Users(models.Model):
    email = models.CharField(primary_key=True, unique=True, max_length=100)
    password = models.CharField(max_length=100)
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)


