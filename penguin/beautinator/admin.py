from django.contrib import admin

from .models import Appointments, Salons, Services, Users


admin.site.register (Appointments)
admin.site.register (Salons)
admin.site.register (Services)
admin.site.register (Users)
