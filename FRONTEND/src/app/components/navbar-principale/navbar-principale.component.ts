import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/connexion-service/connexion.service';
import { ListProjetsComponent } from '../projets/list-projets/list-projets.component';


@Component({
  selector: 'app-navbar-principale',
  imports: [CommonModule, ListProjetsComponent],
  standalone:true,
  templateUrl: './navbar-principale.component.html',
  styleUrl: './navbar-principale.component.css'
})
export class NavbarPrincipaleComponent implements OnInit{
  userInfo: { email: string | null, firstName: string | null, lastName: string | null, profilePic: string | null } | null = null;
  isDropdownOpen: boolean = false;
  projetListVisible:boolean=false
constructor( private authService: AuthService, private router: Router){}

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



routerConnexion():void{
  this.router.navigate([`/plateforme-integree/auth`])
}

ngProjetVisible():void{
 this.projetListVisible=true
 console.log(this.projetListVisible)
}
}
