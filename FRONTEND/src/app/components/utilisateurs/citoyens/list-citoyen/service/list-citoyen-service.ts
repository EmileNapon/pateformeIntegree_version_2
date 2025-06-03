import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../../../../models/user';
import { Observable } from 'rxjs';
import { environment } from '../../../../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ListCitoyenService {

  constructor(private http: HttpClient) {}

  private apiUrl = environment.apiUrl;

  getCitoyens(params: any = {}): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/citoyens/`, { params });
  }

  deleteCitoyens(id: number): Observable<any> {
    const token = localStorage.getItem('token'); // ou sessionStorage
    const headers = new HttpHeaders({
      'Authorization': `Token ${token}`
    });

    return this.http.delete(`${this.apiUrl}/users/delete/${id}/`, { headers });
  }
}
