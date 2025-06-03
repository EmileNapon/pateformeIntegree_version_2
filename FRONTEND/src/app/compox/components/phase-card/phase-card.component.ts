import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Phase, getPhaseStatus, getStatusLabel, calculateProgress } from '../../models/phase.model';

@Component({
  selector: 'app-phase-card',
  standalone: false,
  template: `
    <div class="card phase-card h-100">
      <div class="card-body">
        <div class="d-flex justify-content-between align-items-start mb-2">
          <h5 class="card-title">{{ phase.titre }}</h5>
          <span class="phase-status status-{{ getStatus() }}">
            {{ getStatusLabel() }}
          </span>
        </div>
        
        <p class="card-text">{{ phase.description }}</p>
        
        <div class="progress mb-3" style="height: 10px;">
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
          </div>
        </div>
        
        <div class="d-flex mb-3">
          <div class="me-3">
            <small class="text-muted d-block">Date de début</small>
            <span>{{ phase.dateDebut | date:'dd/MM/yyyy' }}</span>
          </div>
          <div>
            <small class="text-muted d-block">Date de fin</small>
            <span>{{ phase.dateFin | date:'dd/MM/yyyy' }}</span>
          </div>
        </div>
        
        <div class="mb-3">
          <small class="text-muted d-block">Budget</small>
          <span class="fs-5">{{ phase.montant | currency:'EUR':'symbol':'1.0-0' }}</span>
        </div>
        
        <div class="d-flex mt-auto">
          <button class="btn btn-sm btn-outline-primary me-2" 
                  [routerLink]="['/phases', phase.id]">
            <i class="bi bi-eye me-1"></i> Détails
          </button>
          <button class="btn btn-sm btn-outline-secondary me-2" 
                  [routerLink]="['/phases', phase.id, 'edit']">
            <i class="bi bi-pencil me-1"></i> Modifier
          </button>
          <button class="btn btn-sm btn-outline-danger" 
                  (click)="onDelete()">
            <i class="bi bi-trash me-1"></i> Supprimer
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .card {
      height: 100%;
      transition: transform 0.3s, box-shadow 0.3s;
    }
    
    .card:hover {
      transform: translateY(-5px);
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    }
    
    .card-title {
      font-weight: 600;
      color: var(--dark-color);
    }
    
    .phase-status {
      font-size: 0.85rem;
      padding: 0.25rem 0.5rem;
      border-radius: 0.375rem;
      font-weight: 500;
    }
    
    .status-ongoing {
      background-color: rgba(255, 193, 7, 0.2);
      color: #856404;
    }
    
    .status-completed {
      background-color: rgba(25, 135, 84, 0.2);
      color: #155724;
    }
    
    .status-upcoming {
      background-color: rgba(13, 110, 253, 0.2);
      color: #004085;
    }
  `]
})
export class PhaseCardComponent {
  @Input() phase!: Phase;
  @Output() delete = new EventEmitter<number>();

  getStatus(): string {
    return getPhaseStatus(this.phase);
  }

  getStatusLabel(): string {
    return getStatusLabel(getPhaseStatus(this.phase));
  }

  getProgress(): number {
    return calculateProgress(this.phase);
  }

  onDelete(): void {
    this.delete.emit(this.phase.id);
  }
}