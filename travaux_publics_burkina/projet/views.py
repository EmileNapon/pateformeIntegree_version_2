from http.client import NOT_FOUND
from rest_framework import generics
from .models import Projet, PhaseProjet
from .serializers import ProjetSerializer, PhaseProjetSerializer


# 📌 Projet - Créer, Lire, Modifier, Supprimer
class ProjetListCreate(generics.ListCreateAPIView):
    queryset = Projet.objects.all()
    serializer_class = ProjetSerializer

class ProjetRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Projet.objects.all()
    serializer_class = ProjetSerializer


class PhaseProjetListCreate(generics.ListCreateAPIView):
    queryset = PhaseProjet.objects.all()
    serializer_class = PhaseProjetSerializer

class PhaseProjetDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = PhaseProjet.objects.all()
    serializer_class = PhaseProjetSerializer


# class PartenaireListCreate(generics.ListCreateAPIView):
#     queryset = Partenaire.objects.all()
#     serializer_class = PartenaireSerializer

# class PartenaireRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
#     queryset = Partenaire.objects.all()
#     serializer_class = PartenaireSerializer
   
# class PartenaireImpliquesDetails(generics.RetrieveUpdateDestroyAPIView):
#     serializer_class = PartenaireSerializer
#     def get_queryset(self):
#         partenaire_id = self.kwargs.get('partenaire_id')  # Récupérer projet_id depuis l'URL
#         if partenaire_id:
#             return Partenaire.objects.filter(id=partenaire_id)
#         raise NOT_FOUND("Projet ID non fourni.")
    

# # 📌 Acteurs Impliqués - Créer, Lire, Modifier, Supprimer
# class ActeursImpliquesListCreate(generics.ListCreateAPIView):
#     queryset = ActeursImpliques.objects.all()
#     serializer_class = ActeursImpliquesSerializer

# class ActeursImpliquesRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
#     queryset = ActeursImpliques.objects.all()
#     serializer_class = ActeursImpliquesSerializer

# class ActeursImpliquesDetails(generics.RetrieveUpdateDestroyAPIView):
#     serializer_class = ActeursImpliquesSerializer
#     def get_object(self):
#         projet_id = self.kwargs.get('projet_id')
#         return get_object_or_404(ActeursImpliques, projet__id=projet_id)







# # EtapePhase
# class EtapePhaseListCreate(generics.ListCreateAPIView):
#     queryset = EtapePhase.objects.all()
#     serializer_class = EtapePhaseSerializer

# class EtapePhaseDetail(generics.RetrieveUpdateDestroyAPIView):
#     queryset = EtapePhase.objects.all()
#     serializer_class = EtapePhaseSerializer

# # Livrable
# class LivrableListCreate(generics.ListCreateAPIView):
#     queryset = Livrable.objects.all()
#     serializer_class = LivrableSerializer

# class LivrableDetail(generics.RetrieveUpdateDestroyAPIView):
#     queryset = Livrable.objects.all()
#     serializer_class = LivrableSerializer





# class CitizenReportListCreate(generics.ListCreateAPIView):
#     queryset = CitizenReport.objects.all()
#     serializer_class = CitizenReportSerializer

# class CitizenReportRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
#     queryset = CitizenReport.objects.all()
#     serializer_class = CitizenReportSerializer

# # 📌 Notification - Créer, Lire, Modifier, Supprimer
# class NotificationListCreate(generics.ListCreateAPIView):
#     queryset = Notification.objects.all()
#     serializer_class = NotificationSerializer

# class NotificationRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
#     queryset = Notification.objects.all()
#     serializer_class = NotificationSerializer
