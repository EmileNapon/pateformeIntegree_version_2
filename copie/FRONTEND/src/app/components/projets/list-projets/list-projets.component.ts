import { Component, OnInit } from '@angular/core';
import { ProjetService } from '../services/services.service';
import { Projet } from '../models/models';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-projets',
  standalone:true,
  imports:[CommonModule],
  templateUrl: './list-projets.component.html',
  styleUrl: './list-projets.component.css'
})
export class ListProjetsComponent implements OnInit {

  projets: Projet[] = [];
  projetsEnCours: Projet[] = [];
  projetsExpirés: Projet[] = [];
  loading:boolean= false

  constructor(private projetService: ProjetService,  private router: Router) { }

  ngOnInit(): void {
    this.getProjets();
  }

  getProjets(): void {
    this.projetService.getProjets().subscribe(data => {
      this.projets = data;
      console.log("listes des projets",this.projets)
     // this.filterProjets();
    });
  }


allerDetail( id: number):void{
  this.router.navigate([`/plateforme-integree/detail-projet/${id}`])
  }
}
