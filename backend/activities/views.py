import requests
from datetime import datetime, timedelta
from dateutil.relativedelta import relativedelta

from django.http import JsonResponse
from django.conf import settings
from django.contrib.auth.models import User
from django.db.models import Count, Avg, Case, When, Sum, F, Func, Value, CharField, FloatField, Min, Max, IntegerField, ExpressionWrapper
from django.db.models.functions import ExtractHour, TruncDate, Concat, ExtractWeek, ExtractYear, Cast, Coalesce, ExtractYear, Round
from django.utils.timezone import now

from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import status

from activities.models import Map, Activity
from profiles.models import StravaUserProfile as StravaProfile
from activities.serializers import ActivitySerializer
from activities.utils import fetch_strava_activities, generate_week_year_pairs, seconds_to_dhms


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
        access_expiration = datetime.utcnow() + timedelta(minutes=5)
        response.set_cookie(
            key='jwt_access',
            value=refresh.access_token,
            expires=access_expiration,
            httponly=True,
            secure=True,  # Только через HTTPS
            samesite='Lax'
        )

        # Установка refresh token в cookie
        refresh_expiration = datetime.utcnow() + timedelta(days=7)
        response.set_cookie(
            key='jwt_refresh',
            value=str(refresh),
            expires=refresh_expiration,
            httponly=True,
            secure=True,  # Только через HTTPS
            samesite='Lax'
        )
        return response


class StravaLogoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        response = Response({"message": "Logged out successfully"}, status=status.HTTP_200_OK)
        response.delete_cookie('jwt_access')
        response.delete_cookie('jwt_refresh')
        return response

