from django.urls import path
from .views import (
    ProjetListCreate, ProjetRetrieveUpdateDestroy,

)

urlpatterns = [
    # 📌 Projet
    path('plateforme-integre/projets/', ProjetListCreate.as_view(), name='projet-list'),
    path('plateforme-integre/projets/<int:pk>/', ProjetRetrieveUpdateDestroy.as_view(), name='projet-detail'),

    path('plateforme-integre/phases/', ProjetListCreate.as_view(), name='phases-list'),
    path('plateforme-integre/phases/<int:pk>/', ProjetRetrieveUpdateDestroy.as_view(), name='phases-detail'),

    # # 📌 Partenaire
    # path('plateforme-integre/partenaires/', PartenaireListCreate.as_view(), name='partenaire-list'),
    # path('plateforme-integre/partenaires/<int:pk>/', PartenaireRetrieveUpdateDestroy.as_view(), name='partenaire-detail'),
    # path('plateforme-integre/partenaires/<int:partenaire_id>/', PartenaireImpliquesDetails.as_view(), name='acteurs-detail'),

    # path('plateforme-integre/acteurs/', ActeursImpliquesListCreate.as_view(), name='acteurs-list'),
    # path('plateforme-integre/acteurs/<int:pk>/', ActeursImpliquesRetrieveUpdateDestroy.as_view(), name='acteurs-detail'),
    # path('plateforme-integre/acteur/<int:projet_id>/', ActeursImpliquesDetails.as_view(), name='acteurs-detail'),


    # # 📌 Décaissement
    # # path('plateforme-integre/decaissements/', DecaissementListCreate.as_view(), name='decaissement-list'),
    # # path('plateforme-integre/decaissements/<int:pk>/', DecaissementRetrieveUpdateDestroy.as_view(), name='decaissement-detail'),

    # path('plateforme-integre/phases/', PhaseProjetListCreate.as_view(), name='phase-list'),
    # path('plateforme-integre/phases/<int:pk>/', PhaseProjetDetail.as_view(), name='phase-detail'),

    # path('plateforme-integre/etapes/', EtapePhaseListCreate.as_view(), name='etape-list'),
    # path('plateforme-integre/etapes/<int:pk>/', EtapePhaseDetail.as_view(), name='etape-detail'),



    # # 📌 Citizen Report
    # path('plateforme-integre/citizen_reports/', CitizenReportListCreate.as_view(), name='citizen_report-list'),
    # path('plateforme-integre/citizen_reports/<int:pk>/', CitizenReportRetrieveUpdateDestroy.as_view(), name='citizen_report-detail'),

    # # 📌 Notification
    # path('plateforme-integre/notifications/', NotificationListCreate.as_view(), name='notification-list'),
    # path('plateforme-integre/notifications/<int:pk>/', NotificationRetrieveUpdateDestroy.as_view(), name='notification-detail'),

    #  # 📌 Livrables
    # path('plateforme-integre/livrables/', LivrableListCreate.as_view(), name='livrable-list'),
    # path('plateforme-integre/livrables/<int:pk>/', LivrableDetail.as_view(), name='livrable-detail'),
]


