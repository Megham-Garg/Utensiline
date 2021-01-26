from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.validators import RegexValidator

class CustomUser(AbstractUser):
    first_name = models.CharField(max_length=20, null=False, blank=False)
    last_name = models.CharField(max_length=20, null=False, blank=False)

    GENDER_CHOICES = (
        (0, 'male'),
        (1, 'female'),
        (2, 'not specified'),
    )
    gender = models.IntegerField(choices=GENDER_CHOICES, null=True, blank=True)
    email = models.EmailField(max_length=150, blank=False, unique=True)

    phone_regex = RegexValidator(regex=r'^\+?1?\d{9,15}$', message="Phone number must be entered in the format: '+919999999999'. Up to 15 digits allowed.")
    phone_number = models.CharField(validators=[phone_regex], max_length=17,null=True, blank=True, unique=True)
    
    is_active = models.BooleanField(default=True, blank=True)

    address = models.CharField(max_length=100, null=True, blank=True)
    birth_date = models.DateField(null=False, blank=False)
    avatar = models.ImageField(upload_to='avatars/', null=True, blank=True)

    session_token = models.CharField(max_length=10, default='0')
    
    username = None
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name', 'birth_date']