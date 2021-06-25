from rest_framework import serializers
from .models import ChatMessage, Room

class ChatMessageSerializer(serializers.ModelSerializer):
    has_owner_permissions = serializers.SerializerMethodField('get_owner_status')
    owner = serializers.ReadOnlyField(source='user.username')

    def get_owner_status(self, obj):
        # import pdb; pdb.set_trace()
        return obj.user == self.context['request'].user

    class Meta:
        model = ChatMessage
        fields = "__all__"

class RoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = '__all__'
