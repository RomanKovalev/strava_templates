from django.shortcuts import redirect, render
from django.contrib.auth.decorators import login_required
import requests
import time
from .models import StravaToken

client_id = 31qwe927
client_secret = '1118cc49aff6810ff72aadf8a69af6a01363735911b209'
redirect_uri = 'https://ebdccc6f5b8246b0a07e24csasa7d566df2.serveo.net/activities/strava_callback'


@login_required
def strava_auth(request):
    authorization_url = f'https://www.strava.com/oauth/authorize?client_id={client_id}&response_type=code&redirect_uri={redirect_uri}&approval_prompt=force&scope=activity:read_all'
    return redirect(authorization_url)

@login_required
def strava_callback(request):
    code = request.GET.get('code')
    token_url = 'https://www.strava.com/oauth/token'
    payload = {
        'client_id': client_id,
        'client_secret': client_secret,
        'code': code,
        'grant_type': 'authorization_code'
    }

    response = requests.post(token_url, data=payload)
    if response.status_code == 200:
        tokens = response.json()
        access_token = tokens['access_token']
        refresh_token = tokens['refresh_token']
        expires_at = tokens['expires_at']
        strava_token, created = StravaToken.objects.get_or_create(
            user=request.user,
            access_token=access_token,
            refresh_token=refresh_token,
            expires_at=expires_at
        )

        strava_token.save()

        return redirect('activities')

def get_access_token(user):
    strava_token = StravaToken.objects.get(user=user)
    if time.time() > strava_token.expires_at:
        token_url = 'https://www.strava.com/oauth/token'
        refresh_payload = {
            'client_id': client_id,
            'client_secret': client_secret,
            'grant_type': 'refresh_token',
            'refresh_token': strava_token.refresh_token
        }
        response = requests.post(token_url, data=refresh_payload)
        new_tokens = response.json()

        strava_token.access_token = new_tokens['access_token']
        strava_token.refresh_token = new_tokens['refresh_token']
        strava_token.expires_at = new_tokens['expires_at']
        strava_token.save()
    return strava_token.access_token

@login_required
def get_activities(request):
    access_token = get_access_token(request.user)
    headers = {
        'Authorization': f'Bearer {access_token}'
    }

    activities_url = 'https://www.strava.com/api/v3/athlete/activities'
    params = {
        'per_page': 30,
        'page': 1
    }

    response = requests.get(activities_url, headers=headers, params=params)
    activities = response.json()

    return render(request, 'activities/activities.html', {'activities': activities})