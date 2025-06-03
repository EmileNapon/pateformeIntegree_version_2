import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.prod';


@Injectable({ providedIn: 'root' })
export class CalendrierDecaissement {
private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  createPhase(phase: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/phases/`, phase);
  }

  createPhasePhase(phase: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/etapes/`, phase);
  }

    // Récupérer la liste des décaissements (optionnel, si nécessaire)
    getPhasesProjet(): Observable<any[]> {
        return this.http.get<any[]>(`${this.apiUrl}/phases/`);
    }
        // Récupérer la liste des décaissements (optionnel, si nécessaire)
   getPhasePhase(): Observable<any[]> {
      return this.http.get<any[]>(`${this.apiUrl}/etapes/`);
    }


    getPhaseProjetById(id: number): Observable<any> {
      return this.http.get<any>(`${this.apiUrl}/phases/${id}/`);
    }
    getPhasePhaseById(id: number): Observable<any> {
      return this.http.get<any>(`${this.apiUrl}/etapes/${id}/`);
    }
}
