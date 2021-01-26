from django.shortcuts import render
from rest_framework import viewsets
from .serializers import ProductSerializer
from .models import Product

class ProductViewset(viewsets.ModelViewSet):
    queryset = Product.objects.all().order_by('created_at')
    serializer_class = ProductSerializer
    