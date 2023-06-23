from django.contrib import admin

from accounts.models import User, Landlord


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ["email","id","name","is_deleted","is_email_verified"]
    exclude = ["password"]


@admin.register(Landlord)
class LandlordAdmin(admin.ModelAdmin):
    list_display = ["user","id","is_verified"]
    