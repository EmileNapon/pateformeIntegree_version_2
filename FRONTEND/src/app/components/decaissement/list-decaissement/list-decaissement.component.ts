import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProjetService } from '../../projets/services/services.service';

@Component({
  selector: 'app-list-decaissement',
  standalone: true,
  imports: [CommonModule, FormsModule], // Ajoutez FormsModule ici
  templateUrl: './list-decaissement.component.html',
  styleUrls: ['./list-decaissement.component.css']
})
export class ListDecaissementComponent implements OnInit {
  projets: any[] = []; // Liste des projets
  decaissements: any[] = []; // Liste des décaissements pour le projet sélectionné
  projetSelectionne: number | null = null; // ID du projet sélectionné

  constructor(private projetService: ProjetService) {}

  ngOnInit(): void {
    this.loadProjets();
  }

  // Charger la liste des projets
  loadProjets(): void {
    this.projetService.getProjets().subscribe(
      (data) => {
        this.projets = data;
        console.log('Projets disponibles :', this.projets);
      },
      (error) => {
        console.error('Erreur lors du chargement des projets :', error);
      }
    );
  }

  // Charger les décaissements pour le projet sélectionné
     loadDecaissements(projetId: number | null): void {
    if (projetId === null) {
      console.error('Aucun projet sélectionné.');
      return;
    }
  
    this.projetService.getDecaissementsParProjet(projetId).subscribe(
      (data) => {
        this.decaissements = data; // Assurez-vous que seuls les décaissements filtrés sont assignés ici
        console.log(`Décaissements pour le projet ${projetId} :`, this.decaissements);
      },
      (error) => {
        console.error('Erreur lors du chargement des décaissements :', error);
      }
    );
  }
}