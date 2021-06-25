from django.urls import path
from . import views

app_name = 'chat'

urlpatterns = [
path('chat/<int:pk>/', views.ChatMessageDetailAPIView.as_view(), name='chatmessage_detail'),
path('chat/', views.ChatMessageListAPIView.as_view(), name='chatmessage_list'),
path('rooms/', views.RoomListAPIView.as_view(), name='room_list'),
path('rooms/<int:pk>/', views.RoomDetailAPIView.as_view(), name='room_detail'),
]
