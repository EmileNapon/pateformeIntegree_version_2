import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DataService } from '../../services/data.service';
import { Phase, getPhaseStatus } from '../../models/phase.model';

@Component({
  selector: 'app-timeline',
  standalone: false,
  template: `
    <div class="container page-container fade-in">
      <div class="row mb-4">
        <div class="col-md-8">
          <h2 class="mb-3">Timeline du Projet</h2>
          <p class="text-muted">Visualisez les différentes phases de votre projet dans le temps</p>
        </div>
      </div>

      <div class="row mb-4">
        <div class="col-12">
          <div class="card shadow-sm">
            <div class="card-body p-0">
              <div class="timeline-header d-flex p-3 bg-light border-bottom">
                <div style="width: 15%;" class="fw-bold">Projet</div>
                <div style="width: 20%;" class="fw-bold">Phase</div>
                <div style="width: 45%;" class="fw-bold">Période</div>
                <div style="width: 20%;" class="fw-bold">Budget</div>
              </div>
              
              <div class="timeline-content p-3">
                <div *ngFor="let phase of sortedPhases" class="timeline-item d-flex mb-4 slide-in">
                  <div style="width: 15%;">
                    <span class="badge bg-secondary">{{ getProjetName(phase.projetId) }}</span>
                  </div>
                  
                  <div style="width: 20%;">
                    <a [routerLink]="['/phases', phase.id]" class="timeline-title">
                      {{ phase.titre }}
                    </a>
                  </div>
                  
                  <div style="width: 45%;">
                    <div class="timeline-period">
                      <div class="timeline-dates d-flex justify-content-between mb-1">
                        <small>{{ phase.dateDebut | date:'dd/MM/yyyy' }}</small>
                        <small>{{ phase.dateFin | date:'dd/MM/yyyy' }}</small>
                      </div>
                      
                      <div class="timeline-bar">
                        <div class="timeline-progress" 
                             [style.width.%]="calculateWidth(phase)"
                             [ngClass]="{
                               'bg-primary': getPhaseStatus(phase) === 'upcoming',
                               'bg-warning': getPhaseStatus(phase) === 'ongoing',
                               'bg-success': getPhaseStatus(phase) === 'completed'
                             }">
                        </div>
                        <div class="timeline-now" *ngIf="isPhaseActive(phase)"
                             [style.left.%]="calculateNowPosition(phase)">
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div style="width: 20%;">
                    <span class="fw-bold">{{ phase.montant | currency:'EUR':'symbol':'1.0-0' }}</span>
                  </div>
                </div>
                
                <div *ngIf="sortedPhases.length === 0" class="text-center py-4">
                  <i class="bi bi-calendar-x fs-4 mb-2"></i>
                  <p>Aucune phase n'a été créée pour le moment.</p>
                  <a routerLink="/phases/new" class="btn btn-primary btn-sm">
                    <i class="bi bi-plus-circle me-1"></i> Ajouter une phase
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="row">
        <div class="col-12">
          <div class="card shadow-sm">
            <div class="card-body">
              <h5 class="card-title mb-3">Statistiques du projet</h5>
              
              <div class="row">
                <div class="col-md-3 mb-3">
                  <div class="stats-card text-center p-3 bg-light rounded">
                    <div class="stats-icon mb-2 bg-primary text-white rounded-circle">
                      <i class="bi bi-layers"></i>
                    </div>
                    <div class="stats-value fs-4 fw-bold">{{ sortedPhases.length }}</div>
                    <div class="stats-label text-muted">Phases au total</div>
                  </div>
                </div>
                
                <div class="col-md-3 mb-3">
                  <div class="stats-card text-center p-3 bg-light rounded">
                    <div class="stats-icon mb-2 bg-success text-white rounded-circle">
                      <i class="bi bi-check-circle"></i>
                    </div>
                    <div class="stats-value fs-4 fw-bold">{{ getCompletedPhasesCount() }}</div>
                    <div class="stats-label text-muted">Phases terminées</div>
                  </div>
                </div>
                
                <div class="col-md-3 mb-3">
                  <div class="stats-card text-center p-3 bg-light rounded">
                    <div class="stats-icon mb-2 bg-warning text-white rounded-circle">
                      <i class="bi bi-hourglass-split"></i>
                    </div>
                    <div class="stats-value fs-4 fw-bold">{{ getOngoingPhasesCount() }}</div>
                    <div class="stats-label text-muted">Phases en cours</div>
                  </div>
                </div>
                
                <div class="col-md-3 mb-3">
                  <div class="stats-card text-center p-3 bg-light rounded">
                    <div class="stats-icon mb-2 bg-info text-white rounded-circle">
                      <i class="bi bi-cash-stack"></i>
                    </div>
                    <div class="stats-value fs-4 fw-bold">{{ getTotalBudget() | currency:'EUR':'symbol':'1.0-0' }}</div>
                    <div class="stats-label text-muted">Budget total</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .timeline-title {
      font-weight: 500;
      color: var(--primary-color);
      text-decoration: none;
    }
    
    .timeline-title:hover {
      text-decoration: underline;
    }
    
    .timeline-bar {
      height: 12px;
      background-color: #e9ecef;
      border-radius: 6px;
      position: relative;
      overflow: hidden;
    }
    
    .timeline-progress {
      height: 100%;
      border-radius: 6px;
    }
    
    .timeline-now {
      position: absolute;
      top: 0;
      width: 2px;
      height: 100%;
      background-color: #dc3545;
    }
    
    .stats-icon {
      width: 50px;
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto;
      font-size: 1.5rem;
    }
    
    .stats-card {
      transition: transform 0.3s;
    }
    
    .stats-card:hover {
      transform: translateY(-5px);
    }
  `]
})
export class TimelineComponent implements OnInit {
  phases: Phase[] = [];
  sortedPhases: Phase[] = [];
  
