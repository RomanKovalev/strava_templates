import requests

from django.db.models.functions import ExtractYear
from datetime import datetime, timedelta

from activities.models import StravaProfile, Map, Activity

def fetch_strava_activities(strava_profile_to_sync_id):
    print("Starting Run View")
    strava_profile_to_sync = StravaProfile.objects.get(id=strava_profile_to_sync_id)
    if strava_profile_to_sync.status != "Completed":
        strava_profile_to_sync.status = "In Progress"
        strava_profile_to_sync.save()

    url_params = f'per_page={strava_profile_to_sync.per_page}&page={strava_profile_to_sync.page}'
    url = f'https://www.strava.com/api/v3/athlete/activities?{url_params}'
    token = strava_profile_to_sync.access_token

    headers = {"Authorization": f'Bearer {token}'}
    response = requests.get(url, headers=headers)
    print("Made request: ", url_params)
    if response.status_code == 200:
        data = response.json()
        if data != []:
            for activity_data in data:
                athlete_data = activity_data.pop('athlete')
                map_data = activity_data.pop('map')

                map_instance, created = Map.objects.get_or_create(
                    id=map_data['id'],
                    defaults={
                        'summary_polyline': map_data['summary_polyline'],
                        'resource_state': map_data['resource_state']
                    }
                )

                Activity.objects.get_or_create(
                    athlete=strava_profile_to_sync,
                    map=map_instance,
                    **activity_data
                )
            strava_profile_to_sync.page += 1
            strava_profile_to_sync.save()
        else:
            strava_profile_to_sync.status = "Completed"
            strava_profile_to_sync.save()
        if strava_profile_to_sync.status == "In Progress":
            fetch_strava_activities(strava_profile_to_sync_id)
        else:
            print(f"All data fetched successfully!")




# Генерация списка всех недель в заданном диапазоне
def generate_week_year_pairs(start_date):
    current_date = datetime(start_date.year, start_date.month, start_date.day)
    end_date = datetime(datetime.now().year, datetime.now().month, datetime.now().day)
    week_year_pairs = []

    while current_date < end_date:
        year = current_date.year
        week = current_date.isocalendar()[1]
        week_year_pairs.append({'year': year, 'week': week})
        current_date += timedelta(weeks=1)

    return week_year_pairs
