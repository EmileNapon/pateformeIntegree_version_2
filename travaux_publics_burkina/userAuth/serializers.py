from rest_framework import serializers
from django.contrib.auth import authenticate
from .models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            'id', 'first_name', 'last_name', 'email', 'role', 'phone_number', 'profile_pic', 'is_verified',
            'profession', 'enabled_notifications', 'name_organization',
            'nom_entreprise', 'secteur_activite', 'password', 'date_inscription','is_active','is_staff','is_superuser'
        ]
        extra_kwargs = {
            'password': {'write_only': True},  # Le mot de passe ne doit pas être récupéré dans les réponses
        }
    
    def create(self, validated_data):
        # On retire le mot de passe avant de créer l'utilisateur
        password = validated_data.pop('password', None)
        user = User.objects.create(**validated_data)
        if password:
            user.set_password(password)
            user.save()
        return user





from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth import authenticate
from .models import User

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):

    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Ajout des informations utilisateur au token
        token['id'] = user.id
        token['first_name'] = user.first_name
        token['last_name'] = user.last_name
        token['email'] = user.email
        token['role'] = user.role
        token['phone_number'] = user.phone_number
        token['profile_pic'] = user.profile_pic.url if user.profile_pic else None
        token['profession'] = user.profession
        token['enabled_notifications'] = user.enabled_notifications
        token['name_organization'] = user.name_organization
        token['nom_entreprise'] = user.nom_entreprise
        token['secteur_activite'] = user.secteur_activite
        token['is_verified'] = user.is_verified
        token['is_staff'] = user.is_staff
        token['is_superuser'] = user.is_superuser
        token['is_active'] = user.is_active
        token['date_inscription'] = user.date_inscription.isoformat() if user.date_inscription else None
        if user.profile_pic:
            token['profile_pic'] = user.profile_pic.url  # Récupération de l'URL de l'image de profil

  
        return token

    def validate(self, attrs):
        data = super().validate(attrs)
        user = self.user  # récupéré automatiquement si authentification réussie

        if not user.is_active:
            raise serializers.ValidationError("Votre compte est inactif. Veuillez contacter l'administrateur.")

        data.update({
            'id': user.id,
            'first_name': user.first_name,
            'last_name': user.last_name,
            'email': user.email,
            'role': user.role,
            'phone_number': user.phone_number,
            'profile_pic': user.profile_pic.url if user.profile_pic else None,
            'profession': user.profession,
            'enabled_notifications': user.enabled_notifications,
            'name_organization': user.name_organization,
            'nom_entreprise': user.nom_entreprise,
            'secteur_activite': user.secteur_activite,
            'is_verified': user.is_verified,
            'is_staff': user.is_staff,
            'is_superuser': user.is_superuser,
            'is_active': user.is_active,
            'date_inscription': user.date_inscription,
        })
        return data

# Serializer pour la mise à jour d'un utilisateur
class UpdateUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
    
        fields = [
            'first_name', 'last_name', 'role', 'phone_number', 'profile_pic', 'is_verified',
            'profession', 'enabled_notifications', 'name_organization',
            'nom_entreprise', 'secteur_activite','is_active', 'date_inscription', 'is_superuser'
        ]
        extra_kwargs = {
            'role': {'read_only': True},  # On ne permet pas de changer le rôle
        }
