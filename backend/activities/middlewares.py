from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.exceptions import TokenError, InvalidToken
from datetime import datetime
import jwt
from django.conf import settings

class JWTAuthCookieMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        if request.path == '/api/strava/login/' or request.path == '/api/strava/callback/':
            response = self.get_response(request)
            return response

        jwt_access_token = request.COOKIES.get('jwt_access')
        jwt_refresh_token = request.COOKIES.get('jwt_refresh')

        if jwt_access_token is None and jwt_refresh_token:
            try:
                refresh_token = RefreshToken(jwt_refresh_token)
                new_jwt_access_token = refresh_token.access_token

                response = self.get_response(request)
                response.set_cookie(
                    key='jwt_access',
                    value=str(new_jwt_access_token),
                    expires=new_jwt_access_token.get('exp'),
                    httponly=True,
                    secure=True,  # Включите в production
                    samesite='Lax'
                )
                request.META['HTTP_AUTHORIZATION'] = f'Bearer {jwt_access_token}'
                return response

            except TokenError:
                response = self.get_response(request)
                response.delete_cookie('jwt_access')
                response.delete_cookie('jwt_refresh')

                response = self.get_response(request)
                return response
        if jwt_access_token and jwt_refresh_token:
            request.META['HTTP_AUTHORIZATION'] = f'Bearer {jwt_access_token}'

        response = self.get_response(request)
        return response