# Generated by Django 3.0.8 on 2021-01-09 06:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('category', '0002_category_category_image'),
    ]

    operations = [
        migrations.AlterField(
            model_name='category',
            name='category_image',
            field=models.ImageField(blank=True, null=True, upload_to='images/'),
        ),
    ]
