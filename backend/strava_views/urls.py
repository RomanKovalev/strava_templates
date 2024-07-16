from django.contrib import admin
from django.urls import path, include
from profiles.views import secure_profile

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('profiles.urls', namespace='profiles')),
    path('accounts/', include('allauth.urls')),
    path('qwe/', secure_profile),
]

