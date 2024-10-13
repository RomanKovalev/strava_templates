from django.contrib.auth import authenticate
from datetime import datetime, timedelta
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.tokens import RefreshToken

User = get_user_model()

@api_view(['POST'])
def register_user(request):
    email = request.data.get('email')
    password = request.data.get('password')

    if User.objects.filter(username=email).exists():
        return Response({'error': 'User already exists'}, status=status.HTTP_400_BAD_REQUEST)

    user = User.objects.create_user(username=email, email=email, password=password)
    refresh = RefreshToken.for_user(user)

    response = Response({
        'message': 'Logged in successfully',
        'user': {
            'username': user.username,
            'email': user.email,
            'isSyncing': user.is_syncing
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



@api_view(['POST'])
def login_user(request):
    email = request.data.get('email')
    password = request.data.get('password')
    user = authenticate(username=email, password=password)

    if user is not None:
        refresh = RefreshToken.for_user(user)
        response = Response({
            'message': 'Logged in successfully',
            'user': {
                'username': user.username,
                'email': user.email,
                'isSyncing': user.is_syncing
            }
        }, status=status.HTTP_200_OK)
        access_expiration = datetime.utcnow() + timedelta(minutes=5)
        response.set_cookie(
            key='jwt_access',
            value=refresh.access_token,
            expires=access_expiration,
            httponly=True,
            secure=True,
            samesite='Lax'
        )
        refresh_expiration = datetime.utcnow() + timedelta(days=7)
        response.set_cookie(
            key='jwt_refresh',
            value=str(refresh),
            expires=refresh_expiration,
            httponly=True,
            secure=True,
            samesite='Lax'
        )

        return response
    return Response({'error': 'Invalid credentials'}, status=status.HTTP_400_BAD_REQUEST)