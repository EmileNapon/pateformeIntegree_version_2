import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../../../../models/user';
import { Observable } from 'rxjs';
import { environment } from '../../../../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class EditAutoriteService {


  constructor(private http:HttpClient){}
  private apiUrl = environment.apiUrl;

  getAutoriteById(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/autorites/${id}/`);
  }

  updateAutoritet(id: number, updatedUser: any): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/users/${id}/`, updatedUser);
  }
}