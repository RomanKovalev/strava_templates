from django.urls import path
from . import views

urlpatterns = [
    path('strava_auth/', views.strava_auth, name='strava_auth'),
    path('strava_callback/', views.strava_callback, name='strava_callback'),
]