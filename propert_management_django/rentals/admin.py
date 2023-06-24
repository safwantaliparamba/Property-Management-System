from django.contrib import admin

from rentals.models import RentalCategory, Rental, Reservation


@admin.register(RentalCategory)
class RentalCategoryAdmin(admin.ModelAdmin):
    list_display = ["title","id"]


@admin.register(Rental)
class RentalAdmin(admin.ModelAdmin):
    list_display = ["title","category","id","address","city","is_deleted"]
    actions = ['temp_delete','undo_delete']

    def temp_delete(self, request, queryset):
        queryset.update(is_deleted=True)

        selected = queryset.count()
        self.message_user(request, f'{selected} objects temporarily deleted.')

    def undo_delete(self, request, queryset):
        queryset.update(is_deleted=False)

        selected = queryset.count()
        self.message_user(request, f'{selected} objects undo deleted.')

    temp_delete.short_description = 'Delete temporarily'
    undo_delete.short_description = 'Undo delete'


@admin.register(Reservation)
class ReservationAdmin(admin.ModelAdmin):
    list_display = ["property","user","amount","id"]