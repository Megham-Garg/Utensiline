from rest_framework import viewsets
from rest_framework.permissions import AllowAny
from .serializers import UserSerializer
from .models import CustomUser
import random, re
from django.http import JsonResponse
from django.contrib.auth import get_user_model, login, logout
from django.views.decorators.csrf import csrf_exempt

# password validator
def password_check(password): 
    SpecialSym =['$', '@'] 
    val = True
    err = ''
    if len(password) < 8: 
        err+='length should be at least 8 and '
        val = False

    if len(password) > 20: 
        err+='length should be not be greater than 12 and '
        val = False
          
    if not any(char.isdigit() for char in password): 
        err+='Password should have at least one numeral and '
        val = False
          
    if not any(char.isupper() for char in password): 
        err+='Password should have at least one uppercase letter and '
        val = False
          
    if not any(char.islower() for char in password): 
        err+='Password should have at least one lowercase letter and '
        val = False
          
    if not any(char in SpecialSym for char in password): 
        err+='Password should have at least one of the symbols $ @ and '
        val = False

    if val: 
        return "True" 
    else:
        return err

def generate_session_token(length = 10):
    return ''.join(random.SystemRandom().choice(
                [chr(itr) for itr in range(97, 123)]+
                [chr(itr) for itr in range(65, 91)]+
                ['@', '#', '&', '%', '$']+
                [str(itr) for itr in range(10)]
                )
                for _ in range(length)
            )

@csrf_exempt
def signin(request):
    if(not request.method == 'POST'):
        return JsonResponse({'error':'send a post request with valid parameters only'})

    userName = request.POST['email']
    password = request.POST['password']

    print(userName)
    print(password)

    if(not re.match('^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$', userName)):
        return JsonResponse({'error':'Enter a valid email'})

    if(password_check(password) != "True"):
        return JsonResponse({'error':password_check(password)})

    UserModel = get_user_model()

    try:
        user = UserModel.objects.get(email=userName)
        if user.check_password(password):
            usr_dict = UserModel.objects.filter(
                email=userName).values().first()
            usr_dict.pop('password')

            if user.session_token != '0':
                user.session_token = '0'
                user.save()
                return JsonResponse({'error': "Previous session exists!"})

            token = generate_session_token()
            print(token)
            user.session_token = token
            user.save()
            login(request, user)
            return JsonResponse({'token': token, 'user': usr_dict})
        else:
            return JsonResponse({'error': 'Invalid password'})

    except UserModel.DoesNotExist:
        return JsonResponse({'error': 'Invalid Email'})

@csrf_exempt
def signout(request, id):

    UserModel = get_user_model()

    try:
        user = UserModel.objects.get(pk=id)
        user.session_token = "0"
        user.save()
        logout(request)

    except UserModel.DoesNotExist:
        return JsonResponse({'error': 'Invalid user ID'})

    return JsonResponse({'success': 'Logout success'})
            
class UserViewSet(viewsets.ModelViewSet):
    permission_classes_by_action = {'create': [AllowAny]}

    queryset = CustomUser.objects.all().order_by('id')
    serializer_class = UserSerializer

    def get_permissions(self):
        try:
            return [permission() for permission in self.permission_classes_by_action[self.action]]

        except KeyError:
            return [permission() for permission in self.permission_classes]
