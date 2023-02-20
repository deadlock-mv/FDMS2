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
from app.api.pagination import UserOrderPagination

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

    def delete(self, request, pk=None):
        users = User.objects.get(pk=pk)
        users.delete()
        return Response(status=status.HTTP_204_NO_CONTENT) 


# particular user related functionality like get, put, delete for now -feb 9,
# need to add post functionality for ordering
class UserDetail(APIView):
    def get(self, request, pk=None):
        try:
            users = User.objects.get(pk=pk)
        except User.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = UserSerializer(users)      
        return Response(serializer.data) 

    def put(self, request, pk=None):
        users = User.objects.get(pk=pk)
        serializer = UserSerializer(users, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk=None):
        users = User.objects.get(pk=pk)
        users.delete()
        return Response(status=status.HTTP_204_NO_CONTENT) 


class CategoryList(APIView):
    def get(self, request):
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


class UserOrder(APIView):
    pagination_class = UserOrderPagination

    @property
    def paginator(self):
        """The paginator instance associated with the view, or `None`."""
        if not hasattr(self, '_paginator'):
            if self.pagination_class is None:
                self._paginator = None
            else:
                self._paginator = self.pagination_class()
        return self._paginator

    def paginate_queryset(self, queryset):
        """Return a single page of results, or `None` if pagination is disabled."""
        if self.paginator is None:
            return None
        return self.paginator.paginate_queryset(queryset, self.request, view=self)

    def get_paginated_response(self, data):
        """Return a paginated style `Response` object for the given output data."""
        assert self.paginator is not None
        return self.paginator.get_paginated_response(data)

    def get(self, request, pk):
        try:
            details = Foodorder.objects.filter(customerid=pk).order_by('-id')
            page = self.paginate_queryset(details)
            if page is not None:
                serializer = OrderDetailSerializer(page, many=True)
                return self.get_paginated_response(serializer.data)
        except Exception as e:
            return Response(status=status.HTTP_404_NOT_FOUND)
        # return Response(serializer.data, status=status.HTTP_200_OK)


class OrdPost(APIView):
    def post(self, request):
        serializer = FoodorderSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data['id'], status=status.HTTP_200_OK)
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
