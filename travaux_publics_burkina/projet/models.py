
from userAuth.models import User


from django.db import models

# Liste des types de projets
TYPE_PROJET_CHOICES = [
    ('infrastructure', 'Infrastructure'),
    ('energie', 'Énergie'),
    ('sante', 'Santé'),
    ('education', 'Éducation'),
    ('transport', 'Transport'),
    ('autre', 'Autre'),
]

# Statuts possibles du projet
STATUT_PROJET_CHOICES = [
    ('planifie', 'Planifié'),
    ('en_cours', 'En cours'),
    ('termine', 'Terminé'),
    ('attente_financement', 'En attente de financement'),
]

class Projet(models.Model):
    """Informations générales du projet"""
    nom = models.CharField(max_length=255, unique=True, verbose_name="Nom du Projet")
    typeProjet = models.CharField(max_length=50, choices=TYPE_PROJET_CHOICES, verbose_name="Type de Projet")
    budget = models.DecimalField(max_digits=15, decimal_places=2, verbose_name="Budget (FCFA)")
    dateDebut = models.DateField(verbose_name="Date de Début")
    dateFin = models.DateField(verbose_name="Date de Fin Prévue", null=True, blank=True)
    statut = models.CharField(max_length=50, choices=STATUT_PROJET_CHOICES, default='planifie', verbose_name="Statut du Projet")
    user = models.ForeignKey(User, related_name='prestataire', on_delete=models.CASCADE)  # Entreprise prestataire
    def __str__(self):
        return self.nom


    

class DetailsProjet(models.Model):
    """Détails spécifiques du projet"""
    projet = models.ForeignKey(Projet, related_name='Details', on_delete=models.CASCADE)  # 
    objectifs = models.TextField(verbose_name="Objectifs du Projet")
    description = models.TextField(verbose_name="Description Détaillée")
    def __str__(self):
        return f"Détails de {self.projet.nom}"

class Localisation(models.Model):
    """Localisation du projet"""
    projet = models.ForeignKey(Projet, related_name='Localisation', on_delete=models.CASCADE)  # 
    region = models.CharField(max_length=100, verbose_name="Région")
    latitude = models.DecimalField(max_digits=9, decimal_places=6)
    longitude = models.DecimalField(max_digits=9, decimal_places=6)
    def __str__(self):
        return f"Localisation de {self.projet.nom}"
    
class Partenaire(models.Model):
    nom = models.CharField(max_length=255)
    type = models.CharField(max_length=100, choices=[('Financier', 'Financier'), ('Technique', 'Technique'), ('Logistique', 'Logistique')])
    contact = models.CharField(max_length=255, blank=True, null=True)
    def __str__(self):
        return f"Partenaire {self.nom}"
    
class ActeursImpliques(models.Model):
    projet = models.ForeignKey(Projet, related_name='Acteurs', on_delete=models.CASCADE)  # 
    partenaire = models.ForeignKey(Partenaire, related_name='Partenaire', on_delete=models.CASCADE)  
    def __str__(self):
        return f"Partenaire de {self.projet.nom}"





class Decaissement(models.Model):
    projet = models.ForeignKey(Projet, on_delete=models.CASCADE, related_name="decaissements")
    nomEtape = models.CharField(max_length=100)  # Nom de l'étape (ex. "Phase 1", "Phase 2")
    montant = models.DecimalField(max_digits=15, decimal_places=2)
    dateDecaissement = models.DateField()
    description = models.TextField(blank=True, null=True)  # Ex: "Paiement tranche 1"
    actualDeliverables = models.TextField()  # Livrables réels pour cette étape
    def __str__(self):
        return f"Decaissement de {self.projet.nom}"
    

class CitizenReport(models.Model):
    project = models.ForeignKey(Projet, related_name='reports', on_delete=models.CASCADE)  # Lien vers le projet
    citizen_name = models.CharField(max_length=200)  # Nom du citoyen ou anonyme
    report_date = models.DateField(auto_now_add=True)  # Date du signalement
    report_text = models.TextField()  # Description du problème observé
    photo = models.ImageField(upload_to='reports/', null=True, blank=True)  # Photo (optionnelle)
    status = models.CharField(max_length=100, choices=[('New', 'New'), ('Reviewed', 'Reviewed'), ('Resolved', 'Resolved')])  # Statut du rapport

    def __str__(self):
        return f"Signalement de {self.citizen_name} pour {self.project.name}"


class Notification(models.Model):
    projet = models.ForeignKey(Projet, related_name='notifications', on_delete=models.CASCADE)
    message = models.TextField()  # Message de notification
    send_date = models.DateTimeField(auto_now_add=True)  # Date d'envoi
    sent_to = models.CharField(max_length=200)  # Destinataires (peut inclure les groupes de citoyens)
    platform = models.CharField(max_length=100, choices=[('Facebook', 'Facebook'), ('SMS', 'SMS')])  # Canal de notification

    def __str__(self):
        return f"Notification pour {self.project.name} le {self.send_date}"

