from rest_framework import serializers
from .models import ChatMessage

class ChatMessageSerializer(serializers.ModelSerializer):
    # username = serializers.SerializerMethodField("getUsername")
    class Meta:
        model = ChatMessage
        fields = '__all__'
