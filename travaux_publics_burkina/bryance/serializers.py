# your_app/serializers.py
from rest_framework import serializers

class FeatureInputSerializer(serializers.Serializer):
    features = serializers.ListField(
        child=serializers.FloatField(),
        min_length=23,
        max_length=23
    )
