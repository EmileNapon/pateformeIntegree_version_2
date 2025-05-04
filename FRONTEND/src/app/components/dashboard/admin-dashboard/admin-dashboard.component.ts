import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Project } from '../../../models/projet/projet.model';
import { CommonModule } from '@angular/common';
import { ListAutoriteComponent } from '../../utilisateurs/autorites/list-autorites/list-authorite.component';
import { ListPrestataireComponent } from '../../utilisateurs/prestataires/list-prestataire/list-prestataire.component';
import { ListCitoyenComponent } from '../../utilisateurs/citoyens/list-citoyen/list-citoyen.component';
import { CreateProjetComponent } from '../../projets/create-projet/create-projet.component';
import { ListProjetsComponent } from '../../projets/list-projets/list-projets.component';
import { AuthService } from '../../../services/connexion-service/connexion.service';
import * as bootstrap from 'bootstrap'; // Importer Bootstrap JS
import { DetailProjetComponent } from '../../projets/detail-projet/detail-projet.component';
import { CreateDecaissementComponent } from '../../decaissement/create-decaissement/create-decaissement.component';
import { ListDecaissementComponent } from '../../decaissement/list-decaissement/list-decaissement.component';




@Component({
  selector: 'app-autorite-dashboard',
  imports: [ReactiveFormsModule, CommonModule,
     ListAutoriteComponent, ListProjetsComponent,
     CreateProjetComponent,ListPrestataireComponent,
     ListCitoyenComponent, DetailProjetComponent,
     CreateDecaissementComponent, ListDecaissementComponent],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css',
  standalone:true
})
export class AdminDashboardComponent implements AfterViewInit, OnInit{
  autoritevisible: boolean=false
  prestatairesVisible: boolean=false
  CreateDecaissementVisible: boolean = false;
  listDecaissementVisible: boolean = false;
  citoyenVisible: boolean=false
  projetListVisible: boolean=false
  avisVisible: boolean=false
  createProjetVisible = false;
  detailsProjetVisible=false
  ButtonCreateProjetVisible = false;
  vueEnsembeVisible:boolean=true
  userInfo: { email: string | null, firstName: string | null, lastName: string | null, profilePic: string | null } | null = null;
  isDropdownOpen: boolean = false;


  UtilisateursVisible:boolean =false
  
constructor(private authService: AuthService, private router: Router){}

ngOnInit(): void {
  this.userInfo = this.authService.getUserInfo();

  // const dropdownElementList = [].slice.call(document.querySelectorAll('.dropdown-toggle'));
  // dropdownElementList.map(function (dropdownToggleEl) {
  //   return new bootstrap.Dropdown(dropdownToggleEl);
  // });
  
}



showUsers = false;

toggleUsers() {
  this.showUsers = !this.showUsers;
}

showProjets=false
toggleProjets(): void{
  this.showProjets = !this.showProjets;
}





ngUtilisateursVisible():void{
  this.UtilisateursVisible=true
}

ngAfterViewInit(): void {
  const dropdownElementList = [].slice.call(document.querySelectorAll('.dropdown-toggle'));
  dropdownElementList.map((dropdownToggleEl: HTMLElement) => {
    return new bootstrap.Dropdown(dropdownToggleEl);
  });
}





onLogout(): void {
  this.authService.logout();
}

showDropdown() {
  this.isDropdownOpen = true;
}

// Cache le menu de déconnexion
hideDropdown() {
  this.isDropdownOpen = false;
}

// Garder le menu ouvert si on survole le menu lui-même
keepDropdownOpen() {
  this.isDropdownOpen = true;
}

  // Méthode pour afficher le composant ListDecaissement
  ngListDecaissementVisible(): void {
    this.listDecaissementVisible = true;
    this.CreateDecaissementVisible = false;
    this.vueEnsembeVisible = false;
    this.autoritevisible = false;
    this.prestatairesVisible = false;
    this.citoyenVisible = false;
    this.projetListVisible = false;
    this.avisVisible = false;
    this.ButtonCreateProjetVisible = false;
    this.createProjetVisible = false;
    this.detailsProjetVisible = false;
  }

ngCreateDecaissementVisible(): void {
  this.listDecaissementVisible = false;
  this.CreateDecaissementVisible = true;
  this.vueEnsembeVisible = false;
  this.autoritevisible = false;
  this.prestatairesVisible = false;
  this.citoyenVisible = false;
  this.projetListVisible = false;
  this.avisVisible = false;
  this.ButtonCreateProjetVisible = false;
  this.createProjetVisible = false;
  this.detailsProjetVisible = false;
}

ngVueEnsembeVisible():void{
  this.listDecaissementVisible = false;
  this.CreateDecaissementVisible = false;
  this.vueEnsembeVisible=true
  this.autoritevisible=false
  this.prestatairesVisible=false
  this.citoyenVisible=false
  this.projetListVisible=false
  this.avisVisible=false
  this.ButtonCreateProjetVisible =false
  this.createProjetVisible = false;
  this.detailsProjetVisible=false
}

ngAutoriteVisible():void {
  this.listDecaissementVisible = false;
  this.CreateDecaissementVisible = false;
  this.vueEnsembeVisible=false
  this.autoritevisible=true
  this.prestatairesVisible=false
 this.citoyenVisible=false
 this.projetListVisible=false
 this.avisVisible=false
 this.ButtonCreateProjetVisible=false
 this.createProjetVisible = false;
 this.detailsProjetVisible=false

}


ngPrestatairesVisible():void {
  this.listDecaissementVisible = false;
  this.CreateDecaissementVisible = false;
  this.vueEnsembeVisible=false
  this.autoritevisible=false
  this.prestatairesVisible=true
  this.citoyenVisible=false
  this.projetListVisible=false
  this.avisVisible=false
  this.ButtonCreateProjetVisible =false
  this.createProjetVisible = false;
  this.detailsProjetVisible=false

 
 }

