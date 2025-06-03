import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../../../../models/user';
import { Observable } from 'rxjs';
import { environment } from '../../../../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ListPrestataireService {

  constructor(private http:HttpClient){}
  
  private apiUrl = environment.apiUrl;

  getPrestataire(params: any={}): Observable<User[]> {
      return this.http.get<User[]>(`${this.apiUrl}/prestataires/`,{params});   
    }

    deletePrestataire(id: number): Observable<any> {
      const token = localStorage.getItem('token'); // ou sessionStorage
      const headers = new HttpHeaders({
        'Authorization': `Token ${token}`
      });
  
      return this.http.delete(`${this.apiUrl}/users/delete/${id}/`, { headers });
    }
  }
  


