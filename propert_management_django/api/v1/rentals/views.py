from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny

from general.http import HttpRequest
from .serializers import CreateRentalSerializer
from general.functions import generate_serializer_errors


@api_view(["POST"])
def create_rental(request: HttpRequest):
    user = request.user
    serialized = CreateRentalSerializer(data=request.data)

    if serialized.is_valid():
        rental_property = serialized.save(user=user)

        response_data = {
            "statusCode": 6000,
            "data":{
                "title": "Success",
                "message": "Rental Propert created successfully"
            }
        }
    else:
        response_data = {
            "statusCode": 6001,
            "data":{
                "title": "Validation error",
                "message": generate_serializer_errors(serialized._errors)
            }
        }

    return Response(response_data, status=status.HTTP_200_OK)

@api_view(["GET"])
def my_rental_properties(request: HttpRequest):
    pass