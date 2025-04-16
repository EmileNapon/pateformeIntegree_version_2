import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../../models/user';
import { environment } from '../../../../environments/environment.prod';
import { Projet } from '../../projets/models/models';

@Injectable({
  providedIn: 'root'
})
export class PartenaireService {
    private apiUrl = environment.apiUrl;


  constructor(private http: HttpClient) { }

getProjetsPartenaire(): Observable<Projet[]> {
    return this.http.get<Projet[]>(`${this.apiUrl}/partenaires/`);
}
getPartenaireById(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/partenaires/${id}/`);
  }


}