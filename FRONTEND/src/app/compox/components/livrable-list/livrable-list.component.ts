import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataService } from '../../services/data.service';
import { Livrable } from '../../models/phase.model';
import { LivrableFormComponent } from '../livrable-form/livrable-form.component';

@Component({
  selector: 'app-livrable-list',
  standalone: false,
  template: `
    <div class="card shadow-sm mb-4">
      <div class="card-body">
        <div class="d-flex justify-content-between align-items-center mb-4">
          <h5 class="card-title mb-0">Livrables</h5>
          <button class="btn btn-sm btn-accent" (click)="showForm = !showForm">
            <i class="bi" [ngClass]="showForm ? 'bi-dash-circle' : 'bi-plus-circle'"></i>
            {{ showForm ? 'Annuler' : 'Ajouter un livrable' }}
          </button>
        </div>
        
        <app-livrable-form 
          *ngIf="showForm" 
          [phaseId]="phaseId" 
          [livrable]="selectedLivrable"
          (complete)="onFormComplete($event)">
        </app-livrable-form>
        
        <div class="table-responsive">
          <table class="table table-hover">
            <thead>
              <tr>
                <th>Nom</th>
                <th>Description</th>
                <th>Date de remise</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngIf="livrables.length === 0">
                <td colspan="4" class="text-center py-3">
                  <i class="bi bi-inbox me-2"></i> Aucun livrable pour cette phase
                </td>
              </tr>
              <tr *ngFor="let livrable of livrables" class="slide-in">
                <td>{{ livrable.nom }}</td>
                <td>{{ livrable.description || 'N/A' }}</td>
                <td>{{ livrable.dateRemise | date:'dd/MM/yyyy' }}</td>
                <td>
                  <div class="btn-group">
                    <button class="btn btn-sm btn-outline-secondary" (click)="editLivrable(livrable)">
                      <i class="bi bi-pencil"></i>
                    </button>
                    <button class="btn btn-sm btn-outline-danger" (click)="deleteLivrable(livrable.id!)">
                      <i class="bi bi-trash"></i>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class LivrableListComponent implements OnInit {
  @Input() phaseId!: number;
  livrables: Livrable[] = [];
  showForm = false;
  selectedLivrable?: Livrable;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.loadLivrables();
  }

  loadLivrables(): void {
    this.dataService.getLivrablesByPhase(this.phaseId).subscribe(livrables => {
      this.livrables = livrables;
    });
  }

  editLivrable(livrable: Livrable): void {
    this.selectedLivrable = livrable;
    this.showForm = true;
  }

  deleteLivrable(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce livrable?')) {
      this.dataService.deleteLivrable(id).subscribe(() => {
        this.loadLivrables();
      });
    }
  }

  onFormComplete(success: boolean): void {
    if (success) {
      this.loadLivrables();
      this.showForm = false;
      this.selectedLivrable = undefined;
    }
  }
}