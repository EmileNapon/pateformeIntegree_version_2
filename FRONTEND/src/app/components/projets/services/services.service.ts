import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Projet } from '../models/models';
import { User } from '../../../models/user';

@Injectable({
  providedIn: 'root'
})
export class ProjetService {
  private apiUrl = 'http://localhost:8000/plateforme-integre'; // URL de l'API Django
  private apiPrestataire = 'http://127.0.0.1:8000/plateforme-integre/prestataires/';
  constructor(private http: HttpClient) { }

  // Récupérer la liste des projets
  getProjets(): Observable<Projet[]> {
    return this.http.get<Projet[]>(`${this.apiUrl}/projets/`);
  }

  // Supprimer un projet
  deleteProjet(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  // Ajouter un projet
  addProjet(projet: FormData): Observable<Projet> {
    return this.http.post<Projet>(`${this.apiUrl}/projets/`, projet);
  }

  // Récupérer les détails d'un projet
  getProjetById(id: number): Observable<Projet> {
    return this.http.get<Projet>(`${this.apiUrl}/${id}`);
  }


  getPrestataires(): Observable<User[]> {
      return this.http.get<User[]>(this.apiPrestataire);   
    }

}
