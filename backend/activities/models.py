from django.contrib.auth.models import User
from django.db import models

class StravaProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    strava_id = models.CharField(max_length=255, unique=True)
    access_token = models.CharField(max_length=255)
    refresh_token = models.CharField(max_length=255)
    expires_at = models.IntegerField()

    def __str__(self):
        return self.user.username