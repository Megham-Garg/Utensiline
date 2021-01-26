from rest_framework import serializers
from .models import CustomUser
from django.contrib.auth.hashers import make_password
from rest_framework.decorators import authentication_classes, permission_classes

class UserSerializer(serializers.HyperlinkedModelSerializer):
    avatar = serializers.ImageField(max_length=None, allow_empty_file=False, allow_null=True, required=False)

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)

        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance

    def update(self, instance, validated_data):
        
        for attr, val in validated_data.items():
            if attr == 'password':
                instance.set_password(val)
            else:
                setattr(instance, attr, val)

        instance.save()
        return instance

    class Meta:
        model = CustomUser
        extra_kwargs = {'password': {'write_only' : True}}
        fields = ('first_name',
                'last_name',
                'gender',
                'email',
                'phone_number',
                'address',
                'birth_date',
                'avatar',
                'password',
                'is_active',
                'is_staff',
                'is_superuser'
                )