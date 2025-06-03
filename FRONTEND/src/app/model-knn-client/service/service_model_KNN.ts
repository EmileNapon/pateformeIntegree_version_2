// src/app/services/prediction.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class PredictionService {
  private apiUrl = 'http://localhost:8000/api/predict/';

  constructor(private http: HttpClient) {}

  predict(features: number[]) {
    return this.http.post<{ prediction: number }>(this.apiUrl, { features });
  }
}