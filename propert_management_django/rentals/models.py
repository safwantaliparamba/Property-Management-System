from django.db import models
from django.utils.translation import gettext_lazy as _

from general.models import BaseModel
from accounts.models import User, Landlord


class RentalCategory(BaseModel):
    title = models.CharField(max_length=255)

    class Meta:
        db_table = 'rentals_rental_category'
        verbose_name = _('Rental Category')
        verbose_name_plural = _('Rental Categories')
        ordering = ('-date_added',)

    def __str__(self):
        return self.title
    

class Rental(BaseModel):
    owner = models.ForeignKey(User,related_name='rental_properties',on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    address = models.TextField(null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    city = models.CharField(max_length=255, null=True, blank=True)
    category = models.CharField(max_length=255,null=True, blank=True)
    rent = models.CharField(max_length=255,default="1499")
    booking_charge = models.CharField(max_length=255,default="250")

    class Meta:
        db_table = 'rentals_rental'
        verbose_name = _('Rental')
        verbose_name_plural = _('Rentals')
        ordering = ('-date_added',)

    def __str__(self):
        return self.title
    

class Reservation(BaseModel):
    property = models.ForeignKey(Rental,related_name="reservations",on_delete=models.CASCADE)
    user = models.ForeignKey(User,related_name="reserved_rentals",on_delete=models.CASCADE)
    amount = models.CharField(max_length=255,default="250")

    class Meta:
        db_table = 'rentals_reservation'
        verbose_name = _('Reservation')
        verbose_name_plural = _('Reservations')
        ordering = ('-date_added',)

    def __str__(self):
        return self.amount