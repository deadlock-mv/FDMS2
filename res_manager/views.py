from django.shortcuts import render
from app.models import *
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from res_manager.serializers import *
from res_manager.pagination import MangerOrderPagination


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
    pagination_class = MangerOrderPagination

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

    def get(self, request, pk=None):
        if pk:
            try:
                order = Foodorder.objects.get(pk=pk)
                serializer = FoodOrderSerializer(order)
            except Orderitem.DoesNotExist:
                return Response(status=status.HTTP_404_NOT_FOUND)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            order = Foodorder.objects.all().order_by('-id')
            page = self.paginate_queryset(order)
            serializer = FoodOrderSerializer(page, many=True)
            return self.get_paginated_response(serializer.data)

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
        
            

    # def get(self, request, pk):
    #     try:
    #         details = Foodorder.objects.filter(customerid=pk).order_by('-id')
    #         page = self.paginate_queryset(details)
    #         if page is not None:
    #             serializer = OrderDetailSerializer(page, many=True)
    #             return self.get_paginated_response(serializer.data)
    #     except Exception as e:
    #         return Response(status=status.HTTP_404_NOT_FOUND)