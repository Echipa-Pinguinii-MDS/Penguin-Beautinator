from django.urls import path

from . import views

app_name = 'beautinator'
urlpatterns = [
    # /beautinator
    path('', views.salons_list, name='index'),
    # /beautinator/salons
    path('salons', views.salons_list, name='index'),
    # /beautinator/salons/s3
    path('salons/<salon_id>', views.salon_data_by_id, name='salon_data'),
    # /beautinator/salons/s3/services
    path('salons/<salon_id>/services', views.salon_services, name='salon_services'),
    # /beautinator/users/profile
    path('users/profile', views.user_data_by_id, name='user_data'),
    # /beautinator/users/appointments
    path('users/appointments', views.user_appointments, name='user_appointments'),
    # /beautinator/services
    path('services', views.all_services, name='all_services'),
]