  constructor(private dataService: DataService) {}
  
  ngOnInit(): void {
    this.dataService.getAllPhases().subscribe(phases => {
      this.phases = phases;
      this.sortedPhases = [...phases].sort((a, b) => 
        new Date(a.dateDebut).getTime() - new Date(b.dateDebut).getTime()
      );
    });
  }
  
  getProjetName(projetId: number): string {
    switch(projetId) {
      case 1:
        return 'Route N7';
      case 2:
        return 'Autoroute A1';
      default:
        return `Projet ${projetId}`;
    }
  }
  
  getPhaseStatus(phase: Phase): string {
    return getPhaseStatus(phase);
  }
  
  calculateWidth(phase: Phase): number {
    const start = new Date(phase.dateDebut).getTime();
    const end = new Date(phase.dateFin).getTime();
    const duration = end - start;
    
    if (duration <= 0) return 0;
    
    // For demonstration, let's say the full width is 100%
    return 100;
  }
  
  isPhaseActive(phase: Phase): boolean {
    const today = new Date().getTime();
    const start = new Date(phase.dateDebut).getTime();
    const end = new Date(phase.dateFin).getTime();
    
    return today >= start && today <= end;
  }
  
  calculateNowPosition(phase: Phase): number {
    if (!this.isPhaseActive(phase)) return 0;
    
    const today = new Date().getTime();
    const start = new Date(phase.dateDebut).getTime();
    const end = new Date(phase.dateFin).getTime();
    const duration = end - start;
    
    if (duration <= 0) return 0;
    
    const elapsed = today - start;
    return (elapsed / duration) * 100;
  }
  
  getCompletedPhasesCount(): number {
    return this.phases.filter(phase => getPhaseStatus(phase) === 'completed').length;
  }
  
  getOngoingPhasesCount(): number {
    return this.phases.filter(phase => getPhaseStatus(phase) === 'ongoing').length;
  }
  
  getTotalBudget(): number {
    return this.phases.reduce((total, phase) => total + phase.montant, 0);
  }
}