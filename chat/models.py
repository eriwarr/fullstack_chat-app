from django.db import models

# Create your models here.
class ChatMessage(models.Model):
    message = models.TextField(max_length=500)
    time = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.message
