from rest_framework import generics
from .models import ChatMessage
from .serializers import ChatMessageSerializer
# Create your views here.
class ChatMessageListAPIView(generics.ListCreateAPIView):
    queryset = ChatMessage.objects.all()
    serializer_class = ChatMessageSerializer

    def perform_create(self, serializer):
        serializer.save(user=self.request.username)

class ChatMessageDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = ChatMessage.objects.all()
    serializer_class = ChatMessageSerializer
