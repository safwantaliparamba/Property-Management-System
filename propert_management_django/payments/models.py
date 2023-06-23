from django.db import models

from general.models import BaseModel
from accounts.models import User
from rentals.models import Reservation


class Order(BaseModel):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='orders', null=True)
    rental = models.ForeignKey(Reservation,on_delete=models.CASCADE, related_name="orders")
    amount = models.CharField(max_length=128, null=True, blank=True)
    payment_id = models.CharField(max_length=128, null=True, blank=True)
    is_paid = models.BooleanField(default=False)
    

    def __str__(self):
        return self.user