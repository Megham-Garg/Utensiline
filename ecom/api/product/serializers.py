from rest_framework import serializers
from .models import Product

class ProductSerializer(serializers.HyperlinkedModelSerializer):
    product_image = serializers.ImageField(max_length=None, allow_empty_file=False, allow_null=True, required=False)
    class Meta:
        model = Product
        fields = (  'id',
                    'name',
                    'description',
                    'additional_information',
                    'price', 
                    'mrp', 
                    'quantity', 
                    'product_image', 
                    'category', 
                    'slug',
                    'is_active',
                    'created_at',
                    'updated_at'
                    )