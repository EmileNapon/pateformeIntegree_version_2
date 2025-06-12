

from django.conf import settings

from django.db import models



from django.db import models
from django.contrib.auth.models import User

STATUT_PROJET_CHOICES = [
    ('planifie', 'Planifié'),
    ('en_cours', 'En cours'),
    ('termine', 'Terminé'),
    ('suspendu', 'Suspendu'),
]

TYPE_TRAVAUX_CHOICES = [
    ('rehabilitation', 'Réhabilitation'),
    ('construction', 'Construction nouvelle'),
    ('bitumage', 'Bitumage'),
    ('entretien', 'Entretien'),
    ('elargissement', 'Élargissement'),
]

TYPE_REVETEMENT_CHOICES = [
    ('bitume', 'Bitume'),
    ('laterite', 'Latérite'),
    ('beton', 'Béton'),
]

class Projet(models.Model):
    """Informations générales du projet de route"""
    nom = models.CharField(max_length=255, unique=True, verbose_name="Nom du Projet")
    code_projet = models.CharField(max_length=100, unique=True, verbose_name="Code du Projet")

    # Localisation
    debut_troncon = models.CharField(max_length=255, verbose_name="Début du Tronçon")
    fin_troncon = models.CharField(max_length=255, verbose_name="Fin du Tronçon")
    region = models.CharField(max_length=100, verbose_name="Région principale")
    latitude = models.DecimalField(max_digits=9, decimal_places=6)
    longitude = models.DecimalField(max_digits=9, decimal_places=6)

    # Informations techniques
    type_travaux = models.CharField(max_length=50, choices=TYPE_TRAVAUX_CHOICES)
    longueur_troncon = models.DecimalField(max_digits=6, decimal_places=2, help_text="En kilomètres")
    largeur_chaussee = models.DecimalField(max_digits=4, decimal_places=2, help_text="En mètres")
    dateDebut = models.DateField(verbose_name="Date de Début")
    dateFin = models.DateField(verbose_name="Date de Fin Prévue", null=True, blank=True)
    type_revetement = models.CharField(max_length=50, choices=TYPE_REVETEMENT_CHOICES)
    normes_techniques = models.TextField(verbose_name="Normes Techniques")

    # Acteurs
    maitre_ouvrage = models.CharField(max_length=255, verbose_name="Maître d’Ouvrage")
    bureau_controle = models.CharField(max_length=255, verbose_name="Bureau de Contrôle")
    bailleurs = models.TextField(verbose_name="Bailleur(s) de Fonds")
    prestataire = models.TextField(max_length=50)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='autorite', on_delete=models.CASCADE)

    # Budget
    budget = models.DecimalField(max_digits=15, decimal_places=2, verbose_name="Budget Global (FCFA)")
    description = models.TextField(verbose_name="Description Détaillée")
    statut = models.CharField(max_length=50, choices=STATUT_PROJET_CHOICES, default='planifie', verbose_name="Statut")
      
    # Documents
    plan_directeur = models.FileField(upload_to="documents/", blank=True, null=True)
    budget_detaille = models.FileField(upload_to="documents/", blank=True, null=True)
    contrat_principal = models.FileField(upload_to="documents/", blank=True, null=True)
    
    def budget_restant(self):
        dernier_decaissement = self.decaissements.order_by('-dateDecaissement').first()
        return self.budget if not dernier_decaissement else dernier_decaissement.budgetRestant

    def __str__(self):
        return self.nom

    
# # class Partenaire(models.Model):
# #     nom = models.CharField(max_length=255)
# #     type = models.CharField(max_length=100, choices=[('Financier', 'Financier'), ('Technique', 'Technique'), ('Logistique', 'Logistique')])
# #     contact = models.CharField(max_length=255, blank=True, null=True)
# #     def __str__(self):
# #         return f"Partenaire {self.nom}"
    
# # class ActeursImpliques(models.Model):
# #     projet = models.ForeignKey(Projet, related_name='Acteurs', on_delete=models.CASCADE)  # 
# #     partenaire = models.ForeignKey(Partenaire, related_name='Partenaire', on_delete=models.CASCADE)  
# #     def __str__(self):
# #         return f"Partenaire de {self.projet.nom}"
    
class PhaseProjet(models.Model):
    projet = models.ForeignKey("Projet", on_delete=models.CASCADE, related_name="phases")
    nom = models.CharField(max_length=100)
    dateDebut = models.DateField()
    dateFin = models.DateField()
    montant = models.DecimalField(max_digits=15, decimal_places=2, default=60000)  # Montant du décaissement
    statut = models.CharField(max_length=50, choices=STATUT_PROJET_CHOICES, default='planifie', verbose_name="Statut")
    description = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"{self.titre} ({self.projet.nom})"

# class Livrable(models.Model):
#     phase = models.ForeignKey("PhaseProjet", on_delete=models.CASCADE, related_name="livrables")
#     nom = models.CharField(max_length=200)
#     description = models.TextField(blank=True, null=True)
#     date_remise = models.DateField(null=True, blank=True)
#     fichier = models.FileField(upload_to="livrables/", blank=True, null=True)

#     def __str__(self):
#         return self.nom




# # class Livrable(models.Model):
# #     etape = models.ForeignKey(PhaseProjet, related_name="livrables", on_delete=models.CASCADE, default=1)
# #     document = models.FileField(upload_to="livrables/" , default="")  # Fichier associé au livrable
# #     description = models.TextField(blank=True, null=True)  # Description du livrable

# #     def __str__(self):
# #         return f"Livrable pour {self.decaissement.nomEtape} ({self.decaissement.projet.nom})"   


# class CitizenReport(models.Model):
#     project = models.ForeignKey(Projet, related_name='reports', on_delete=models.CASCADE)  # Lien vers le projet
#     citizen_name = models.CharField(max_length=200)  # Nom du citoyen ou anonyme
#     report_date = models.DateField(auto_now_add=True)  # Date du signalement
#     report_text = models.TextField()  # Description du problème observé
#     photo = models.ImageField(upload_to='reports/', null=True, blank=True)  # Photo (optionnelle)
#     status = models.CharField(max_length=100, choices=[('New', 'New'), ('Reviewed', 'Reviewed'), ('Resolved', 'Resolved')])  # Statut du rapport

#     def __str__(self):
#         return f"Signalement de {self.citizen_name} pour {self.project.name}"


# class Notification(models.Model):
#     projet = models.ForeignKey(Projet, related_name='notifications', on_delete=models.CASCADE)
#     message = models.TextField()  # Message de notification
#     send_date = models.DateTimeField(auto_now_add=True)  # Date d'envoi
#     sent_to = models.CharField(max_length=200)  # Destinataires (peut inclure les groupes de citoyens)
#     platform = models.CharField(max_length=100, choices=[('Facebook', 'Facebook'), ('SMS', 'SMS')])  # Canal de notification

#     def __str__(self):
#         return f"Notification pour {self.project.name} le {self.send_date}"

# # class EtapePhase(models.Model):
# #     phase = models.ForeignKey(PhaseProjet, on_delete=models.CASCADE, related_name="etapes")
# #     titre = models.CharField(max_length=100)
# #     montant = models.DecimalField(max_digits=15, decimal_places=2, default=60000)  # Montant du décaissement
# #     description = models.TextField(blank=True, null=True)
# #     date_debut = models.DateField()
# #     date_fin = models.DateField()

# #     def __str__(self):
# #         return f"{self.titre} - {self.phase.titre} ({self.phase.projet.nom})"