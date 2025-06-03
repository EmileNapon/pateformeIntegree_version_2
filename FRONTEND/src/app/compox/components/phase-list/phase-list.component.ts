import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DataService } from '../../services/data.service';
import { Phase, PhaseStatus, getPhaseStatus, getStatusLabel, calculateProgress } from '../../models/phase.model';
import { PhaseCardComponent } from '../phase-card/phase-card.component';

@Component({
  selector: 'app-phase-list',
  standalone: false,
  template: `
    <div class="container page-container fade-in">
      <div class="row mb-4">
        <div class="col-md-8">
          <h2 class="mb-3">Phases du Projet</h2>
          <p class="text-muted">Gérez les différentes phases de votre projet de construction routière</p>
        </div>
        <div class="col-md-4 text-end">
          <button class="btn btn-primary" routerLink="/phases/new">
            <i class="bi bi-plus-circle me-2"></i>Nouvelle Phase
          </button>
        </div>
      </div>

      <div class="row mb-4">
        <div class="col-md-4">
          <div class="input-group">
            <span class="input-group-text">
              <i class="bi bi-search"></i>
            </span>
            <input 
              type="text" 
              class="form-control" 
              placeholder="Rechercher une phase..." 
              [(ngModel)]="searchTerm"
            >
          </div>
        </div>
        <div class="col-md-4">
          <select class="form-select" [(ngModel)]="selectedStatus" (change)="applyFilters()">
            <option value="all">Tous les statuts</option>
            <option value="upcoming">À venir</option>
            <option value="ongoing">En cours</option>
            <option value="completed">Terminée</option>
          </select>
        </div>
        <div class="col-md-4">
          <select class="form-select" [(ngModel)]="sortOrder" (change)="applyFilters()">
            <option value="dateAsc">Date (croissant)</option>
            <option value="dateDesc">Date (décroissant)</option>
            <option value="titleAsc">Titre (A-Z)</option>
            <option value="titleDesc">Titre (Z-A)</option>
            <option value="montantAsc">Montant (croissant)</option>
            <option value="montantDesc">Montant (décroissant)</option>
          </select>
        </div>
      </div>

      <div class="row">
        <div class="col-12 mb-4">
          <div class="alert alert-info" *ngIf="filteredPhases.length === 0">
            <i class="bi bi-info-circle me-2"></i> Aucune phase ne correspond à votre recherche.
          </div>
          
          <div class="phase-grid">
            <app-phase-card 
              *ngFor="let phase of filteredPhases" 
              [phase]="phase"
              (delete)="deletePhase($event)"
              class="slide-in"
            ></app-phase-card>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .phase-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 20px;
    }
    
    @media (max-width: 768px) {
      .phase-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class PhaseListComponent implements OnInit {
  phases: Phase[] = [];
  filteredPhases: Phase[] = [];
  searchTerm: string = '';
  selectedStatus: string = 'all';
  sortOrder: string = 'dateAsc';

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.getAllPhases().subscribe(phases => {
      this.phases = phases;
      this.applyFilters();
    });
  }

  applyFilters(): void {
    // First apply search filter
    let result = this.phases.filter(phase => 
      phase.titre.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      (phase.description && phase.description.toLowerCase().includes(this.searchTerm.toLowerCase()))
    );
    
    // Then apply status filter
    if (this.selectedStatus !== 'all') {
      result = result.filter(phase => getPhaseStatus(phase) === this.selectedStatus as PhaseStatus);
    }
    
    // Finally sort
    result = this.sortPhases(result, this.sortOrder);
    
    this.filteredPhases = result;
  }

  sortPhases(phases: Phase[], sortOrder: string): Phase[] {
    return [...phases].sort((a, b) => {
      switch (sortOrder) {
        case 'dateAsc':
          return new Date(a.dateDebut).getTime() - new Date(b.dateDebut).getTime();
        case 'dateDesc':
          return new Date(b.dateDebut).getTime() - new Date(a.dateDebut).getTime();
        case 'titleAsc':
          return a.titre.localeCompare(b.titre);
        case 'titleDesc':
          return b.titre.localeCompare(a.titre);
        case 'montantAsc':
          return a.montant - b.montant;
        case 'montantDesc':
          return b.montant - a.montant;
        default:
          return 0;
      }
    });
  }

  deletePhase(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette phase?')) {
      this.dataService.deletePhase(id).subscribe(() => {
        this.phases = this.phases.filter(phase => phase.id !== id);
        this.applyFilters();
      });
    }
  }
}