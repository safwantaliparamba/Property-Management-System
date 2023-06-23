from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny

from general.http import HttpRequest
from rentals.models import Rental
from accounts.models import Landlord
from general.decorators import landlord_required
from general.functions import generate_serializer_errors
from .serializers import CreateRentalSerializer, RentalSerializer


@api_view(["POST"])
def create_rental(request: HttpRequest):
    user = request.user
    serialized = CreateRentalSerializer(data=request.data)

    if serialized.is_valid():
        rental_property = serialized.save(user=user)

        response_data = {
            "statusCode": 6000,
            "data": {
                "title": "Success",
                "message": "Rental Propert created successfully"
            }
        }
    else:
        response_data = {
            "statusCode": 6001,
            "data": {
                "title": "Validation error",
                "message": generate_serializer_errors(serialized._errors)
            }
        }

    return Response(response_data, status=status.HTTP_200_OK)


@api_view(["GET"])
@landlord_required()
def my_rental_properties(request: HttpRequest):
    user = request.user

    if user.rental_properties.filter(is_deleted=False).exists():
        rental_properties = user.rental_properties.filter(is_deleted=False)

        serialized_data = RentalSerializer(rental_properties,many=True).data

        response_data = {
            "statusCode": 6000,
            "data": {
                "title": "Success",
                "message": "Rental Poperties fetched successfully",
                "data": serialized_data
            }
        }
    else:
        response_data = {
            "statusCode": 6001,
            "data": {
                "title": "Not found",
                "message": "Rental Poperties not found"
            }
        }

    return Response(response_data, status=status.HTTP_200_OK)
