# strava_views
Local development
(win) $env:VITE_BACKEND_API_URL="http://localhost:8000/api"; npm run dev

celery -A strava_views worker --loglevel=info


python manage.py shell -c "from profiles.models import StravaUserProfile as StravaProfile;user=StravaProfile.objects.all()[0];from activities.tasks import fetch_strava_activities;fetch_strava_activities(user)"


docker-compose -f docker-compose.prod.yml restart celery
