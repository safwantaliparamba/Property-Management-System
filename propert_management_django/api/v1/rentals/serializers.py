from rest_framework import serializers

from rentals.models import Rental


class CreateRentalSerializer(serializers.Serializer):
    title = serializers.CharField(max_length=128)
    address = serializers.CharField(max_length=255)
    city = serializers.CharField(max_length=128)
    description = serializers.CharField(max_length=555)
    category = serializers.CharField(max_length=255)
    rent = serializers.CharField(max_length=128)
    booking_charge = serializers.CharField(max_length=128)

    def validate(self, attrs):
        return super().validate(attrs)
    
    def save(self, **kwargs):
        user = kwargs.get("user")

        title = self.validated_data.get("title")
        address = self.validated_data.get("address")
        city = self.validated_data.get("city")
        description = self.validated_data.get("description")
        category = self.validated_data.get("category")
        rent = self.validated_data.get("rent")
        booking_charge = self.validated_data.get("booking_charge")

        rental_property = Rental.objects.create(
            title=title,
            address=address,
            city=city,
            description=description,
            category=category,
            rent=rent,
            booking_charge=booking_charge,
            owner=user
        )

        return rental_property
    

class RentalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rental
        fields = ["id","title","address","description","city","category","rent","booking_charge"]