
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Projet } from '../../../projets/models/models';

@Injectable({
  providedIn: 'root'
})
export class PartenaireService {
    constructor( private http: HttpClient){}
    private apiUrl = 'http://localhost:8000/plateforme-integre'; // URL de l'API Django


        // Récupérer la liste des projets
    getProjetsPartenaire(): Observable<Projet[]> {
      return this.http.get<Projet[]>(`${this.apiUrl}/partenaires/`);
    }
  
    // Supprimer un projet
    deleteProjetsPartenaire(id: number): Observable<any> {
      return this.http.delete(`${this.apiUrl}/partenaires/${id}/`);
    }
  
    // Ajouter un projet
    addProjetsPartenaire(projet: FormData): Observable<Projet> {
      return this.http.post<Projet>(`${this.apiUrl}/partenaires/`, projet);
    }
  
    // Récupérer les détails d'un projet
    getProjetsPartenaireById(id: number): Observable<Projet> {
      return this.http.get<Projet>(`${this.apiUrl}/partenaires/${id}`);
    }
}