import logging
from celery import shared_task
import requests
from activities.models import Activity, Map
from profiles.models import StravaUserProfile
from strava_views import settings

logger = logging.getLogger('celery')

@shared_task
def fetch_strava_activities(strava_user_profile_id):
    strava_user_profile = StravaUserProfile.objects.get(id=strava_user_profile_id)
    if strava_user_profile.status != "Completed":
        strava_user_profile.status = "In Progress"
        strava_user_profile.save()
        url_params = f'per_page={strava_user_profile.per_page}&page={strava_user_profile.page}'
        url = f'https://www.strava.com/api/v3/athlete/activities?{url_params}'
        token = strava_user_profile.access_token

        headers = {"Authorization": f'Bearer {token}'}
        response = requests.get(url, headers=headers)

        if response.status_code == 200:
            print("syncing_activities_data.page: ", strava_user_profile.page)
            data = response.json()
            if data != []:
                for activity_data in data:
                    map_data = activity_data.pop('map')
                    athlete = activity_data.pop('athlete')

                    map_instance, created = Map.objects.get_or_create(
                        id=map_data['id'],
                        defaults={
                            'summary_polyline': map_data['summary_polyline'],
                            'resource_state': map_data['resource_state']
                        }
                    )

                    Activity.objects.get_or_create(
                        athlete=strava_user_profile,
                        map=map_instance,
                        **activity_data
                    )
                strava_user_profile.page += 1
                strava_user_profile.save()
            else:
                strava_user_profile.status = "Completed"
                strava_user_profile.save()
            if strava_user_profile.status == "In Progress":
                fetch_strava_activities(strava_user_profile_id)
        elif response.status_code == 401 and response.json()['errors'][0]['field'] == "access_token" and response.json()['errors'][0]['code'] == "invalid":
            print(f"Info: token is expired, getting new one...")
            url = "https://www.strava.com/oauth/token"
            data = {
                'client_id': settings.STRAVA_CLIENT_ID,
                'client_secret': settings.STRAVA_CLIENT_SECRET,
                'grant_type': 'refresh_token',
                'refresh_token': strava_user_profile.refresh_token
            }
            response = requests.post(url, data=data)
            if response.status_code == 200:
                tokens = response.json()
                strava_user_profile.access_token = tokens['access_token']
                strava_user_profile.refresh_token = tokens['refresh_token']
                strava_user_profile.expires_in = tokens['expires_in']
                strava_user_profile.expires_at = tokens['expires_at']
                strava_user_profile.save()
                print(f"Info: new token received successfully...")
                fetch_strava_activities(strava_user_profile_id)
            else:
                print(f"Error: {response.status_code}")
                print(response.json())
                raise Exception
        else:
            print(f"Failed to fetch data from Strava: {response.status_code}")
    else:
        print("All data fetched successfully")