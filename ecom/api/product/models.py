from django.db import models
from ..category.models import Category

class Product(models.Model):
    name = models.CharField(max_length=100)
    description = models.CharField(max_length=1000)
    additional_information = models.CharField(max_length=1000)
    price = models.DecimalField(max_digits = 6, decimal_places = 2)
    mrp = models.DecimalField(max_digits = 6, decimal_places = 2)
    quantity = models.IntegerField(default=1)
    product_image = models.ImageField(upload_to='images/', blank=True, null = True)
    category = models.ForeignKey(Category, on_delete=models.CASCADE, blank=True, null = True)
    slug = models.SlugField(max_length=150)
    is_active = models.BooleanField(default=True, blank=True)
    created_at = models.DateField(auto_now_add=True, editable=False)
    updated_at = models.DateField(auto_now=True)

    def __str__(self):
        return self.name