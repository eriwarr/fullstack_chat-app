from django.urls import path
from .views import ChatMessageListAPIView, ChatMessageDetailAPIView

app_name = 'chat'

urlpatterns = [
path('<int:pk>/', ChatMessageDetailAPIView.as_view(), name='chatmessage_detail'),
path('', ChatMessageListAPIView.as_view(), name='chatmessage_list')
]
