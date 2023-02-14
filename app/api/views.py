from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import status
from app.models import *
from .serializers import *
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from rest_framework import generics, viewsets
from django.http import Http404, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.permissions import IsAdminUser

# Create your views here.


# def index(request):
#     return HttpResponse("Hi")
# @api_view()
# def userlist(request):
    # profile = Users.objects.all()
    # serializer = UserSerializer(profile, many=True)
    # return Response(serializer.data) 


# admin list with getting userlist, adding/posting, putting, deleting a user
# requires admin authentication 
class UserList(APIView):
    # permission_classes = [IsAdminUser]
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def get(self,request,pk=None):
        if pk:
            try:
                users = User.objects.get(pk=pk)
            except User.DoesNotExist:
                return Response(status=status.HTTP_404_NOT_FOUND)
            serializer = UserSerializer(users)    
        else:
            users = User.objects.all()
            serializer = UserSerializer(users, many=True)  
        return Response(serializer.data) 

    def put(self,request,pk=None):
        users = User.objects.get(pk=pk)
        serializer = UserSerializer(users, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    
    def delete(self,request,pk=None):
        users = User.objects.get(pk=pk)
        users.delete()
        return Response(status=status.HTTP_204_NO_CONTENT) 


# particular user related functionality like get, put, delete for now -feb 9, need to add post functionality for ordering
class UserDetail(APIView):
    def get(self,request,pk=None):
        try:
            users = User.objects.get(pk=pk)
        except User.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = UserSerializer(users)      
        return Response(serializer.data) 

    def put(self,request,pk=None):
        users = User.objects.get(pk=pk)
        serializer = UserSerializer(users, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @csrf_exempt
    def login(request):
        username = request.POST.get('username')
        password = request.POST.get('password')
        # try:
        #     user = Users.objects.get(username=username, password=password)
        # except Users.DoesNotExist:
        #     return Response(status=status.HTTP_404_NOT_FOUND)
        # serializer = UserSerializer(user)
        # return Response(serializer.data, status=status.HTTP_200_OK)
        try:
            user = User.objects.get(username=username, password=password)
        except ObjectDoesNotExist:
            user=None
        if user:
            return JsonResponse({'bool': True, 'userid': user.id})
        else:
            return JsonResponse({'bool': False})
            
    def delete(self, request, pk=None):
        users = User.objects.get(pk=pk)
        users.delete()
        return Response(status=status.HTTP_204_NO_CONTENT) 


class CategoryList(APIView):
    def get(self,request):
        categories = Categorylist.objects.all()
        serializer = CategorylistSerializer(categories, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = CategorylistSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class CategoryDetail(APIView):
    def get(self, request, pk=None):
        try:
            categories = Categorylist.objects.get(pk=pk)
            serializer = CategorylistSerializer(categories)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Categorylist.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

    def put(self, request, pk=None):
        categories = Categorylist.objects.get(pk=pk)
        serializer = CategorylistSerializer(categories, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk=None):
        categories = Categorylist.objects.get(p=pk)
        categories.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class OrderList(APIView):
# order list with order items 
    def get(self, request, pk=None):
        if pk:
            try: 
                orderlist = Foodorder.objects.get(pk=pk)
            except Foodorder.DoesNotExist:
                return Response(status=status.HTTP_404_NOT_FOUND)
            serializer = FoodorderSerializer(orderlist)
        else:
            orderlist = Foodorder.objects.all()
            serializer = FoodorderSerializer(orderlist, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

# order id generation 
    def post(self, request):
        serializer = FoodorderSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)


class OrdItems(APIView):
    def get(self, request):
        orditems = Orderitem.objects.all()
        serializer = OrderitemSerializer(orditems, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self,request):
        serializer = OrderitemSerializer(data=request.data, many=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)
    
    # queryset = Orderitem.objects.all()
    # serializer_class = FoodorderpostSerializer
    

class OrdPost(APIView):
    def post(self, request):
        serializer = FoodorderSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            # orderid = serializer.data['id']
            #
            # serializer = request.data['list']
            # for key in serializer:
            #     key['orderid'] = orderid
            # serializer = OrderitemSerializer(serializer)
            # if serializer.is_valid():
            #     serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class OrdPostItems(APIView):
    def post(self,request):
        serializer = OrderitemSerializer(data=request.data, many=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)
# if pk:
#             try:
#                 users = Users.objects.get(pk=pk)
#             except Users.DoesNotExist:
#                 return Response(status=status.HTTP_404_NOT_FOUND)
#             serializer = UserSerializer(users)    
#         else:
#             users = Users.objects.all()
#             serializer = UserSerializer(users, many=True)  
#         return Response(serializer.data) 


# try:
#             categories = Categorylist.objects.get(pk=pk)
#             serializer = CategorylistSerializer(categories)
#             return Response(serializer.data, status=status.HTTP_200_OK)
#         except Categorylist.DoesNotExist:
#             return Response(status=status.HTTP_404_NOT_FOUND)