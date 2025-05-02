import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../../../../models/user';
import { Observable } from 'rxjs';
import { environment } from '../../../../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ListCitoyenService {

  constructor(private http:HttpClient){}
  
  private apiUrl = environment.apiUrl;

  getCitoyens(params: any={}): Observable<User[]> {
      return this.http.get<User[]>(`${this.apiUrl}/citoyens/`,{params});   
    }

    // deleteApprenant(id: number): Observable<User> {
    //   return this.http.delete(`${this.apiUrldeleteApprenant}/users/delete/${id}/`);
    // }

    // getApprenantsPaginated(page: number, size: number): Observable<User[]> {
    //   const url = `${this.apiUrl}?page=${page}&size=${size}`;
    //   return this.http.get<User[]>(url)
    // }
    


}