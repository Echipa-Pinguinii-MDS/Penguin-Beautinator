from django.urls import path

from . import views

app_name = 'beautinator'
urlpatterns = [
    # /beautinator
    path('', views.salons_list, name='index'),
    # /beautinator/salons
    path('salons', views.salons_list, name='index'),
    # /beautinator/salons/3
    path('salons/<int:salon_id>', views.salon_data_by_id, name='salon_data'),
    # /beautinator/salons/3/services
    path('salons/<int:salon_id>/services', views.salon_services, name='salon_services'),
    # /beautinator/users/5
    path('users/<int:user_id>', views.user_data_by_id, name='user_data'),
    # /beautinator/users/5/appointments
    path('users/<int:user_id>/appointments', views.user_appointments, name='user_appointments'),
    # /beautinator/services
    path('services', views.all_services, name='all_services'),
]