class CheckAuthView(APIView):

    def get(self, request):
        if request.user.is_authenticated:
            return Response({
                'authenticated': True,
                'user': {
                    'username': request.user.username,
                    'email': request.user.email,
                    'isSyncing': request.user.stravaprofile.is_syncing,
                }
            })
        else:
            return Response({
                'authenticated': False
            })



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
            print("req user", request)
            strava_profile = StravaProfile.objects.get(username=request.user.username)
        except StravaProfile.DoesNotExist:
            return Response({"error": "Strava profile not found"}, status=status.HTTP_404_NOT_FOUND)
        activities = Activity.objects.filter(athlete=request.user).order_by('-start_date')[:5]
        if len(activities) <= 10:
            return Response({}, status=status.HTTP_204_NO_CONTENT)
        serializer = ActivitySerializer(activities, many=True)

        first_activity_start_date = Activity.objects.filter(
            athlete__user=request.user
        ).order_by('start_date').first().start_date.replace(tzinfo=None)
        current_date = datetime.now().replace(tzinfo=None)
        date_difference = relativedelta(current_date, first_activity_start_date)

        uniq_days = Activity.objects.annotate(day=TruncDate('start_date')).values('day').distinct().count()

        total_distance = round(Activity.objects.aggregate(total_distance=Sum('distance'))['total_distance'] / 1000)

        total_elevation = round(Activity.objects.aggregate(total_elevation=Sum('total_elevation_gain'))['total_elevation'])

        total_elapsed_time = Activity.objects.aggregate(total_time=Sum('elapsed_time'))['total_time']
        total_time_delta = timedelta(seconds=total_elapsed_time)
        rd = relativedelta(seconds=total_elapsed_time)

        days_since_first_activity = (current_date - first_activity_start_date).days
        weeks_since_first_activity = (current_date - first_activity_start_date).days // 7
        delta = relativedelta(current_date, first_activity_start_date)
        months_since_first_activity = delta.months + delta.years * 12

        total_kilocalories_burned = round(Activity.objects.aggregate(total_kilojoules_burned=Sum('kilojoules'))['total_kilojoules_burned'] / 4.184)

        all_weeks = generate_week_year_pairs(first_activity_start_date)

        weekly_data = (
            Activity.objects
            .annotate(
                week=Cast(ExtractWeek('start_date'), output_field=CharField()),  # Преобразуем week в строку
                year=ExtractYear('start_date')
            )
            .values('week', 'year')
            .annotate(
                distance=Coalesce(Sum('distance'), Value(0, output_field=FloatField())),
                # Задаем выходное поле как FloatField
                name=Concat(
                    F('year'), Value('-W'),
                    Func(F('week'), function='LPAD', template="%(function)s(%(expressions)s, 2, '0')",
                         output_field=CharField()),
                    output_field=CharField()  # Указание, что результат - строка
                )
            )
            .values('name', 'distance')
            .order_by('year', 'week')
        )

        weekly_data_dict = {entry['name']: round(entry['distance'] / 1000) for entry in weekly_data}

        result = []

        for week_year in all_weeks:
            name = f"{week_year['year']}-W{str(week_year['week']).zfill(2)}"
            distance = weekly_data_dict.get(name, 0)
            result.append({'name': name, 'distance': distance})

        # max_moving_time = Activity.objects.aggregate(Max('moving_time'))['moving_time__max']
        start_date = now() - timedelta(days=365)
        recent_year_activities = Activity.objects.filter(start_date__gte=start_date)
        max_moving_time = recent_year_activities.aggregate(max_time=Max('moving_time'))['max_time']
        if max_moving_time:
            activities = recent_year_activities.annotate(
                intensity=ExpressionWrapper(
                    Round(100 * F('moving_time') / max_moving_time),
                    output_field=IntegerField()
                )
            ).values('start_date', 'intensity')
            activity_intensity = [{'date': activity['start_date'], 'count': activity['intensity']} for activity in activities]
        else:
            activity_intensity = []

        total_activities = Activity.objects.count()
        activities_by_day = (
            Activity.objects
            .annotate(
                day_of_week_name=Case(
                    When(start_date__week_day=1, then=Value('Sunday')),
                    When(start_date__week_day=2, then=Value('Monday')),
                    When(start_date__week_day=3, then=Value('Tuesday')),
                    When(start_date__week_day=4, then=Value('Wednesday')),
                    When(start_date__week_day=5, then=Value('Thursday')),
                    When(start_date__week_day=6, then=Value('Friday')),
                    When(start_date__week_day=7, then=Value('Saturday')),
                    output_field=CharField()
                ),
            )
            .values('day_of_week_name')
            .annotate(
                count=Count('id'),
                value=Round(
                    ExpressionWrapper(
                        (Count('id') * 100.0) / total_activities,
                        output_field=FloatField()
                    ), 1
                ),
                total_distance=Round(
                    ExpressionWrapper(Sum('distance') / 1000.0, output_field=FloatField()), 0
                ),
                avg_distance=Round(
                    ExpressionWrapper(Sum('distance') / (Count('id') * 1000.0), output_field=FloatField()), 0
                ),
                total_moving_time=ExpressionWrapper(Sum('moving_time'), output_field=IntegerField()),

                avg_moving_time=ExpressionWrapper(Sum('moving_time') / Count('id'), output_field=FloatField()),

                total_elevation=Round(
                    ExpressionWrapper(Sum('total_elevation_gain'), output_field=FloatField()), 0
                ),
                avg_elevation=Round(
                    ExpressionWrapper(Sum('total_elevation_gain') / Count('id'), output_field=FloatField()), 0
                ),
            )
            .order_by('day_of_week_name')
        )

        activities_by_day_list = list(activities_by_day)

        activities_by_day = [
            {**activity, 'name': activity.pop('day_of_week_name')}
            for activity in activities_by_day_list
        ]

        for activity in activities_by_day:
            activity.pop('day_of_week_name')
            activity['total_moving_time'] = seconds_to_dhms(activity['total_moving_time'])
            activity['total_distance'] = f"{int(activity['total_distance']):,}".replace(',', ' ')
            activity['total_elevation'] = f"{int(activity['total_elevation']):,}".replace(',', ' ')

        # ===========================================================================
        # Aggregate data based on time of day
        activities_with_time_of_day = Activity.objects.annotate(
            time_of_day=Case(
                When(start_date_local__hour__gte=6, start_date__hour__lt=12, then=Value('morning')),
                When(start_date_local__hour__gte=12, start_date__hour__lt=17, then=Value('afternoon')),
                When(start_date_local__hour__gte=17, start_date__hour__lt=23, then=Value('evening')),
                default=Value('night'),
                output_field=CharField()
            )
        )

        # Calculate total activities count to find percentage later
        total_activities = activities_with_time_of_day.count()

        # Aggregate data based on time of day
        aggregated_data = activities_with_time_of_day.values('time_of_day').annotate(
            activity_count=Count('id'),
            value=Round(
                ExpressionWrapper(
                    Count('id') * 100.0 / total_activities,
                    output_field=FloatField()
                ),
            1 ),
            average_distance=Round(Avg('distance') / 100, 0),
            total_distance=Round(Sum('distance') / 100, 0),
            total_elevation=Round(Sum('total_elevation_gain'), 0),
            total_moving_time=Sum('moving_time')
        ).order_by('time_of_day')

        formatted_data = []
        for entry in aggregated_data:
            formatted_entry = {
                'time_of_day': entry['time_of_day'].capitalize(),
                'activity_count': entry['activity_count'],
                'value': entry['value'],
                'average_distance': entry['average_distance'],
                'total_distance': f"{round(entry['total_distance']):,}".replace(',', ' '),  # Форматирование с пробелами
                'total_elevation': f"{round(entry['total_elevation']):,}".replace(',', ' '),  # Форматирование с пробелами
                'total_moving_time': entry['total_moving_time']
            }
            formatted_data.append(formatted_entry)

        activities_by_day_time = list(formatted_data)
        for activity in activities_by_day_time:
            activity['total_moving_time'] = seconds_to_dhms(activity['total_moving_time'])

        return Response({
            "recent_activities": serializer.data,
            "summary": {
                "date_difference_years": date_difference.years,
                "date_difference_months": date_difference.months,
                "date_difference_days": date_difference.days,
                "first_activity_start_date": first_activity_start_date.strftime('%d %b %Y'),
                "uniq_days": uniq_days,
                "total_distance": f"{total_distance:,}".replace(',', ' '),
                "around_earth": round(total_distance / 36788, 2),
                "way_to_the_moon": round(total_distance / 384000, 3),
                "total_elevation": f"{total_elevation:,}".replace(',', ' '),
                "everest_elevation": round(total_elevation / 8845, 2),
                "total_elapsed_time_weeks": rd.weeks,
                "total_elapsed_time_days": rd.days,
                "total_elapsed_time_hours": rd.hours,
                "total_elapsed_time_minutes": rd.minutes,
                "average_day_distance_since_first_activity": round(total_distance / days_since_first_activity, 2),
                "average_week_distance_since_first_activity": round(total_distance / weeks_since_first_activity,2),
                "average_months_distance_since_first_activity": round(total_distance / months_since_first_activity, 2),
                "total_kilocalories_burned": f"{total_kilocalories_burned:,}".replace(',', ' '),
                "pizza_slices_equivalent": round(total_kilocalories_burned / 250, 0)
            },
            "weekly_distances": result,
            "activity_intensity": activity_intensity,
            "activities_by_day": activities_by_day,
            "activities_by_day_time": activities_by_day_time
        }, status=status.HTTP_200_OK)

class ActivityListView(APIView):
    def get(self, request):
        activities = Activity.objects.all()
        serializer = ActivitySerializer(activities, many=True)
        return Response(serializer.data)


class OnBoardApiView(APIView):
    def post(self, request):
        try:
            stravaprofile = self.request.user.stravaprofile
            stravaprofile.onboarded = True
            stravaprofile.save()
            return Response(status=status.HTTP_200_OK)
        except Exception as e:
            print(e)
            return Response(status=status.HTTP_400_BAD_REQUEST)
