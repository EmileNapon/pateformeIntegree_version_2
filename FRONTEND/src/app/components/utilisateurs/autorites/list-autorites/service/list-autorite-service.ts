import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../../../../models/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ListAutoriteService {

  constructor(private http:HttpClient){}

  private apiAutoriteUrl = 'http://127.0.0.1:8000/plateforme-integre/autorites/';

  getAutorite(): Observable<User[]> {
      return this.http.get<User[]>(this.apiAutoriteUrl);   
    }

    // deleteApprenant(id: number): Observable<User> {
    //   return this.http.delete(`${this.apiUrldeleteApprenant}/users/delete/${id}/`);
    // }

    // getApprenantsPaginated(page: number, size: number): Observable<User[]> {
    //   const url = `${this.apiUrl}?page=${page}&size=${size}`;
    //   return this.http.get<User[]>(url)
    // }
    

}