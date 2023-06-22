from django.contrib import admin

from accounts.models import User


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ["email","id","name","is_deleted","is_email_verified"]
    exclude = ["password"]