from http.client import NOT_FOUND
from rest_framework import generics
from .models import Projet, Partenaire, DetailsProjet, Localisation, ActeursImpliques, Decaissement, CitizenReport, Notification
from .serializers import ProjetSerializer, PartenaireSerializer, DetailsProjetSerializer, LocalisationSerializer, ActeursImpliquesSerializer, DecaissementSerializer, CitizenReportSerializer, NotificationSerializer
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


class DernierProjetIDView(APIView):
    def get(self, request):
        dernier_projet = Projet.objects.order_by('-id').first()
        if dernier_projet:
            return Response(dernier_projet.id, status=status.HTTP_200_OK)
        else:
            return Response(0, status=status.HTTP_200_OK)  # ou None selon ce que tu veux retourner si pas de projet

# 📌 Partenaire - Créer, Lire, Modifier, Supprimer
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
    


# 📌 Détails du Projet - Créer, Lire, Modifier, Supprimer
class DetailsProjetListCreate(generics.ListCreateAPIView):
    queryset = DetailsProjet.objects.all()
    serializer_class = DetailsProjetSerializer

class DetailsProjetRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = DetailsProjet.objects.all()
    serializer_class = DetailsProjetSerializer





class DetailsParProjetDetails(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = DetailsProjetSerializer

    def get_object(self):
        projet_id = self.kwargs.get('projet_id')
        return get_object_or_404(DetailsProjet, projet__id=projet_id)


# 📌 Localisation - Créer, Lire, Modifier, Supprimer
class LocalisationListCreate(generics.ListCreateAPIView):
    queryset = Localisation.objects.all()
    serializer_class = LocalisationSerializer

class LocalisationRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Localisation.objects.all()
    serializer_class = LocalisationSerializer

class DetailsParProjetLocalisation(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = LocalisationSerializer
    def get_object(self):
        projet_id = self.kwargs.get('projet_id')
        return get_object_or_404(Localisation, projet__id=projet_id)




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


# 📌 Décaissement - Créer, Lire, Modifier, Supprimer
class DecaissementListCreate(generics.ListCreateAPIView):
    queryset = Decaissement.objects.all()
    serializer_class = DecaissementSerializer
    parser_classes = (MultiPartParser, FormParser)

    def perform_create(self, serializer):
        """
        Valider que le montant du décaissement est inférieur ou égal au budget restant.
        """
        projet = serializer.validated_data['projet']
        montant = serializer.validated_data['montant']

        # Récupérer le dernier décaissement pour le projet
        dernier_decaissement = Decaissement.objects.filter(projet=projet).order_by('-dateDecaissement').first()

        # Calculer le budget restant
        budget_restant = projet.budget if not dernier_decaissement else dernier_decaissement.budgetRestant

        if montant > budget_restant:
            raise serializers.ValidationError({
                'montant': "Le montant du décaissement ne peut pas dépasser le budget restant."
            })

        # Appeler la méthode parent pour sauvegarder l'objet
        serializer.save(budgetRestant=budget_restant - montant)
class DecaissementRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Decaissement.objects.all()
    serializer_class = DecaissementSerializer

    def perform_update(self, serializer):
        """
        Valider que le montant mis à jour est inférieur ou égal au budget restant.
        """
        projet = serializer.validated_data['projet']
        montant = serializer.validated_data['montant']

        # Récupérer le dernier décaissement pour le projet (exclure l'objet actuel)
        dernier_decaissement = Decaissement.objects.filter(projet=projet).exclude(id=self.get_object().id).order_by('-dateDecaissement').first()

        # Calculer le budget restant
        budget_restant = projet.budget if not dernier_decaissement else dernier_decaissement.budgetRestant

        if montant > budget_restant:
            raise serializers.ValidationError({
                'montant': "Le montant du décaissement ne peut pas dépasser le budget restant."
            })

        # Appeler la méthode parent pour sauvegarder l'objet
        serializer.save(budgetRestant=budget_restant - montant)

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
