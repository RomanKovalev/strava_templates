from django.contrib import admin
from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from activities.views import MyProtectedView, StravaAuthStartView, StravaAuthCallbackView, StravaLogoutView


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/activities/', MyProtectedView.as_view(), name='my_protected'),
    path('api/strava/login/', StravaAuthStartView.as_view(), name='strava-login'),
    path('api/strava/logout/', StravaLogoutView.as_view(), name='strava-logout'),
    path('api/strava/callback/', StravaAuthCallbackView.as_view(), name='strava-callback'),
]
