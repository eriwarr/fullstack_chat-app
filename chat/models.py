from django.db import models
from django.contrib.auth.models import User


class Room(models.Model):
    name = models.CharField(max_length=20)

    def __str__(self):
        return self.name

# Create your models here.
class ChatMessage(models.Model):
    message = models.TextField()
    time = models.DateTimeField(auto_now=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    # room = models.ForeignKey(Room, on_delete=models.CASCADE)


    def __str__(self):
        return self.message
