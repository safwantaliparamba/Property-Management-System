from django.conf import settings
from django.utils import timezone
from django.shortcuts import redirect
from django.template.loader import render_to_string

from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework.decorators import api_view, permission_classes

from accounts.models import User
from general.http import HttpRequest
from general.encryptions import encrypt, decrypt
from api.v1.accounts.serializers import SignupSerializer, LoginSerializer
from general.functions import is_valid_uuid, getDomain, generate_serializer_errors, send_email, format_errors


@api_view(["GET"])
def app(request: HttpRequest):
    user: User = request.user

    is_landlord = False

    if user.landlord.filter(is_deleted=False).exists():
        is_landlord = True 

    response_data = {
        "statusCode": 6000,
        "data": {
            "title": "Success",
            "name": user.name,
            "email": user.email,
            "is_landlord": is_landlord,  # set it up 
        }
    }

    return Response(response_data, status=status.HTTP_200_OK)


@api_view(["POST"])
@permission_classes([AllowAny])
def signup(request: HttpRequest):
    serialized = SignupSerializer(data=request.data)

    if serialized.is_valid():
        user = serialized.save()

        encrypted_user_id = encrypt(user.id)
        domain = getDomain(request)

        context = {
            "user": user.name,
            "activation_link": f"{domain}/api/v1/accounts/email/confirm/{encrypted_user_id}/"
        }

        verification_email_template = render_to_string(
            'email/account-verification.html', context)

        is_sent = send_email(
            user.email,
            "Activate your RentWise account",
            'Confirm your email to continue with RentWise',
            verification_email_template
        )

        response_data = {
            "statusCode": 6000,
            "data": {
                "title": "Success",
                "message": "Successfully signed up",
                "is_mailed": is_sent,
            }
        }
    else:
        response_data = {
            "statusCode": 6001,
            "data": {
                "title": "Validation Error Occured",
                "message": generate_serializer_errors(serialized._errors)
            }
        }

    return Response(response_data, status=status.HTTP_200_OK)


@api_view(["GET"])
@permission_classes([AllowAny])
def email_confirmation(request: HttpRequest, token):
    decrypted_user_id = decrypt(token)

    if is_valid_uuid(decrypted_user_id) and User.objects.filter(id=decrypted_user_id, is_deleted=False).exists():
        user: User = User.objects.filter(id=decrypted_user_id, is_deleted=False).latest('date_joined')

        user.is_email_verified = True
        user.save()

        return redirect(f"{settings.CLIENT_DOMAIN}/sign-in/")

    return Response("User not found")



@api_view(["POST"])
@permission_classes([AllowAny])
def login(request: HttpRequest):
    serialized = LoginSerializer(data=request.data)

    if serialized.is_valid():
        response_data = serialized.save(request=request)
    else:
        response_data = {
            "statusCode": 6001,
            "data": {
                "title": "Validation Error",
                "message": generate_serializer_errors(serialized._errors),
            }
        }

    return Response(response_data, status=status.HTTP_200_OK)