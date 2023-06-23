import json
import requests
# from pprint import pprint

from django.db.models import Q
from django.conf import settings
from django.utils import timezone
from django.http.request import HttpRequest

from rest_framework import serializers

from accounts.models import User
from general.encryptions import encrypt, decrypt
from general.functions import get_client_ip, is_valid_uuid, getDomain


def authenticate(email: str, password: str, request: HttpRequest):
    headers = {
        "Content-Type": "application/json"
    }

    data = {
        "email": email,
        "password": password,
    }

    url = getDomain(request) + "/api/v1/accounts/token/"
    
    response = requests.post(url, headers=headers, data=json.dumps(data))

    return response


class SignupSerializer(serializers.Serializer):
    name = serializers.CharField(max_length=128,min_length=4,error_messages={'required':'Please enter your name'})
    email = serializers.EmailField(error_messages={'required':'Please enter your email address',"invalid":"Please enter a valid email address"})
    password = serializers.CharField(max_length=18,error_messages={'required':'Please enter your password'})
    confirm_password = serializers.CharField(max_length=18, error_messages={'required':'Please enter your confirmed password'})

    def validate(self, attrs):
        super().validate(attrs)

        email = attrs.get('email')
        password = attrs.get('password')
        confirmed_password = attrs.get('confirm_password')

        if User.objects.filter(email=email,is_deleted=False).exists():
            raise serializers.ValidationError({"email":"Email already exists"})
        
        if password != confirmed_password:
            raise serializers.ValidationError({"password":"passwords are incorrect"})

        return attrs
    
    def save(self):
        email = self.validated_data.get("email")
        password = self.validated_data.get("password")
        name = self.validated_data.get("name")
        
        profile = User.objects.create_user(name=name,email=email,password=password,encrypted_password=encrypt(password))

        return profile
    

class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField(error_messages={'required':'Please enter your email address',"invalid":"Please enter a valid email address"})
    password = serializers.CharField(max_length=18, error_messages={'required':'Please enter your password'})

    def validate(self, attrs):
        email = attrs.get('email')
        password = attrs.get('password')

        if not User.objects.filter(email=email, is_deleted=False).exists():
            raise serializers.ValidationError({"email":"Email not found"})
        else:
            user:User = User.objects.filter(email=email,is_deleted=False).latest("date_joined")

            if not user.is_email_verified:
                raise serializers.ValidationError({"email":"Please verify your email address"})
            else:
                if not decrypt(user.encrypted_password) == password:
                    raise serializers.ValidationError({"password":"Incorrect password"})

        return attrs
    
    def save(self, **kwargs):
        request: HttpRequest = kwargs.get("request")

        email = self.validated_data.get("email")
        password = self.validated_data.get("password")

        user: User = User.objects.filter(email=email,is_deleted=False).latest("date_joined")
        
        response: requests.Response = authenticate(email, password, request)

        if response.status_code == 200:
            return {
                "statusCode":6000,
                "data":{
                    "title":"Success",
                    "name":user.name,
                    "email":user.email,
                    "is_landlord": True,
                    "refresh": response.json().get("refresh"),
                    "access": response.json().get("access"),
                }       
            }
        return {
                "statusCode":6001,
                "data":{
                    "title":"Failed",
                    "message": "Token generation failed"
                }       
            }