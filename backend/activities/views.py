from datetime import timezone

from django.shortcuts import render, HttpResponseRedirect
from django.contrib.auth.decorators import login_required
from django.urls import reverse
from activities.models import SyncingActivitiesData
from activities.tasks import fetch_strava_activities

# from activities.tasks import add

# def secure_profile(request):
#     cat = list(num for num in range(0, 37))
#     add.delay()
#     context = {
#         'user': request.user
#     }
#     return render(request, 'secure_profile.html', context)



@login_required
def sync_activities(request):
    SyncingActivitiesData.objects.all().delete()
    syncing_activities_data, created = SyncingActivitiesData.objects.get_or_create(
        user=request.user,
        page=1,
        per_page=200,
        status="CREATED"
    )
    if created:
        print("Created SyncingActivitiesData")
        # fetch_strava_activities.delay(syncing_activities_data.id)
        fetch_strava_activities(syncing_activities_data.id)
        print("Finished SyncingActivitiesData")
    return HttpResponseRedirect(reverse('profiles:dashboard'))
