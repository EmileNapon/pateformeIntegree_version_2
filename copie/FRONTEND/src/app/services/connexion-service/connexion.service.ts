import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://127.0.0.1:8000/plateforme-integre'; // Base URL de votre API
  private isBrowser: boolean;
  private userId: string | null = null;
  private userEmail: string | null = null;
  private userFirstName: string | null = null;
  private userLastName: string | null = null;
  private userProfilePic: string | null = null;
  private userRole: string | null = null; // Ajout de la variable pour le rôle
  private userIsSuperuser: string | null = null; // Ajout de la variable pour le rôle

  private userPhone: string | null = null; // Ajout de la variable pour le rôle
  private dateInscription: string | null = null; // Ajout de la variable pour le rôle
  private userProfession: string | null = null; // Ajout de la variable pour le rôle
  private userNameOrganization: string | null = null; // Ajout de la variable pour le rôle
  private userNomEntreprise: string | null = null; // Ajout de la variable pour le rôle
  private userSecteurActivite: string | null = null; // Ajout de la variable pour le rôle

  // Méthode de connexion
  constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId); // Vérification de l'environnement

    if (this.isBrowser) { // Seulement si c'est un environnement navigateur
      const storedEmail = localStorage.getItem('user_email');
      this.userId = localStorage.getItem('user_id');
      this.userEmail = storedEmail;
      this.userFirstName = localStorage.getItem('user_first_name');
      this.userLastName = localStorage.getItem('user_last_name');
      this.userProfilePic = localStorage.getItem('user_profile_pic');
      this.userRole = localStorage.getItem('user_role');
      this.userIsSuperuser = localStorage.getItem('user_is_superuser');
      this.userPhone = localStorage.getItem('user_phone_number');
      this.dateInscription = localStorage.getItem('user_date_joined');
      this.userProfession = localStorage.getItem('user_profession');
      this.userNameOrganization = localStorage.getItem('user_name_organization');
      this.userNomEntreprise = localStorage.getItem('user_nom_entreprise');
      this.userSecteurActivite = localStorage.getItem('user_secteur_activite');
    }
  }

  getToken(): string | null {
    if (this.isBrowser) {
      return localStorage.getItem('token');
    }
    return null; // Retourner null si ce n'est pas un environnement navigateur
  }

  setToken(token: string): void {
    if (this.isBrowser) {
      localStorage.setItem('token', token);
    }
  }

  clearToken(): void {
    if (this.isBrowser) {
      localStorage.removeItem('token');
    }
  }

  // Méthode de connexion
  login(email: string, password: string): Observable<any> {
    const url = `${this.apiUrl}/login/`;
    const body = { email, password };

    return this.http.post(url, body, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }).pipe(map((response: any) => {
      // Adapter les champs en fonction de la structure de votre API
      this.userId = response.id; // Récupération de l'identifiant
      this.userEmail = response.email;
      this.userFirstName = response.first_name; // Prénom
      this.userLastName = response.last_name; // Nom
      this.userRole = response.role; // Récupération du rôle
      this.userIsSuperuser = response.userIsSuperuser; // Récupération du rôle

      this.userPhone = response.phone_number;
      this.dateInscription = response.date_joined; // Prénom
      this.userProfession = response.profession; // Nom
      this.userNameOrganization = response.name_organization; // Récupération du rôle
      this.userNomEntreprise = response.nom_entreprise; // Récupération du rôle
      this.userSecteurActivite = response.secteur_activite; // Récupération du rôle

      // Stocker les informations dans le localStorage
      if (this.isBrowser) {
        localStorage.setItem('user_id', response.id);
        localStorage.setItem('user_email', response.email);
        localStorage.setItem('user_first_name', response.first_name);
        localStorage.setItem('user_last_name', response.last_name);
        localStorage.setItem('user_role', response.role); // Stocker le rôle
        localStorage.setItem('user_is_superuser', response.userIsSuperuser); // Stocker le rôle

        localStorage.setItem('user_phone_number', response.phone_number);
        localStorage.setItem('user_date_joined', response.date_joined);
        localStorage.setItem('user_profession', response.profession);
        localStorage.setItem('user_name_organization', response.name_organization);
        localStorage.setItem('user_nom_entreprise', response.nom_entreprise);
        localStorage.setItem('user_secteur_activite', response.secteur_activite);
      }

      return response; // Retourner la réponse complète
    }));
  }

  // Méthode de déconnexion
  logout(): void {
    if (this.isBrowser) {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('user_id');
      localStorage.removeItem('user_email');
      localStorage.removeItem('user_first_name');
      localStorage.removeItem('user_last_name');
      localStorage.removeItem('user_role'); // Retirer le rôle
      localStorage.removeItem('user_is_superuser'); // Retirer le rôle

      localStorage.removeItem('user_phone_number');
      localStorage.removeItem('user_date_joined');
      localStorage.removeItem('user_profession');
      localStorage.removeItem('user_name_organization');
      localStorage.removeItem('user_nom_entreprise'); // Retirer le rôle
      localStorage.removeItem('user_secteur_activite'); // Retirer le rôle
    }

    // Réinitialiser les variables d'instance
    this.userId = null;
    this.userEmail = null;
    this.userFirstName = null;
    this.userLastName = null;
    this.userProfilePic = null;
    this.userRole = null; // Réinitialiser le rôle
    this.userIsSuperuser = null; // Réinitialiser le rôle

    this.userPhone = null;
    this.dateInscription = null;
    this.userProfession = null;
    this.userNameOrganization = null;
    this.userNomEntreprise = null; // Réinitialiser le rôle
    this.userSecteurActivite = null; // Réinitialiser le rôle
  }

  // Méthode pour obtenir les informations de l'utilisateur
  getUserInfo(): { email: string | null, firstName: string | null, lastName: string | null, profilePic: string | null, id: string | null, role: string | null, is_superuser: string | null,
     phone_number: string | null, date_joined: string | null, profession: string | null, name_organization: string | null, nom_entreprise: string | null, secteur_activite: string | null } {
    return {
      id: this.userId,
      email: this.userEmail,
      firstName: this.userFirstName,
      lastName: this.userLastName,
      profilePic: this.userProfilePic,
      role: this.userRole, // Ajouter le rôle,
      is_superuser: this.userIsSuperuser,

      phone_number: this.userPhone,
      date_joined: this.dateInscription,
      profession: this.userProfession,
      name_organization: this.userNameOrganization,
      nom_entreprise: this.userNomEntreprise, // Ajouter le rôle,
      secteur_activite: this.userSecteurActivite
    };
  }
}
