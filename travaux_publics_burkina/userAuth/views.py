from rest_framework import generics, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework.parsers import JSONParser, MultiPartParser, FormParser
from .models import User
from .serializers import UserSerializer, CustomTokenObtainPairSerializer, UpdateUserSerializer


from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import CustomTokenObtainPairSerializer

class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer

# Vue d'inscription
class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = [AllowAny]  # N'importe qui peut s'inscrire
    serializer_class = UserSerializer

# Vue pour récupérer les détails d'un utilisateur (profil)
class UserDetailView(generics.RetrieveAPIView):
    queryset = User.objects.all()
    permission_classes = [IsAuthenticated]  # Un utilisateur doit être authentifié
    serializer_class = UserSerializer

# Vue pour lister les utilisateurs (uniquement accessible aux utilisateurs authentifiés)
@api_view(['GET'])
# @permission_classes([IsAuthenticated])  # Appliquer la permission ici
def list_users(request):
    users = User.objects.all()  # Récupérer tous les utilisateurs
    serializer = UserSerializer(users, many=True)  # Sérialiser les données
    return Response(serializer.data, status=status.HTTP_200_OK)

class UpdateUserView(generics.UpdateAPIView):
    serializer_class = UpdateUserSerializer
    # permission_classes = [IsAuthenticated]
    parser_classes = [JSONParser, MultiPartParser, FormParser]  # ✅ Ajout de JSONParser
    def get_object(self):
        user_id = self.kwargs.get("pk")
        return get_object_or_404(User, pk=user_id)
# Vue pour lister les autorites 
class AutoritesListView(generics.ListAPIView):
    queryset = User.objects.filter(role='autority')  
    serializer_class = UserSerializer

class AutoriteDetailView(generics.RetrieveAPIView):
    queryset = User.objects.filter(role='autority')
    serializer_class = UserSerializer
    lookup_field = 'id'  



# Vue pour lister les prestataires 
class PrestatairesListView(generics.ListAPIView):
    queryset = User.objects.filter(role='supplier')  
    serializer_class = UserSerializer

class PrestatairesDetailView(generics.RetrieveAPIView):
    queryset = User.objects.filter(role='supplier')
    serializer_class = UserSerializer
    lookup_field = 'id' 



# Vue pour lister les citoyens 
class CitizensListView(generics.ListAPIView):
    queryset = User.objects.filter(role='citizen')  
    serializer_class = UserSerializer



