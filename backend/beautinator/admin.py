from django.contrib import admin
from django_admin_listfilter_dropdown.filters import (
    DropdownFilter, ChoiceDropdownFilter, RelatedDropdownFilter
)

from .models import Appointment, Salon, Service, User, Location


class AppointmentInLine(admin.TabularInline):
    model = Appointment
    extra = 0


class UserAdmin(admin.ModelAdmin):
    empty_value_display = '-empty-'
    fieldsets = [
        ('Login info', {'fields': ['email', 'password']}),
        ('Personal info', {'fields': ['first_name', 'last_name', 'birthday', 'gender']}),
        ('Contact info', {'fields': ['phone']}),
    ]
    inlines = [AppointmentInLine]

    list_display = ('email', 'first_name', 'last_name', 'phone')
    list_filter = [
        ('gender', ChoiceDropdownFilter),
        ('birthday', ChoiceDropdownFilter)
    ]


class ServiceInLine(admin.StackedInline):
    model = Service
    extra = 0


class SalonAdmin(admin.ModelAdmin):
    empty_value_display = '-empty-'
    fieldsets = [
        ('Login info', {'fields': ['email', 'password']}),
        ('General info', {'fields': ['name', 'description', 'logo']}),
        ('Contact info', {'fields': ['phone', 'location', 'address']}),
        ('Service types', {'fields': ['women_services', 'men_services', 'kids_services']})
    ]
    inlines = [ServiceInLine]

    list_display = ('email', 'name', 'phone', 'get_location', 'address')
    list_filter = [
        ('location__country', ChoiceDropdownFilter),
        ('location__county', ChoiceDropdownFilter),
        ('location__city', ChoiceDropdownFilter),
        ('women_services', admin.BooleanFieldListFilter),
        ('men_services', admin.BooleanFieldListFilter),
        ('kids_services', admin.BooleanFieldListFilter),
    ]

    search_fields = [
        'location__country',
        'location__county',
        'location__city',
    ]


class LocationAdmin(admin.ModelAdmin):
    fields = ['country', 'county', 'city']
    list_display = ('country', 'county', 'city')
    list_filter = ['country', 'county', 'city']


admin.site.register(User, UserAdmin)
admin.site.register(Salon, SalonAdmin)
admin.site.register(Location, LocationAdmin)