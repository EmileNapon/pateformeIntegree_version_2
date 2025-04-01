from rest_framework import generics
from .models import Projet, Partenaire, DetailsProjet, Localisation, ActeursImpliques, Decaissement, CitizenReport, Notification
from .serializers import ProjetSerializer, PartenaireSerializer, DetailsProjetSerializer, LocalisationSerializer, ActeursImpliquesSerializer, DecaissementSerializer, CitizenReportSerializer, NotificationSerializer

# 📌 Projet - Créer, Lire, Modifier, Supprimer
class ProjetListCreate(generics.ListCreateAPIView):
    queryset = Projet.objects.all()
    serializer_class = ProjetSerializer

class ProjetRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Projet.objects.all()
    serializer_class = ProjetSerializer

# 📌 Partenaire - Créer, Lire, Modifier, Supprimer
class PartenaireListCreate(generics.ListCreateAPIView):
    queryset = Partenaire.objects.all()
    serializer_class = PartenaireSerializer

class PartenaireRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Partenaire.objects.all()
    serializer_class = PartenaireSerializer

# 📌 Détails du Projet - Créer, Lire, Modifier, Supprimer
class DetailsProjetListCreate(generics.ListCreateAPIView):
    queryset = DetailsProjet.objects.all()
    serializer_class = DetailsProjetSerializer

class DetailsProjetRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = DetailsProjet.objects.all()
    serializer_class = DetailsProjetSerializer

# 📌 Localisation - Créer, Lire, Modifier, Supprimer
class LocalisationListCreate(generics.ListCreateAPIView):
    queryset = Localisation.objects.all()
    serializer_class = LocalisationSerializer

class LocalisationRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Localisation.objects.all()
    serializer_class = LocalisationSerializer

# 📌 Acteurs Impliqués - Créer, Lire, Modifier, Supprimer
class ActeursImpliquesListCreate(generics.ListCreateAPIView):
    queryset = ActeursImpliques.objects.all()
    serializer_class = ActeursImpliquesSerializer

class ActeursImpliquesRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = ActeursImpliques.objects.all()
    serializer_class = ActeursImpliquesSerializer

# 📌 Décaissement - Créer, Lire, Modifier, Supprimer
class DecaissementListCreate(generics.ListCreateAPIView):
    queryset = Decaissement.objects.all()
    serializer_class = DecaissementSerializer

class DecaissementRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Decaissement.objects.all()
    serializer_class = DecaissementSerializer

# 📌 Citizen Report - Créer, Lire, Modifier, Supprimer
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
