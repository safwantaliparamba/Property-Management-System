from django.contrib import admin

from payments.models import Order


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ["user","rental","amount","payment_id","is_paid"]