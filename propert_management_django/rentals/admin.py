from django.contrib import admin

from rentals.models import RentalCategory, Rental, Reservation


@admin.register(RentalCategory)
class RentalCategoryAdmin(admin.ModelAdmin):
    list_display = ["title","id"]


@admin.register(Rental)
class RentalAdmin(admin.ModelAdmin):
    list_display = ["title","category","id","address","city"]


@admin.register(Reservation)
class ReservationAdmin(admin.ModelAdmin):
    list_display = ["property","user","amount","id"]