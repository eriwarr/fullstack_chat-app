from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class ChatMessage(models.Model):
    message = models.TextField(max_length=500)
    time = models.DateTimeField(auto_now=True)
    username = models.ForeignKey(User, on_delete=models.CASCADE, null=True)

    def __str__(self):
        return self.message
