from rest_framework import serializers
from rest_framework.response import Response
from rest_framework import status
from app.models import *


# class UserSerializer(serializers.Serializer):
    # id = serializers.IntegerField(read_only=True)
    # name = serializers.CharField()
    # userid = serializers.IntegerField(read_only=True)
    # active = serializers.BooleanField()
    

    # class Meta:
    # model = User


class OrderitemSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Orderitem
        fields = '__all__'


class FoodorderSerializer(serializers.ModelSerializer):
    orderitem = OrderitemSerializer(many=True, read_only=True)
    class Meta:
        model = Foodorder
        fields = '__all__'


# class FoodorderpostSerializer(serializers.ModelSerializer):
#     orderitem = OrderitemSerializer(many=True)
#     class Meta:
#         model = Orderitem
#         fields = ('customerid', 'orderstatusid', 'delagentid', 'totalamount','orderitem')

#     def create(self, validated_data):
#         orderitem = validated_data.pop('orderitem')
#         print(**validated_data)
#         foodOrder = Foodorder.objects.create(**validated_data)
#         for order in orderitem:
#             Orderitem.object.create(orderid=foodOrder, **order)
#         return foodOrder
        
   

class ItemlistSerializer(serializers.ModelSerializer):

    class Meta:
        model = Itemlist
        fields = '__all__'


class CategorylistSerializer(serializers.ModelSerializer):
    items = ItemlistSerializer(many=True, read_only=True)
    class Meta:
        model = Categorylist
        fields = '__all__'


class UserSerializer(serializers.ModelSerializer):
    orders = FoodorderSerializer(many=True, read_only=True)
    class Meta:
        model = User
        fields = '__all__'

    def validate_name(self, value):
        if len(value) < 4:
            raise serializers.ValidationError("Name must be at least 4 characters long")
        else:
            return value


# class AuthUserSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = AuthUser
#         fields = ['username','password']

