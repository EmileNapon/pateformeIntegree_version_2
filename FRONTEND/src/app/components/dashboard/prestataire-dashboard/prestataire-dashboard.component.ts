import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ListCitoyenComponent } from '../../utilisateurs/citoyens/list-citoyen/list-citoyen.component';
import { ListProjetsComponent } from '../../projets/list-projets/list-projets.component';
import { AuthService } from '../../../services/connexion-service/connexion.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-prestataire-dashboard',
  imports: [CommonModule, ListProjetsComponent],
  templateUrl: './prestataire-dashboard.component.html',
  styleUrl: './prestataire-dashboard.component.css',
  standalone:true
})
export class PrestataireDashboardComponent implements OnInit{

  prestatairesVisible: boolean=false

  projetListVisible: boolean=false
  historieVisible:boolean=false
  avisVisible: boolean=false
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





 ngCitoyenVisible():void {
  this.prestatairesVisible=false
  this.projetListVisible=false
  this.historieVisible=false
  this.avisVisible=false
 
 }

 ngProjetVisible():void {
  this.prestatairesVisible=false
  this.projetListVisible=true
  this.historieVisible=false
  this.avisVisible=false
 }

 ngHistorieVisible():void {
  this.prestatairesVisible=false
  this.projetListVisible=false
  this.historieVisible=true
  this.avisVisible=false
 }


 ngAvisVisible():void {
  this.prestatairesVisible=false
  this.projetListVisible=false
  this.historieVisible=false
  this.avisVisible=true
 
 }
}
