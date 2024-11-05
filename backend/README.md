# strava_views
Local development
(win) $env:VITE_BACKEND_API_URL="http://localhost:8000/api"; npm run dev

celery -A strava_views worker --loglevel=info
celery -A strava_views beat --loglevel=info