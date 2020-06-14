from django.urls import path

from . import views

app_name = 'beautinator'
urlpatterns = [
    # /beautinator/
    path('', views.salons_list, name='index'),
    # /beautinator/salons/
    path('salons/', views.salons_list, name='salons_list'),
    # /beautinator/salons/3/
    path('salons/<int:salon_id>/', views.salon_data_by_id, name='salon_data'),
    # /beautinator/salons/3/services/
    path('salons/<int:salon_id>/services/', views.salon_services, name='salon_services'),
    # /beautinator/users/profile/
    path('users/profile/', views.user_data_by_id, name='user_data'),
    # /beautinator/users/appointments/
    path('users/appointments/', views.user_appointments, name='user_appointments'),
    # /beautinator/salons/appointments/
    path('salons/appointments/', views.salon_appointments, name='salon_appointments'),
    # /beautinator/user/login/
    path('user/login/', views.user_login, name='user_login'),
    # /beautinator/available/
    path('available/', views.available_hours, name='available_hours'),
    # /beautinator/add/user/
    path('add/user/', views.add_user, name='add_user'),
    # beautinator/add/appointment/
    path('add/appointment/', views.add_appointment, name='add_appointment'),
]