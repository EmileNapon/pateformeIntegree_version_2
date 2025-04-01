import { Component, OnInit } from '@angular/core';
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

@Component({
  selector: 'app-autorite-dashboard',
  imports: [ReactiveFormsModule, CommonModule, ListAutoriteComponent, ListProjetsComponent,CreateProjetComponent,ListPrestataireComponent,ListCitoyenComponent],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css',
  standalone:true
})
export class AdminDashboardComponent implements OnInit{
  autoritevisible: boolean=false
  prestatairesVisible: boolean=false
  citoyenVisible: boolean=false
  projetListVisible: boolean=false
  avisVisible: boolean=false
  createProjetVisible = false;
  ButtonCreateProjetVisible = false;
  userInfo: { email: string | null, firstName: string | null, lastName: string | null, profilePic: string | null } | null = null;
  isDropdownOpen: boolean = false;
constructor(private authService: AuthService, private router: Router){}

ngOnInit(): void {
  this.userInfo = this.authService.getUserInfo();
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


ngAutoriteVisible():void {
 this.autoritevisible=true
 this.prestatairesVisible=false
 this.citoyenVisible=false
 this.projetListVisible=false
 this.avisVisible=false
 this.ButtonCreateProjetVisible ==false
 this.createProjetVisible = false;

}
ngPrestatairesVisible():void {
  this.autoritevisible=false
  this.prestatairesVisible=true
  this.citoyenVisible=false
  this.projetListVisible=false
  this.avisVisible=false
  this.ButtonCreateProjetVisible ==false
  this.createProjetVisible = false;
 
 }

 ngCitoyenVisible():void {
  this.autoritevisible=false
  this.prestatairesVisible=false
  this.citoyenVisible=true
  this.projetListVisible=false
  this.avisVisible=false
  this.ButtonCreateProjetVisible ==false
  this.createProjetVisible = false;
 
 }

 ngProjetVisible():void {
  this.autoritevisible=false
  this.prestatairesVisible=false
  this.citoyenVisible=false
  this.projetListVisible=true
  this.avisVisible=false
  this.ButtonCreateProjetVisible ==true
  this.createProjetVisible = false;
 }

 ngAvisVisible():void {
  this.autoritevisible=false
  this.prestatairesVisible=false
  this.citoyenVisible=false
  this.projetListVisible=false
  this.avisVisible=true
  this.ButtonCreateProjetVisible ==false
  this.createProjetVisible = false;
 
 }
 


   ngGetCreateProjet(): void{
    this.autoritevisible=false
    this.prestatairesVisible=false
    this.citoyenVisible=false
    this.projetListVisible=false
    this.avisVisible=false
    this.ButtonCreateProjetVisible ==false
    this.createProjetVisible = true;
   }

}
