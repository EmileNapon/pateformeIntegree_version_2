import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Projet } from '../models/models';
import { User } from '../../../models/user';
import { environment } from '../../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ProjetService {
private apiUrl = environment.apiUrl;


  constructor(private http: HttpClient) { }

  // Récupérer la liste des projets
  getProjets(): Observable<Projet[]> {
    return this.http.get<Projet[]>(`${this.apiUrl}/projets/`);
  }

    // Récupérer la liste des projets
    getDernierProjetID(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/nombre/`);
  }

  

  // Supprimer un projet
  deleteProjet(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/projets/${id}/`);
  }

  // Ajouter un projet
  addProjet(projet: FormData): Observable<Projet> {
    return this.http.post<Projet>(`${this.apiUrl}/projets/`, projet);
  }

  // Récupérer les détails d'un projet
  getProjetById(id: number): Observable<Projet> {
    return this.http.get<Projet>(`${this.apiUrl}/projets/${id}/`);
  }


  // Récupérer la liste des projets
  getDetailsProjets(): Observable<Projet[]> {
    return this.http.get<Projet[]>(`${this.apiUrl}/details_projets/`);
  }

  // Supprimer un projet
  deleteDetailsProjets(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/details_projets/${id}/`);
  }

  // Ajouter un projet
  addDetailsProjets(projet: FormData): Observable<Projet> {
    return this.http.post<Projet>(`${this.apiUrl}/details_projets/`, projet);
  }

  // Récupérer les détails d'un projet
  getDetailsProjetsById(id: number): Observable<Projet> {
    return this.http.get<Projet>(`${this.apiUrl}/details_projet/${id}/`);
  }


  // Récupérer la liste des projets
  getProjetsLocalisation(): Observable<Projet[]> {
    return this.http.get<Projet[]>(`${this.apiUrl}/localisations/`);
  }

  // Supprimer un projet
  deleteProjetsLocalisation(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/localisations/${id}/`);
  }

  // Ajouter un projet
  addProjetsLocalisation(projet: FormData): Observable<Projet> {
    return this.http.post<Projet>(`${this.apiUrl}/localisations/`, projet);
  }

  // Récupérer les détails d'un projet
  getProjetsLocalisationById(id: number): Observable<Projet> {
    return this.http.get<Projet>(`${this.apiUrl}/localisation/${id}/`);
  }
  


  

}
