from celery import shared_task
from activities.utils import get_activities, get_activities1
import logging
from celery import shared_task
import requests
# from activities.models import Activity, Athlete, Map, SyncingActivitiesData
# from allauth.socialaccount.models import SocialAccount
from django.db import transaction

logger = logging.getLogger('celery')


@shared_task
def add():
    logger.info(f'Executing task: add()')
    for i in range(1, 4):
        get_activities1()



# @shared_task
def fetch_strava_activities():
    print("sssssssssssssssssssssssssss")
    # syncing_activities_data = SyncingActivitiesData.objects.get(id=syncing_activities_data_id)
    # if syncing_activities_data.status != "Completed":
    #     syncing_activities_data.status = "In Progress"
    #     syncing_activities_data.save()
    #     url_params = f'per_page={syncing_activities_data.per_page}&page={syncing_activities_data.page}'
    #     url = f'https://www.strava.com/api/v3/athlete/activities?{url_params}'
    #     token = syncing_activities_data.user.socialaccount_set.all()[0].socialtoken_set.all()[0].token
    #     headers = {"Authorization": f'Bearer {token}'}
    #     response = requests.get(url, headers=headers)
    #     if response.status_code == 200:
    #         print("syncing_activities_data.page: ", syncing_activities_data.page)
    #         data = response.json()
    #         if data != []:
    #             for activity_data in data:
    #                 athlete_data = activity_data.pop('athlete')
    #                 map_data = activity_data.pop('map')
    #
    #                 athlete, created = Athlete.objects.get_or_create(
    #                     id=athlete_data['id'],
    #                     defaults={'resource_state': athlete_data['resource_state']}
    #                 )
    #
    #                 map_instance, created = Map.objects.get_or_create(
    #                     id=map_data['id'],
    #                     defaults={
    #                         'summary_polyline': map_data['summary_polyline'],
    #                         'resource_state': map_data['resource_state']
    #                     }
    #                 )
    #
    #                 Activity.objects.get_or_create(
    #                     athlete=athlete,
    #                     map=map_instance,
    #                     **activity_data
    #                 )
    #             syncing_activities_data.page += 1
    #             syncing_activities_data.save()
    #         else:
    #             syncing_activities_data.status = "Completed"
    #             syncing_activities_data.save()
    #         if syncing_activities_data.status == "In Progress":
    #             fetch_strava_activities(syncing_activities_data_id)
    #     else:
    #         print(f"Failed to fetch data from Strava: {response.status_code}")
    # else:
    #     print("All data fetched successfully")