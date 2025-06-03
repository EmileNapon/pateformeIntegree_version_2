import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DataService } from '../../services/data.service';
import { Phase, PhaseStatus, getPhaseStatus } from '../../models/phase.model';



@Component({
  selector: 'app-dashboard',
  standalone: false,
  template: `
    <div class="container page-container fade-in">
      <div class="row mb-4">
        <div class="col-12">
          <div class="jumbotron bg-light p-4 rounded shadow-sm">
            <h1 class="display-5 mb-3">
              <i class="bi bi-building me-2 text-primary"></i>
              Gestion de Projets Routiers
            </h1>
            <p class="lead">
              Bienvenue dans votre outil de gestion des phases de projets de construction routière.
            </p>
            <hr class="my-4">
            <p>
              Gérez efficacement vos projets, suivez les phases et les livrables, et visualisez l'avancement global.
            </p>
            <div class="mt-3">
              <a class="btn btn-primary btn-lg me-2" routerLink="/phases">
                <i class="bi bi-list-check me-1"></i> Voir les phases
              </a>
              <a class="btn btn-accent btn-lg" routerLink="/timeline">
                <i class="bi bi-calendar-week me-1"></i> Timeline
              </a>
            </div>
          </div>
        </div>
      </div>

      <div class="row mb-4">
        <div class="col-md-4 mb-3">
          <div class="card shadow-sm h-100">
            <div class="card-body">
              <h5 class="card-title">
                <i class="bi bi-hourglass-split me-2 text-warning"></i>
                Phases en cours
              </h5>
              <div class="text-center my-3">
                <div class="dashboard-count">{{ ongoingPhases.length }}</div>
                <div class="text-muted">sur {{ allPhases.length }} phases au total</div>
              </div>
              <div class="list-group">
                <a *ngFor="let phase of ongoingPhases.slice(0, 3)" 
                   [routerLink]="['/phases', phase.id]"
                   class="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
                  {{ phase.titre }}
                  <span class="badge bg-warning text-dark rounded-pill">En cours</span>
                </a>
              </div>
              <div *ngIf="ongoingPhases.length > 3" class="text-center mt-3">
                <a routerLink="/phases" class="btn btn-sm btn-outline-primary">Voir plus</a>
              </div>
            </div>
          </div>
        </div>
        
        <div class="col-md-4 mb-3">
          <div class="card shadow-sm h-100">
            <div class="card-body">
              <h5 class="card-title">
                <i class="bi bi-check2-circle me-2 text-success"></i>
                Phases terminées
              </h5>
              <div class="text-center my-3">
                <div class="dashboard-count">{{ completedPhases.length }}</div>
                <div class="text-muted">sur {{ allPhases.length }} phases au total</div>
              </div>
              <div class="list-group">
                <a *ngFor="let phase of completedPhases.slice(0, 3)" 
                   [routerLink]="['/phases', phase.id]"
                   class="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
                  {{ phase.titre }}
                  <span class="badge bg-success rounded-pill">Terminée</span>
                </a>
              </div>
              <div *ngIf="completedPhases.length > 3" class="text-center mt-3">
                <a routerLink="/phases" class="btn btn-sm btn-outline-primary">Voir plus</a>
              </div>
            </div>
          </div>
        </div>
        
        <div class="col-md-4 mb-3">
          <div class="card shadow-sm h-100">
            <div class="card-body">
              <h5 class="card-title">
                <i class="bi bi-clock me-2 text-primary"></i>
                Phases à venir
              </h5>
              <div class="text-center my-3">
                <div class="dashboard-count">{{ upcomingPhases.length }}</div>
                <div class="text-muted">sur {{ allPhases.length }} phases au total</div>
              </div>
              <div class="list-group">
                <a *ngFor="let phase of upcomingPhases.slice(0, 3)" 
                   [routerLink]="['/phases', phase.id]"
                   class="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
                  {{ phase.titre }}
                  <span class="badge bg-primary rounded-pill">À venir</span>
                </a>
              </div>
              <div *ngIf="upcomingPhases.length > 3" class="text-center mt-3">
                <a routerLink="/phases" class="btn btn-sm btn-outline-primary">Voir plus</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-md-6 mb-3">
          <div class="card shadow-sm">
            <div class="card-body">
              <h5 class="card-title">
                <i class="bi bi-calendar-check me-2 text-primary"></i>
                Prochaines phases
              </h5>
              <table class="table">
                <thead>
                  <tr>
                    <th>Phase</th>
                    <th>Date de début</th>
                    <th>Budget</th>
                  </tr>
                </thead>
                <tbody>
                  <tr *ngIf="upcomingPhases.length === 0">
                    <td colspan="3" class="text-center py-3">
                      Aucune phase à venir
                    </td>
                  </tr>
                  <tr *ngFor="let phase of upcomingPhases.slice(0, 5)">
                    <td>
                      <a [routerLink]="['/phases', phase.id]" class="text-decoration-none">
                        {{ phase.titre }}
                      </a>
                    </td>
                    <td>{{ phase.dateDebut | date:'dd/MM/yyyy' }}</td>
                    <td>{{ phase.montant | currency:'EUR':'symbol':'1.0-0' }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        
        <div class="col-md-6 mb-3">
          <div class="card shadow-sm">
            <div class="card-body">
              <h5 class="card-title">
                <i class="bi bi-cash me-2 text-success"></i>
                Budget par projet
              </h5>
              <table class="table">
                <thead>
                  <tr>
                    <th>Projet</th>
                    <th>Nombre de phases</th>
                    <th>Budget total</th>
                  </tr>
                </thead>
                <tbody>
                  <tr *ngFor="let projet of budgetByProjet">
                    <td>{{ getProjetName(projet.id) }}</td>
                    <td>{{ projet.phaseCount }}</td>
                    <td>{{ projet.totalBudget | currency:'EUR':'symbol':'1.0-0' }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .jumbotron {
      background: linear-gradient(to right, #f8f9fa, #e9ecef);
      border-left: 5px solid var(--primary-color);
    }
    
    .dashboard-count {
      font-size: 2.5rem;
      font-weight: 600;
      color: var(--dark-color);
    }
    
    .card {
      transition: transform 0.3s, box-shadow 0.3s;
    }
    
    .card:hover {
      transform: translateY(-5px);
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    }
  `]
})
export class DashboardComponent implements OnInit {
  allPhases: Phase[] = [];
  ongoingPhases: Phase[] = [];
  completedPhases: Phase[] = [];
  upcomingPhases: Phase[] = [];
  budgetByProjet: { id: number, phaseCount: number, totalBudget: number }[] = [];
  
