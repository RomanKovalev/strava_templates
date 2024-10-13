from datetime import datetime, timezone
from rest_framework_simplejwt.tokens import RefreshToken, AccessToken
from rest_framework_simplejwt.exceptions import TokenError
import jwt
from jwt.exceptions import ExpiredSignatureError, InvalidTokenError


class JWTAuthCookieMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        if request.path in ['api/v1/login', 'api/v1/register', '/api/strava/login/', '/api/strava/callback/']:
            return self.get_response(request)

        jwt_access_token = request.COOKIES.get('jwt_access')
        jwt_refresh_token = request.COOKIES.get('jwt_refresh')

        try:
            if jwt_access_token is not None:
                decoded_token = jwt.decode(jwt_access_token, options={"verify_signature": False})
                exp_timestamp = decoded_token.get('exp')

                if exp_timestamp:
                    # access_token = AccessToken(jwt_access_token)
                    # exp_timestamp = access_token['exp']
                    exp_time = datetime.utcfromtimestamp(exp_timestamp).replace(tzinfo=timezone.utc)

                    current_time = datetime.now(timezone.utc)

                    if exp_time < current_time:
                        jwt_access_token = None
        except (ExpiredSignatureError, InvalidTokenError):
            jwt_access_token = None

        if jwt_access_token is None and jwt_refresh_token is not None:
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

                request.META['HTTP_AUTHORIZATION'] = f'Bearer {new_jwt_access_token}'
                return response

            except TokenError:
                response = self.get_response(request)
                response.delete_cookie('jwt_access')
                response.delete_cookie('jwt_refresh')
                return response

        if jwt_access_token is not None:
            request.META['HTTP_AUTHORIZATION'] = f'Bearer {jwt_access_token}'

        return self.get_response(request)
