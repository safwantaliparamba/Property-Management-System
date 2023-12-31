import uuid

from django.db import models
from django.utils.translation import gettext_lazy as _
from django.contrib.auth.models import AbstractUser, BaseUserManager

from general.models import BaseModel
from general.encryptions import encrypt


class CustomUserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):

        if not email:
            raise ValueError(_('The Email field must be set.'))
        email = self.normalize_email(email)
        user: User = self.model(email=email, **extra_fields)
        encrypted_password = encrypt(password)

        user.set_password(password)
        user.encrypted_password = encrypted_password
        user.save(using=self._db)

        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        encrypted_password = encrypt(password)

        return self.create_user(email, password,encrypted_password=encrypted_password, **extra_fields)
    

class User(AbstractUser):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    # mandatory fields
    email = models.EmailField(unique=True)
    is_email_verified = models.BooleanField(default=False)
    encrypted_password = models.TextField(null=True, blank=True)
    name = models.CharField(max_length=128,null=True,blank=True)
    is_deleted = models.BooleanField(default=False)
    username = models.CharField(max_length=128,null=True, blank=True,unique=True)
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    objects = CustomUserManager()

    class Meta:
        db_table = 'accounts_user'
        verbose_name = 'User'
        verbose_name_plural = 'Users'
        ordering = ('-date_joined',)

    def __str__(self):
        return self.email
    

class Landlord(BaseModel):
    user = models.ForeignKey(User, related_name='landlord',on_delete=models.CASCADE)
    is_verified = models.BooleanField(default=False)
    
    class Meta:
        db_table = 'accounts_landlord'
        verbose_name = 'Landlord'
        verbose_name_plural = 'Landlords'
        ordering = ('-date_added',)

    def __str__(self):
        return self.user.name