import { Component, OnInit } from '@angular/core';
import { PredictionService } from './service/service_model_KNN';

@Component({
  selector: 'app-model-knn-client',
  templateUrl: './model-knn-client.component.html',
  styleUrl: './model-knn-client.component.css',
  standalone:false
})
export class ModelKNNClientComponent implements OnInit {

  features: number[] = new Array(23).fill(0);
  result: number | null = null;

  constructor(private predictionService: PredictionService) {}
  ngOnInit(): void {
      
  }

  onSubmit() {
    this.predictionService.predict(this.features).subscribe({
      next: (res) => this.result = res.prediction,
      error: (err) => console.error(err)
    });
  }

}
