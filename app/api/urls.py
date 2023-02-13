from django.urls import path, include
from .views import UserList, UserDetail, CategoryList, CategoryDetail, OrderList, OrdItems


urlpatterns = [
    path('userlist/', UserList.as_view(), name='UserList'),
    path('userlist/<int:pk>/', UserList.as_view(), name='UserList'),
    path('<int:pk>/', UserDetail.as_view(), name='UserDetail'),
    path('Category/',CategoryList.as_view(), name='CategoryList'),
    path('Category/<int:pk>/', CategoryDetail.as_view(), name='CategoryDetail'),
    path('Order/', OrderList.as_view(), name='OrderList'),
    path('Order/<int:pk>/', OrderList.as_view(), name='Order'),
    path('login/',UserDetail.login, name='Login'),

    path('ordlist/',OrdItems.as_view()),
]
