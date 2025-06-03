import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../../services/data.service';
import { Phase, Livrable, getPhaseStatus, getStatusLabel, calculateProgress } from '../../models/phase.model';
import { LivrableListComponent } from '../livrable-list/livrable-list.component';

@Component({
  selector: 'app-phase-detail',
  standalone: false,
  template: `
    <div class="container page-container fade-in" *ngIf="phase">
      <div class="row mb-4">
        <div class="col-md-8">
          <h2 class="mb-3">{{ phase.titre }}</h2>
          <div class="d-flex align-items-center mb-2">
            <span class="phase-status status-{{ getStatus() }} me-3">
              {{ getStatusLabel() }}
            </span>
            <span class="text-muted">
              Progression: {{ getProgress() }}%
            </span>
          </div>
        </div>
        <div class="col-md-4 text-end">
          <button class="btn btn-outline-primary me-2" [routerLink]="['/phases', phase.id, 'edit']">
            <i class="bi bi-pencil me-1"></i> Modifier
          </button>
          <button class="btn btn-outline-danger" (click)="deletePhase()">
            <i class="bi bi-trash me-1"></i> Supprimer
          </button>
        </div>
      </div>

      <div class="row mb-4">
        <div class="col-md-12">
          <div class="card shadow-sm">
            <div class="card-body">
              <div class="row">
                <div class="col-md-8">
                  <h5 class="card-title mb-3">Détails de la phase</h5>
                  <p *ngIf="phase.description">{{ phase.description }}</p>
                  <p *ngIf="!phase.description" class="text-muted">Aucune description fournie</p>
                  
                  <div class="progress mb-4" style="height: 15px;">
                    <div class="progress-bar" 
                         [ngClass]="{
                           'bg-primary': getStatus() === 'upcoming',
                           'bg-warning': getStatus() === 'ongoing',
                           'bg-success': getStatus() === 'completed'
                         }"
                         role="progressbar" 
                         [style.width.%]="getProgress()" 
                         [attr.aria-valuenow]="getProgress()" 
                         aria-valuemin="0" 
                         aria-valuemax="100">
                         {{ getProgress() }}%
                    </div>
                  </div>
                </div>
                
                <div class="col-md-4">
                  <div class="mb-3 pb-3 border-bottom">
                    <small class="text-muted d-block">Budget alloué</small>
                    <span class="fs-4 fw-bold">{{ phase.montant | currency:'EUR':'symbol':'1.0-0' }}</span>
                  </div>
                  
                  <div class="d-flex mb-3 pb-3 border-bottom">
                    <div class="me-4">
                      <small class="text-muted d-block">Date de début</small>
                      <span class="fs-6">{{ phase.dateDebut | date:'dd/MM/yyyy' }}</span>
                    </div>
                    <div>
                      <small class="text-muted d-block">Date de fin</small>
                      <span class="fs-6">{{ phase.dateFin | date:'dd/MM/yyyy' }}</span>
                    </div>
                  </div>
                  
                  <div>
                    <small class="text-muted d-block">Durée</small>
                    <span class="fs-6">{{ calculateDuration() }} jours</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-12">
          <app-livrable-list [phaseId]="phase.id!"></app-livrable-list>
        </div>
      </div>
    </div>

    <div class="container" *ngIf="!phase">
      <div class="alert alert-warning mt-4">
        <i class="bi bi-exclamation-triangle me-2"></i> Phase non trouvée.
        <a routerLink="/phases" class="alert-link ms-2">Retourner à la liste des phases</a>
      </div>
    </div>
  `,
  styles: []
})
export class PhaseDetailComponent implements OnInit {
  phase?: Phase;

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = +params['id'];
      this.loadPhase(id);
    });
  }

  loadPhase(id: number): void {
    this.dataService.getPhaseById(id).subscribe(phase => {
      this.phase = phase;
    });
  }

  getStatus(): string {
    return this.phase ? getPhaseStatus(this.phase) : '';
  }

  getStatusLabel(): string {
    return this.phase ? getStatusLabel(getPhaseStatus(this.phase)) : '';
  }

  getProgress(): number {
    return this.phase ? calculateProgress(this.phase) : 0;
  }

  calculateDuration(): number {
    if (!this.phase) return 0;
    
    const start = new Date(this.phase.dateDebut);
    const end = new Date(this.phase.dateFin);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return diffDays;
  }

  deletePhase(): void {
    if (!this.phase) return;
    
    if (confirm('Êtes-vous sûr de vouloir supprimer cette phase?')) {
      this.dataService.deletePhase(this.phase.id!).subscribe(() => {
        this.router.navigate(['/phases']);
      });
    }
  }
}