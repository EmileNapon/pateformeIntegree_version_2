from rest_framework import serializers
from .models import Projet, Partenaire, DetailsProjet, Localisation, ActeursImpliques, Decaissement, CitizenReport, Notification

class ProjetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Projet
        fields = '__all__'

class PartenaireSerializer(serializers.ModelSerializer):
    class Meta:
        model = Partenaire
        fields = '__all__'

class DetailsProjetSerializer(serializers.ModelSerializer):
    class Meta:
        model = DetailsProjet
        fields = '__all__'

class LocalisationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Localisation
        fields = '__all__'

class ActeursImpliquesSerializer(serializers.ModelSerializer):
    class Meta:
        model = ActeursImpliques
        fields = '__all__'

class DecaissementSerializer(serializers.ModelSerializer):
    class Meta:
        model = Decaissement
        fields = '__all__'

class CitizenReportSerializer(serializers.ModelSerializer):
    class Meta:
        model = CitizenReport
        fields = '__all__'

class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notification
        fields = '__all__'
