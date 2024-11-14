from django.contrib.auth.models import User
from django.contrib.auth.models import AbstractUser

from django.db import models


class StravaUserProfile(AbstractUser):
    STATUS_CHOICES = [
        ('CREATED', 'Created'),
        ('PENDING', 'Pending'),
        ('IN_PROGRESS', 'In Progress'),
        ('COMPLETED', 'Completed'),
        ('FAILED', 'Failed'),
        ]
    strava_id = models.CharField(max_length=255, unique=True, null=True, blank=True)
    access_token = models.CharField(max_length=255, null=True, blank=True)
    refresh_token = models.CharField(max_length=255, null=True, blank=True)
    expires_at = models.IntegerField(blank=True, null=True)
    expires_in = models.IntegerField(blank=True, null=True)
    is_syncing = models.BooleanField(default=True)
    status = models.CharField(default=None, blank=True, null=True, max_length=20, choices=STATUS_CHOICES)
    page = models.IntegerField(default=1, blank=True, null=True)
    per_page = models.IntegerField(default=200, blank=True, null=True)
    def __str__(self):
        return str(self.username)
