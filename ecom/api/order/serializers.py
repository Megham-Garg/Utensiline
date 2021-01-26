from rest_framework import serializers
from .models import Order

class OrderSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Order
        fields = ('user',
                'product_names',
                'total_products',
                'address',
                'total_amount',
                'payment_status',
                )