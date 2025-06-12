from rest_framework import serializers
from .models import Projet, PhaseProjet

class ProjetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Projet
        fields = '__all__'

class PhaseProjetSerializer(serializers.ModelSerializer):
    class Meta:
        model = PhaseProjet
        fields = '__all__'



# class PartenaireSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Partenaire
#         fields = '__all__'



# class ActeursImpliquesSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = ActeursImpliques
#         fields = '__all__'

# # class DecaissementSerializer(serializers.ModelSerializer):
# #     class Meta:
# #         model = Decaissement
# #         fields = '__all__'

# class LivrableSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Livrable
#         fields = '__all__'

# class CitizenReportSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = CitizenReport
#         fields = '__all__'

# class NotificationSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Notification
#         fields = '__all__'




# class EtapePhaseSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = EtapePhase
#         fields = '__all__'


