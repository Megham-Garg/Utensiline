from django.urls import path, include
from rest_framework import viewsets
from .views import process_payment, generate_token

urlpatterns = [
    path('getToken/<str:id>/<str:token>/', generate_token, name = 'token.generate'),
    path('processPayment/<str:id>/<str:token>/', process_payment, name = 'process.payment'),
]