  constructor(private dataService: DataService) {}
  
  ngOnInit(): void {
    this.dataService.getAllPhases().subscribe(phases => {
      this.allPhases = phases;
      
      // Filter phases by status
      this.ongoingPhases = phases.filter(phase => getPhaseStatus(phase) === PhaseStatus.ONGOING);
      this.completedPhases = phases.filter(phase => getPhaseStatus(phase) === PhaseStatus.COMPLETED);
      this.upcomingPhases = phases.filter(phase => getPhaseStatus(phase) === PhaseStatus.UPCOMING)
        .sort((a, b) => new Date(a.dateDebut).getTime() - new Date(b.dateDebut).getTime());
      
      // Calculate budget by projet
      this.calculateBudgetByProjet();
    });
  }
  
  calculateBudgetByProjet(): void {
    const projetMap = new Map<number, { phaseCount: number, totalBudget: number }>();
    
    this.allPhases.forEach(phase => {
      if (!projetMap.has(phase.projetId)) {
        projetMap.set(phase.projetId, { phaseCount: 0, totalBudget: 0 });
      }
      
      const projetData = projetMap.get(phase.projetId)!;
      projetData.phaseCount++;
      projetData.totalBudget += phase.montant;
    });
    
    this.budgetByProjet = Array.from(projetMap.entries()).map(([id, data]) => ({
      id,
      phaseCount: data.phaseCount,
      totalBudget: data.totalBudget
    }));
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
}