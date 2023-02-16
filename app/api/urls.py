from django.urls import path, include
from .views import UserList, UserDetail, CategoryList, CategoryDetail, OrderList, OrdPost, OrdPostItems, UserOrder


urlpatterns = [
    # admin related
    path('userlist/', UserList.as_view(), name='UserList'),
    path('userlist/<int:pk>/', UserList.as_view(), name='UserList'),
    path('Category/', CategoryList.as_view(), name='CategoryList'),
    path('Category/<int:pk>/', CategoryDetail.as_view(), name='CategoryDetail'),
    path('Order/', OrderList.as_view(), name='OrderList'),
    path('Order/<int:pk>/', OrderList.as_view(), name='Order'),

    # user related
    path('<int:pk>/', UserDetail.as_view(), name='UserDetail'),
    path('user/orders/<int:pk>', UserOrder.as_view(), name='UserOrders'),

    # Orderid generation & order-item-list generation // posting
    path('Order-items/', OrdPost.as_view()),
    path('ordlist/', OrdPostItems.as_view()),
]
