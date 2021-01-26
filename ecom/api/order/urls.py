from rest_framework import routers
from django.urls import path, include
from .views import OrderViewSet, add

router = routers.DefaultRouter()
router.register(r'', OrderViewSet)

urlpatterns = [
    path('add/<str:id>/<str:token>/', add, name='order.add'),
    path('', include(router.urls)),
]