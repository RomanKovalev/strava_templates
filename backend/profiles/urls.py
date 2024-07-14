from django.urls import path

from profiles import views

urlpatterns = [
    path('', views.secure_profile, name='profile'),
]
