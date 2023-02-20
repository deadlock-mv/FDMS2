from django.shortcuts import render
from app.models import *
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from res_manager.serializers import *


# Create your views here.
class Category(APIView):
    def get(self, request, pk=None):
        if pk:
            try:
                category = Categorylist.objects.get(pk=pk)
            except Categorylist.DoesNotExist:
                return Response(status = status.HTTP_404_NOT_FOUND)
            serializer = CategorySerializers(category)
        else:
            category = Categorylist.objects.all()
            serializer = CategorySerializers(category, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = CategorySerializers(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, pk):
        category = Categorylist.objects.get(pk=pk)
        serializer = CategorySerializers(category, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        category = Categorylist.objects.get(pk=pk)
        category.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

        
class Item(APIView):
    def get(self, request, pk=None):
        if pk:
            try:
                item = Itemlist.objects.get(pk=pk)
            except Itemlist.DoesNotExist:
                return Response(status=status.HTTP_404_NOT_FOUND)
            serializer = ItemSerializer(item)
        else:
            item = Itemlist.objects.all()
            serializer = ItemSerializer(item, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = ItemSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, pk):
        try:
            item = Itemlist.objects.get(pk=pk)
        except Itemlist.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        serializer = ItemSerializer(item, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, pk):
        if pk:
            try:
                item = Itemlist.objects.get(pk=pk)
                item.delete()
                return Response(status=status.HTTP_204_NO_CONTENT)
            except Itemlist.DoesNotExist:
                return Response(status=status.HTTP_404_NOT_FOUND)


class FoodOrder(APIView):
    def get(self, request, pk=None):
        if pk:
            try:
                order = Foodorder.objects.get(pk=pk)
                serializer = FoodOrderSerializer(order)
            except Orderitem.DoesNotExist:
                return Response(status=status.HTTP_404_NOT_FOUND)
        else:
            order = Foodorder.objects.all()
            serializer = FoodOrderSerializer(order, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def put(self, request, pk):
        try:
            order = Foodorder.objects.get(pk=pk)
        except Foodorder.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = FoodOrderSerializer(order, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
            
