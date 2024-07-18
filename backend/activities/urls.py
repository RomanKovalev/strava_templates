from django.urls import path
from . import views

app_name = 'profiles'

urlpatterns = [
    path('sync/', views.sync_activities, name='sync'),
]
