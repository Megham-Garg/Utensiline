from django.db import models

class Category(models.Model):
    name = models.CharField(max_length=50)
    description = models.CharField(max_length=300)
    created_at = models.DateField(auto_now_add=True, editable=False)
    updated_at = models.DateField(auto_now=True)
    category_image = models.ImageField(upload_to='images/', blank=True, null = True) 

    def __str__(self):
        return self.name