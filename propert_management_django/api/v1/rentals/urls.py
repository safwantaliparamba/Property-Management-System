from django.urls import re_path

from . import views


app_name = 'api_v1_rentals'

urlpatterns = [
    re_path(r'^create/$',views.create_rental),
    re_path(r'^rental_properties/$',views.rental_properties),
    re_path(r'^rental_properties/me/$',views.my_rental_properties),
    re_path(r'^rental_properties/delete/(?P<pk>.*)/$',views.delete_rental_property),
    re_path(r'^rental_properties/edit/(?P<pk>.*)/$',views.edit_rental_property),
    re_path(r'^rental_properties/me/(?P<pk>.*)/$',views.rental_property), # serialized single rental property 
    re_path(r'^rental_properties/(?P<pk>.*)/$',views.single_rental_property), # serialized single rental property 
]