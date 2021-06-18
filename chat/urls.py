from django.urls import path
from .views import ChatMessageListAPIView

app_name = 'chat'

urlpatterns = [
path('', ChatMessageListAPIView.as_view(), name='chatmessage_list')
]
