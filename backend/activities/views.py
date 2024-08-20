import requests
from datetime import datetime, timedelta

from django.http import JsonResponse
from django.conf import settings
from django.contrib.auth.models import User

from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import status

from .models import StravaProfile, Map, Activity
from .serializers import ActivitySerializer

class MyProtectedView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return JsonResponse({"message": "This is a protected view!"})


class StravaAuthStartView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        strava_auth_url = (
            f"https://www.strava.com/oauth/authorize?client_id={settings.STRAVA_CLIENT_ID}"
            f"&response_type=code&redirect_uri={settings.STRAVA_REDIRECT_URI}"
            f"&scope=read,activity:read_all&approval_prompt=auto"
        )
        return JsonResponse({"auth_url": strava_auth_url})


class StravaAuthCallbackView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        code = request.GET.get('code')

        if not code:
            return Response({"error": "No code provided"}, status=400)

        token_url = 'https://www.strava.com/oauth/token'
        data = {
            'client_id': settings.STRAVA_CLIENT_ID,
            'client_secret': settings.STRAVA_CLIENT_SECRET,
            'code': code,
            'grant_type': 'authorization_code'
        }

        response = requests.post(token_url, data=data)
        response_data = response.json()

        if response.status_code != 200:
            return Response({"error": response_data.get("message", "Failed to authenticate")}, status=400)
        _response_data = {
            'token_type': 'Bearer',
            'expires_at': 1723940698,
            'expires_in': 21600,
            'refresh_token': '96cc04c8fd4cf11f21bdb7eb1119899a25472835',
            'access_token': 'a22c23ffe6f8a1e353d78a28683986c67ea46c8b',
            'athlete': {
                'id': 3226679,
                'username': None,
                'resource_state': 2,
                'firstname': 'Roman',
                'lastname': '_',
                'bio': '',
                'city': 'Joensuu',
                'state': 'North Karelia',
                'country': 'Finland',
                'sex': 'M',
                'premium': False,
                'summit': False,
                'created_at': '2013-10-16T09:38:14Z',
                'updated_at': '2024-08-17T09:16:25Z',
                'badge_type_id': 0,
                'weight': 85.0,
                'profile_medium': 'https://dgalywyr863hv.cloudfront.net/pictures/athletes/3226679/13730994/1/medium.jpg',
                'profile': 'https://dgalywyr863hv.cloudfront.net/pictures/athletes/3226679/13730994/1/large.jpg',
                'friend': None,
                'follower': None
            }
        }

        strava_token = response_data['access_token']
        athlete = response_data['athlete']

        user, created = User.objects.get_or_create(username=athlete['id'], defaults={
            'first_name': athlete['firstname'],
            'last_name': athlete['lastname'],
            'email': athlete.get('email', ''),
        })

        StravaProfile.objects.update_or_create(user=user, defaults={
            'strava_id': athlete['id'],
            'access_token': strava_token,
            'refresh_token': response_data['refresh_token'],
            'expires_at': response_data['expires_at'],
        })

        refresh = RefreshToken.for_user(user)

        response = Response({
            'message': 'Logged in successfully',
            'user': {
                'username': user.username,
                'email': user.email,
            }
        }, status=status.HTTP_200_OK)
        expiration = datetime.utcnow() + timedelta(days=7)
        response.set_cookie(
            key='jwt',
            value=refresh.access_token,
            expires=expiration,
            httponly=True,  # Доступ только через HTTP (невидимо для JavaScript)
            # secure=True,  # Только через HTTPS (рекомендуется для production)
            # samesite='Lax'  # Cookie отправляется только при запросах с того же сайта
            samesite=None
        )
        return response


class StravaLogoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        response = Response({"message": "Logged out successfully"}, status=status.HTTP_200_OK)
        response.delete_cookie('jwt')
        return response

class CheckAuthView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response({
            'authenticated': True,
            'user': {
                'username': request.user.username,
                'email': request.user.email,
        }
    })

from activities.utils import fetch_strava_activities
class RunView(APIView):
    permission_classes = [AllowAny]
    def get(self, request):
        print("Starting Run View")
        fetch_strava_activities(2)

        return Response({
            'authenticated': True,
        })

class DashboardApiView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            strava_profile = StravaProfile.objects.get(user=request.user)
        except StravaProfile.DoesNotExist:
            return Response({"error": "Strava profile not found"}, status=status.HTTP_404_NOT_FOUND)

        activities = Activity.objects.filter(athlete__user=request.user).order_by('-start_date')[:5]

        serializer = ActivitySerializer(activities, many=True)

        return Response({"activities": serializer.data}, status=status.HTTP_200_OK)

