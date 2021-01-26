from rest_framework import viewsets
from .serializers import OrderSerializer
from .models import Order
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import get_user_model

def validate_user_session(id, token):
    UserModel = get_user_model()
    try:
        user = UserModel.objects.get(pk=id)
        res = {
            "error" : False,
            "code" : "401",
            "success":False
        }
        if user.session_token == token:
            res["success"]=True
            return res
        else:
            res["error"]="session doesn't match, please login again"
            return res
    except UserModel.DoesNotExist:
        return {
            "error" : "user doesn't exist in database",
            "code" : "401",
            "success":False
        }

@csrf_exempt
def add(request, id, token):
    res = validate_user_session(id, token)
    if (not res["success"]):
        return JsonResponse(res)
    
    if request.method == "POST":
        user_id = id
        trans_id = request.POST['trans_id']
        amount = request.POST['amount']
        products = request.POST['products']
        total_pro = len(products.split(',')[:-1])
        contact_address = request.POST['contact_address']
        payment_stat = request.POST['payment_stat']

        UserModel = get_user_model()

        try:
            usr = UserModel.objects.get(pk=user_id)
        except UserModel.DoesNotExist:
            return JsonResponse({"error" : "User Doesn't exist"})
        
        new_order = Order(
            user=usr,
            product_names = products,
            total_products = total_pro,
            transaction_id = trans_id,
            address = contact_address,
            total_amount = amount,
            payment_status = payment_stat
        )
        new_order.save()
        return JsonResponse({"Info":"new prder placed successfully", "error":"False", "Success": True})

class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all().order_by('updated_at')
    serializer_class = OrderSerializer