from django.urls import re_path

from . import views


app_name = 'api_v1_rentals'

urlpatterns = [
    re_path(r'create/',views.create_rental),
    re_path(r'rental_properties/me/',views.my_rental_properties),
]