from rest_framework import generics
from .models import ChatMessage
from .serializers import ChatMessageSerializer
# Create your views here.
class ChatMessageListAPIView(generics.ListCreateAPIView):
    queryset = ChatMessage.objects.all()
    serializer_class = ChatMessageSerializer
