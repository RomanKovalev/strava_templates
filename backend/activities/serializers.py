from rest_framework import serializers
from .models import Activity

class ActivitySerializer(serializers.ModelSerializer):
    start_date = serializers.DateTimeField(format='%Y-%m-%d %H:%M')
    class Meta:
        model = Activity
        fields = ['id', 'name', 'distance', 'moving_time', 'elapsed_time', 'total_elevation_gain', 'type', 'start_date']

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['distance'] = instance.distance // 1000

        hours = instance.moving_time // 3600
        minutes = (instance.moving_time % 3600) // 60
        remaining_seconds = instance.moving_time % 60
        representation['moving_time'] = f"{hours}:{minutes}:{remaining_seconds}"
        representation['total_elevation_gain'] = round(instance.total_elevation_gain)
        return representation
