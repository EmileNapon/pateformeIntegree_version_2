import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: false,
  template: `
    <nav class="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
      <div class="container">
        <a class="navbar-brand d-flex align-items-center" href="#">
          <i class="bi bi-building me-2"></i>
          <span>Gestion de Projets Routiers</span>
        </a>
        
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" 
                data-bs-target="#navbarNav" aria-controls="navbarNav" 
                aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ms-auto">
            <li class="nav-item">
              <a class="nav-link" routerLink="/" routerLinkActive="active" 
                 [routerLinkActiveOptions]="{exact: true}">
                <i class="bi bi-house-door me-1"></i> Accueil
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" routerLink="/phases" routerLinkActive="active">
                <i class="bi bi-list-check me-1"></i> Phases
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" routerLink="/timeline" routerLinkActive="active">
                <i class="bi bi-calendar-week me-1"></i> Timeline
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  `,
  styles: [`
    .navbar-brand {
      font-weight: 600;
      color: var(--primary-color);
    }
    
    .nav-link {
      color: var(--dark-color);
      position: relative;
      transition: all 0.3s ease;
    }
    
    .nav-link:hover, .nav-link.active {
      color: var(--primary-color);
    }
    
    .nav-link.active::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 2px;
      background-color: var(--primary-color);
    }
  `]
})
export class HeaderComponent {}