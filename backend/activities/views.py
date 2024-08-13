from django.shortcuts import HttpResponse
from django.http import JsonResponse

# Create your views here.
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView


class MyProtectedView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return JsonResponse({"message": "This is a protected view!"})