 ngCitoyenVisible():void {
  this.listDecaissementVisible = false;
  this.CreateDecaissementVisible = false;
  this.vueEnsembeVisible=false
  this.autoritevisible=false
  this.prestatairesVisible=false
  this.citoyenVisible=true
  this.projetListVisible=false
  this.avisVisible=false
  this.ButtonCreateProjetVisible =false
  this.createProjetVisible = false;
  this.detailsProjetVisible=false
 
 }

 ngProjetVisible():void {
  this.listDecaissementVisible = false;
  this.CreateDecaissementVisible = false;
  this.vueEnsembeVisible=false
  this.autoritevisible=false
  this.prestatairesVisible=false
  this.citoyenVisible=false
  this.projetListVisible=true
  this.avisVisible=false
  this.ButtonCreateProjetVisible =true
  this.createProjetVisible = false;
  this.detailsProjetVisible=false
 }



 ngCreateProjerVisible():void {
  this.listDecaissementVisible = true;
  this.CreateDecaissementVisible = false;
  this.vueEnsembeVisible=false
  this.autoritevisible=false
  this.prestatairesVisible=false
  this.citoyenVisible=false
  this.projetListVisible=false
  this.ButtonCreateProjetVisible=false
  this.createProjetVisible = true;
  this.detailsProjetVisible=false
 
 }
 

 ngDetailsProjerVisible():void {
  this.listDecaissementVisible = true;
  this.CreateDecaissementVisible = false;
  this.vueEnsembeVisible=false
  this.autoritevisible=false
  this.prestatairesVisible=false
  this.citoyenVisible=false
  this.projetListVisible=false
  this.ButtonCreateProjetVisible=false
  this.createProjetVisible = true;
  this.detailsProjetVisible=true
 
 }

  //  ngGetCreateProjet(): void{
  //   this.router.navigate(['/plateforme-integree/create-projet']); 
  //  }










   


   


  
  getStatusLabel(status: string): string {
    const statusLabels: {[key: string]: string} = {
      'planned': 'Planifié',
      'in-progress': 'En cours',
      'delayed': 'Retardé',
      'completed': 'Terminé',
      'cancelled': 'Annulé'
    };
    return statusLabels[status] || status;
  }




  sidebarCollapsed: boolean = false;
  selectedProject: any | null = null;

  projects: any[] = [
    {
      id: 1,
      name: 'Route Ouaga-Bobo (Phase 2)',
      location: 'Ouagadougou à Bobo-Dioulasso',
      progress: 65,
      startDate: '15/03/2023',
      endDate: '30/09/2023',
      budget: '5,000,000',
      disbursements: '2,750,000',
      companies: ['Sogea-Satom', 'PFO Burkina']
    },
    {
      id: 2,
      name: 'Pont de Koudougou',
      location: 'Koudougou, Centre-Ouest',
      progress: 90,
      startDate: '10/01/2023',
      endDate: '25/07/2023',
      budget: '2,500,000',
      disbursements: '2,000,000',
      companies: ['Eiffage Burkina']
    },
    {
      id: 3,
      name: 'École Primaire de Dori',
      location: 'Dori, Sahel',
      progress: 45,
      startDate: '05/02/2023',
      endDate: '15/11/2023',
      budget: '1,200,000',
      disbursements: '500,000',
      companies: ['BTP Sahel']
    },
    {
      id: 4,
      name: 'Hôpital de Banfora',
      location: 'Banfora, Cascades',
      progress: 20,
      startDate: '01/04/2023',
      endDate: '30/12/2023',
      budget: '3,800,000',
      disbursements: '300,000',
      companies: ['Sobuga', 'MediTECH']
    },
    {
      id: 5,
      name: "Réseau d'eau potable",
      location: "Fada N'Gourma, Est",
      progress: 75,
      startDate: "20/02/2023",
      endDate: "10/10/2023",
      budget: "4,200,000",
      disbursements: "3,100,000",
      companies: ["ONEA", "Hydraulique Burkina"]
    }
  ];

  toggleSidebar(): void {
    this.sidebarCollapsed = !this.sidebarCollapsed;
  }

  showProjectDetails(projectId: number): void {
    this.selectedProject = this.projects.find(p => p.id === projectId) || null;
  }

  clearProjectSelection(): void {
    this.selectedProject = null;
  }



















  
}


