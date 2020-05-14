from django.urls import path

from . import views

app_name = 'beautinator'
urlpatterns = [
    path('', views.salons_list(), name='index')
]