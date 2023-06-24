from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny

from rentals.models import Rental
from general.http import HttpRequest
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
def rental_properties(request):

    if Rental.objects.filter(is_deleted=False).exists():
        instance = Rental.objects.filter(is_deleted=False)

        serialized_data = RentalSerializer(instance,many=True).data

        response_data = {
            "statusCode": 6000,
            "data": {
                "titles": "Success",
                "message": "Rental properties fetched successfully",
                "data": serialized_data
            }
        }

    else:
        response_data = {
            "statusCode":6001,
            "data": {
                "title": "Validation error",
                "message": "Rental properties not found"
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


@api_view(["GET"])
def single_rental_property(request:HttpRequest,pk):
    
    if Rental.objects.filter(id=pk,is_deleted=False).exists():
        instance = Rental.objects.filter(id=pk,is_deleted=False).latest("date_added")

        serialized_data = RentalSerializer(instance).data

        response_data = {
            "statusCode": 6000,
            "data":{
                "title": "Success",
                "message":"Property fetched successfully",
                "data":serialized_data
            }
        }
    else:
        response_data = {
            "statusCode":6001,
            "data": {
                "title":"Validation Error",
                "message":"You have no rental property with the given id"
            }
        }

    return Response(response_data,status=status.HTTP_200_OK)


@api_view(["GET"])
@landlord_required()
def rental_property(request:HttpRequest,pk):
    user = request.user

    if user.rental_properties.filter(id=pk,is_deleted=False).exists():
        property: Rental = user.rental_properties.filter(id=pk,is_deleted=False).latest("date_added")

        serialized_data = RentalSerializer(property).data

        response_data = {
            "statusCode": 6000,
            "data":{
                "title": "Success",
                "message":"Property fetched successfully",
                "data":serialized_data
            }
        }
    else:
        response_data = {
            "statusCode":6001,
            "data": {
                "title":"Validation Error",
                "message":"You have no rental property with the given id"
            }
        }

    return Response(response_data,status=status.HTTP_200_OK)


@api_view(["POST"])
@landlord_required()
def edit_rental_property(request:HttpRequest,pk):
    user = request.user

    if user.rental_properties.filter(id=pk,is_deleted=False).exists():
        property: Rental = user.rental_properties.filter(id=pk,is_deleted=False).latest("date_added")

        serialized = RentalSerializer(instance=property,data=request.data,partial=True)

        if serialized.is_valid():
            serialized.save()

            response_data = {
                "statusCode": 6000,
                "data":{
                    "title": "Success",
                    "message":"Property updated successfully"
                }
            }
        else:
            response_data = {
                "statusCode": 6001,
                "data":{
                    "title": "Validation Error",
                    "message": generate_serializer_errors(serialized._errors)
                }
            }
    else:
        response_data = {
            "statusCode":6001,
            "data": {
                "title":"Validation Error",
                "message":"You have no rental property with the given id"
            }
        }

    return Response(response_data,status=status.HTTP_200_OK)


@api_view(["POST"])
@landlord_required()
def delete_rental_property(request:HttpRequest,pk):
    user = request.user

    if user.rental_properties.filter(id=pk,is_deleted=False).exists():
        property: Rental = user.rental_properties.filter(id=pk,is_deleted=False).latest("date_added")

        property.is_deleted = True
        property.save()

        response_data = {
            "statusCode": 6000,
            "data":{
                "title": "Success",
                "message":"Property deleted successfully"
            }
        }
    else:
        response_data = {
            "statusCode":6001,
            "data": {
                "title":"Validation Error",
                "message":"You have no rental property with the given id"
            }
        }

    return Response(response_data,status=status.HTTP_200_OK)

