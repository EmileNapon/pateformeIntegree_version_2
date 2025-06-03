from django.urls import path
from .views import CustomTokenObtainPairView, RegisterView, UserDetailView, list_users, AutoritesListView, UpdateUserView,PrestatairesListView, CitizensListView, AutoriteDetailView, PrestatairesDetailView, CitoyenDetailView, DeleteUserView


urlpatterns = [
    path('plateforme-integre/login/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('plateforme-integre/register/', RegisterView.as_view(), name='register_user'),
    path('plateforme-integre/user/', UserDetailView.as_view(), name='user_detail'),
     path('plateforme-integre/users/<int:pk>/', UpdateUserView.as_view(), name='update-user'),  # Mise à jour de l'utilisateur connecté
    path('plateforme-integre/users/', list_users, name='list_users'),

    path('plateforme-integre/autorites/', AutoritesListView.as_view(), name='etudiant-list'),
    path('plateforme-integre/prestataires/', PrestatairesListView.as_view(), name='etudiant-list'),
    path('plateforme-integre/citoyens/', CitizensListView.as_view(), name='etudiant-list'),

    path('plateforme-integre/autorites/<int:id>/', AutoriteDetailView.as_view(), name='apprenant-detail'),
     path('plateforme-integre/prestataires/<int:id>/', PrestatairesDetailView.as_view(), name='etudiant-list'),
     path('plateforme-integre/citoyens/<int:id>/', CitoyenDetailView.as_view(), name='apprenant-detail'),
     path('plateforme-integre/users/delete/<int:pk>/', DeleteUserView.as_view(), name='delete-user'),  # Suppression du compte utilisateur

]
