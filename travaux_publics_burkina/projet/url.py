from django.urls import path
from .views import (
    ProjetListCreate, ProjetRetrieveUpdateDestroy,
    PartenaireListCreate, PartenaireRetrieveUpdateDestroy,
    DetailsProjetListCreate, DetailsProjetRetrieveUpdateDestroy,
    LocalisationListCreate, LocalisationRetrieveUpdateDestroy,
    ActeursImpliquesListCreate, ActeursImpliquesRetrieveUpdateDestroy,
    DecaissementListCreate, DecaissementRetrieveUpdateDestroy,
    CitizenReportListCreate, CitizenReportRetrieveUpdateDestroy,
    NotificationListCreate, NotificationRetrieveUpdateDestroy,
    ActeursImpliquesDetails, PartenaireImpliquesDetails,
    DernierProjetIDView, DetailsParProjetDetails, DetailsParProjetLocalisation
)

urlpatterns = [
    # 📌 Projet
    path('plateforme-integre/projets/', ProjetListCreate.as_view(), name='projet-list'),
    path('plateforme-integre/projets/<int:pk>/', ProjetRetrieveUpdateDestroy.as_view(), name='projet-detail'),
    path('plateforme-integre/nombre/', DernierProjetIDView.as_view(), name='dernier_projet_id'),

    # 📌 Partenaire
    path('plateforme-integre/partenaires/', PartenaireListCreate.as_view(), name='partenaire-list'),
    path('plateforme-integre/partenaires/<int:pk>/', PartenaireRetrieveUpdateDestroy.as_view(), name='partenaire-detail'),
    path('plateforme-integre/partenaires/<int:partenaire_id>/', PartenaireImpliquesDetails.as_view(), name='acteurs-detail'),

    # 📌 Détails du Projet
    path('plateforme-integre/details_projets/', DetailsProjetListCreate.as_view(), name='details_projet-list'),
    path('plateforme-integre/details_projets/<int:pk>/', DetailsProjetRetrieveUpdateDestroy.as_view(), name='details_projet-detail'),
    path('plateforme-integre/details_projet/<int:projet_id>/',DetailsParProjetDetails.as_view(), name='acteurs-detail'),
    # 📌 Localisation
    path('plateforme-integre/localisations/', LocalisationListCreate.as_view(), name='localisation-list'),
    path('plateforme-integre/localisations/<int:pk>/', LocalisationRetrieveUpdateDestroy.as_view(), name='localisation-detail'),
    path('plateforme-integre/localisation/<int:projet_id>/',DetailsParProjetLocalisation.as_view(), name='acteurs-detail'),
    # 📌 Acteurs Impliqués
    path('plateforme-integre/acteurs/', ActeursImpliquesListCreate.as_view(), name='acteurs-list'),
    path('plateforme-integre/acteurs/<int:pk>/', ActeursImpliquesRetrieveUpdateDestroy.as_view(), name='acteurs-detail'),
    path('plateforme-integre/acteur/<int:projet_id>/', ActeursImpliquesDetails.as_view(), name='acteurs-detail'),


    # 📌 Décaissement
    path('plateforme-integre/decaissements/', DecaissementListCreate.as_view(), name='decaissement-list'),
    path('plateforme-integre/decaissements/<int:pk>/', DecaissementRetrieveUpdateDestroy.as_view(), name='decaissement-detail'),

    # 📌 Citizen Report
    path('plateforme-integre/citizen_reports/', CitizenReportListCreate.as_view(), name='citizen_report-list'),
    path('plateforme-integre/citizen_reports/<int:pk>/', CitizenReportRetrieveUpdateDestroy.as_view(), name='citizen_report-detail'),

    # 📌 Notification
    path('plateforme-integre/notifications/', NotificationListCreate.as_view(), name='notification-list'),
    path('plateforme-integre/notifications/<int:pk>/', NotificationRetrieveUpdateDestroy.as_view(), name='notification-detail'),
]


