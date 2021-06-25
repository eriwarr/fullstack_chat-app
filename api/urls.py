from django.urls import path, include

app_name = 'api_v1'

urlpatterns = [
    path('', include('chat.urls')), 
]
