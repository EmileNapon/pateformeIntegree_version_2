from http.client import NOT_FOUND
from rest_framework import generics
from .models import Projet, Partenaire, ActeursImpliques, CitizenReport, Notification, PhaseProjet, EtapePhase, Livrable
from .serializers import ProjetSerializer, PartenaireSerializer,  ActeursImpliquesSerializer, CitizenReportSerializer, NotificationSerializer, PhaseProjetSerializer, EtapePhaseSerializer, LivrableSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from rest_framework.parsers import MultiPartParser, FormParser


from rest_framework.generics import get_object_or_404



# 📌 Projet - Créer, Lire, Modifier, Supprimer
class ProjetListCreate(generics.ListCreateAPIView):
    queryset = Projet.objects.all()
    serializer_class = ProjetSerializer

class ProjetRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Projet.objects.all()
    serializer_class = ProjetSerializer



class PartenaireListCreate(generics.ListCreateAPIView):
    queryset = Partenaire.objects.all()
    serializer_class = PartenaireSerializer

class PartenaireRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Partenaire.objects.all()
    serializer_class = PartenaireSerializer
   
class PartenaireImpliquesDetails(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = PartenaireSerializer
    def get_queryset(self):
        partenaire_id = self.kwargs.get('partenaire_id')  # Récupérer projet_id depuis l'URL
        if partenaire_id:
            return Partenaire.objects.filter(id=partenaire_id)
        raise NOT_FOUND("Projet ID non fourni.")
    

# 📌 Acteurs Impliqués - Créer, Lire, Modifier, Supprimer
class ActeursImpliquesListCreate(generics.ListCreateAPIView):
    queryset = ActeursImpliques.objects.all()
    serializer_class = ActeursImpliquesSerializer

class ActeursImpliquesRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = ActeursImpliques.objects.all()
    serializer_class = ActeursImpliquesSerializer

class ActeursImpliquesDetails(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = ActeursImpliquesSerializer
    def get_object(self):
        projet_id = self.kwargs.get('projet_id')
        return get_object_or_404(ActeursImpliques, projet__id=projet_id)


# # 📌 Décaissement - Créer, Lire, Modifier, Supprimer
# class DecaissementListCreate(generics.ListCreateAPIView):
#     queryset = Decaissement.objects.all()
#     serializer_class = DecaissementSerializer
#     parser_classes = (MultiPartParser, FormParser)

#     def perform_create(self, serializer):
#         """
#         Valider que le montant du décaissement est inférieur ou égal au budget restant.
#         """
#         projet = serializer.validated_data['projet']
#         montant = serializer.validated_data['montant']

#         # Récupérer le dernier décaissement pour le projet
#         dernier_decaissement = Decaissement.objects.filter(projet=projet).order_by('-dateDecaissement').first()

#         # Calculer le budget restant
#         budget_restant = projet.budget if not dernier_decaissement else dernier_decaissement.budgetRestant

#         if montant > budget_restant:
#             raise DecaissementSerializer.ValidationError({
#                 'montant': "Le montant du décaissement ne peut pas dépasser le budget restant."
#             })

#         # Appeler la méthode parent pour sauvegarder l'objet
#         serializer.save(budgetRestant=budget_restant - montant)

# class DecaissementRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
#     queryset = Decaissement.objects.all()
#     serializer_class = DecaissementSerializer

#     def perform_update(self, serializer):
#         """
#         Valider que le montant mis à jour est inférieur ou égal au budget restant.
#         """
#         projet = serializer.validated_data['projet']
#         montant = serializer.validated_data['montant']

#         # Récupérer le dernier décaissement pour le projet (exclure l'objet actuel)
#         dernier_decaissement = Decaissement.objects.filter(projet=projet).exclude(id=self.get_object().id).order_by('-dateDecaissement').first()

#         # Calculer le budget restant
#         budget_restant = projet.budget if not dernier_decaissement else dernier_decaissement.budgetRestant

#         if montant > budget_restant:
#             raise DecaissementSerializer.ValidationError({
#                 'montant': "Le montant du décaissement ne peut pas dépasser le budget restant."
#             })

#         # Appeler la méthode parent pour sauvegarder l'objet
#         serializer.save(budgetRestant=budget_restant - montant)


class PhaseProjetListCreate(generics.ListCreateAPIView):
    queryset = PhaseProjet.objects.all()
    serializer_class = PhaseProjetSerializer

class PhaseProjetDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = PhaseProjet.objects.all()
    serializer_class = PhaseProjetSerializer

# EtapePhase
class EtapePhaseListCreate(generics.ListCreateAPIView):
    queryset = EtapePhase.objects.all()
    serializer_class = EtapePhaseSerializer

class EtapePhaseDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = EtapePhase.objects.all()
    serializer_class = EtapePhaseSerializer

# Decaissement
# class DecaissementListCreate(generics.ListCreateAPIView):
#     queryset = Decaissement.objects.all()
#     serializer_class = DecaissementSerializer

# class DecaissementDetail(generics.RetrieveUpdateDestroyAPIView):
#     queryset = Decaissement.objects.all()
#     serializer_class = DecaissementSerializer

# Livrable
class LivrableListCreate(generics.ListCreateAPIView):
    queryset = Livrable.objects.all()
    serializer_class = LivrableSerializer

class LivrableDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Livrable.objects.all()
    serializer_class = LivrableSerializer





class CitizenReportListCreate(generics.ListCreateAPIView):
    queryset = CitizenReport.objects.all()
    serializer_class = CitizenReportSerializer

class CitizenReportRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = CitizenReport.objects.all()
    serializer_class = CitizenReportSerializer

# 📌 Notification - Créer, Lire, Modifier, Supprimer
class NotificationListCreate(generics.ListCreateAPIView):
    queryset = Notification.objects.all()
    serializer_class = NotificationSerializer

class NotificationRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Notification.objects.all()
    serializer_class = NotificationSerializer
