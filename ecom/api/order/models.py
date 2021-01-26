from django.db import models
from api.user.models import CustomUser
from api.product.models import Product

class Order(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, blank=False, null=False)
    product_names = models.CharField(max_length=800, null=False, blank=False)
    total_products = models.IntegerField(default=0, null=False, blank=False)
    transaction_id = models.CharField(max_length=150, default='0')
    address = models.CharField(max_length=1000, null=False, blank=False)
    total_amount = models.DecimalField(max_digits=10, decimal_places=2,  default=0, null=False, blank=False)
    PAYMENT_STATUS_CHOICES = (
        (0, 'pre-paid'),
        (1, 'COD'),
    )
    payment_status = models.IntegerField(choices=PAYMENT_STATUS_CHOICES, default=1)
    created_at = models.DateField(auto_now_add=True, editable=False)
    updated_at = models.DateField(auto_now=True)

    def __str__(self):
        return self.transaction_id