import { Injectable } from '@angular/core';
import { environment } from '../../../../../../environments/environment.prod';
import { User } from '../../../../../models/user';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DetailCitoyenService {
  constructor(private http:HttpClient){}

  private apiUrl = environment.apiUrl;

  getCitoyensById(id:number): Observable<User[]> {
      return this.http.get<User[]>(`${this.apiUrl}/citoyens/${id}/`);   
    }

}