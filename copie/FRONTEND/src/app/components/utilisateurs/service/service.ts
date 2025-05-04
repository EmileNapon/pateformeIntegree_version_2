import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../../models/user';
import { environment } from '../../../../environments/environment.prod';
import { Projet } from '../../projets/models/models';

@Injectable({
  providedIn: 'root'
})
export class UserService {
    private apiUrl = environment.apiUrl;


  constructor(private http: HttpClient) { }

  getAutorite(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/autorites/`);   
  }

  getAutoriteById(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/autorites/${id}/`);
  }

  updateAutorite(id: number, updatedUser: any): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/users/${id}/`, updatedUser);
  }




  getPrestataires(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/prestataires/`);   
  }
  getPrestataireById(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/prestataires/${id}/`);
  }
  updatePrestataire(id: number, updatedUser: any): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/users/${id}/`, updatedUser);
  }


  


      // Récupérer la liste des projets
      getProjetsActeurs(): Observable<Projet[]> {
        return this.http.get<Projet[]>(`${this.apiUrl}/acteurs/`);
      }
    
      // Supprimer un projet
      deleteProjetsActeurs(id: number): Observable<any> {
        return this.http.delete(`${this.apiUrl}/acteurs/${id}/`);
      }
    
      // Ajouter un projet
      addProjetsActeurs(projet: FormData): Observable<Projet> {
        return this.http.post<Projet>(`${this.apiUrl}/acteurs/`, projet);
      }
    
      // Récupérer les détails d'un projet
      getProjetsActeursById(id: number): Observable<any[]> {
        return this.http.get<any[]>(`${this.apiUrl}/acteur/${id}/`);
      }


}