from django.contrib.auth.models import User
from django.db import models

from django.contrib.postgres.fields import ArrayField


class StravaProfile(models.Model):
    STATUS_CHOICES = [
        ('CREATED', 'Created'),
        ('PENDING', 'Pending'),
        ('IN_PROGRESS', 'In Progress'),
        ('COMPLETED', 'Completed'),
        ('FAILED', 'Failed'),
    ]
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    strava_id = models.CharField(max_length=255, unique=True)
    access_token = models.CharField(max_length=255)
    refresh_token = models.CharField(max_length=255)
    expires_at = models.IntegerField()
    status = models.CharField(default=None, blank=True, null=True, max_length=20, choices=STATUS_CHOICES)
    page = models.IntegerField(default=1, blank=True, null=True)
    per_page = models.IntegerField(default=200, blank=True, null=True)
    onboarded = models.BooleanField(default=False)

    def __str__(self):
        return self.user.username


class Map(models.Model):
    id = models.CharField(max_length=20, primary_key=True)
    summary_polyline = models.TextField()
    resource_state = models.IntegerField(blank=True, null=True)


class Activity(models.Model):
    resource_state = models.IntegerField(blank=True, null=True)
    athlete = models.ForeignKey(StravaProfile, on_delete=models.CASCADE)
    type = models.CharField(default=None, blank=True, null=True, max_length=50)
    name = models.CharField(default=None, blank=True, null=True, max_length=255)
    distance = models.FloatField(blank=True, null=True)
    moving_time = models.IntegerField(blank=True, null=True)
    elapsed_time = models.IntegerField(blank=True, null=True)
    total_elevation_gain = models.FloatField(blank=True, null=True)
    sport_type = models.CharField(default=None, blank=True, null=True, max_length=50)
    workout_type = models.IntegerField(null=True, blank=True)
    start_date = models.DateTimeField()
    start_date_local = models.DateTimeField()
    timezone = models.CharField(default=None, blank=True, null=True, max_length=50)
    utc_offset = models.IntegerField(blank=True, null=True)
    location_city = models.CharField(default=None, blank=True, null=True, max_length=255)
    location_state = models.CharField(default=None, blank=True, null=True, max_length=255)
    location_country = models.CharField(default=None, blank=True, null=True, max_length=255)
    achievement_count = models.IntegerField(blank=True, null=True)
    kudos_count = models.IntegerField(blank=True, null=True)
    comment_count = models.IntegerField(blank=True, null=True)
    athlete_count = models.IntegerField(blank=True, null=True)
    photo_count = models.IntegerField(blank=True, null=True)
    map = models.OneToOneField(Map, on_delete=models.CASCADE)
    trainer = models.BooleanField(default=None, blank=True, null=True)
    commute = models.BooleanField(default=None, blank=True, null=True)
    manual = models.BooleanField(default=None, blank=True, null=True)
    private = models.BooleanField(default=None, blank=True, null=True)
    visibility = models.CharField(default=None, blank=True, null=True, max_length=50)
    flagged = models.BooleanField(default=None, blank=True, null=True)
    gear_id = models.CharField(default=None, blank=True, null=True, max_length=255)
    start_latlng = ArrayField(models.IntegerField(blank=True, null=True), size=2)
    end_latlng = ArrayField(models.IntegerField(blank=True, null=True), size=2)
    average_speed = models.IntegerField(blank=True, null=True)
    max_speed = models.FloatField(blank=True, null=True)
    average_watts = models.IntegerField(blank=True, null=True)
    kilojoules = models.IntegerField(blank=True, null=True)
    device_watts = models.BooleanField(default=None, blank=True, null=True)
    has_heartrate = models.BooleanField(default=None, blank=True, null=True)
    heartrate_opt_out = models.BooleanField(default=None, blank=True, null=True)
    display_hide_heartrate_option = models.BooleanField(default=None, blank=True, null=True)
    elev_high = models.FloatField(blank=True, null=True)
    elev_low = models.FloatField(blank=True, null=True)
    upload_id = models.CharField(blank=True, null=True)
    upload_id_str = models.CharField(default=None, blank=True, null=True, max_length=255)
    external_id = models.CharField(default=None, blank=True, null=True, max_length=255)
    from_accepted_tag = models.BooleanField(default=None, blank=True, null=True)
    pr_count = models.IntegerField(blank=True, null=True)
    total_photo_count = models.IntegerField(blank=True, null=True)
    has_kudoed = models.BooleanField(default=None, blank=True, null=True)
    average_temp = models.FloatField(default=None, blank=True, null=True)
    average_heartrate = models.IntegerField(blank=True, null=True)
    max_heartrate = models.FloatField(blank=True, null=True)
    average_cadence = models.FloatField(blank=True, null=True)
    max_watts = models.IntegerField(blank=True, null=True)
    weighted_average_watts = models.IntegerField(blank=True, null=True)

    def __str__(self):
        return self.name
