from rest_framework import serializers
from .models import ChatMessage

class ChatMessageSerializer(serializers.ModelSerializer):
    username = serializers.SerializerMethodField('get_username')

    def get_username(self, obj):
        return obj.user.username

    class Meta:
        model = ChatMessage
        fields = "__all__"
