import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProjetService } from '../../projets/services/services.service';

@Component({
  selector: 'app-create-decaissement',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-decaissement.component.html',
  styleUrls: ['./create-decaissement.component.css']
})
export class CreateDecaissementComponent implements OnInit {
  decaissementForm: FormGroup;
  projets: any[] = []; // Liste des projets disponibles
  livrableFile: File | null = null; // Fichier livrable

  constructor(
    private formBuilder: FormBuilder,
    private projetService: ProjetService,
    private router: Router
  ) {
    // Initialisation du formulaire
    this.decaissementForm = this.formBuilder.group({
      projet: ['', Validators.required],
      nomEtape: ['', Validators.required],
      montant: [0, [Validators.required, Validators.min(1)]],
      dateDecaissement: ['', Validators.required],
      description: [''],
      livrable: [null] // Champ pour le fichier livrable
    });
  }

  ngOnInit(): void {
    this.loadProjets(); // Charger les projets disponibles
  }

  // Charger les projets disponibles
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

  // Gestion du fichier livrable
  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.livrableFile = file;
    }
  }

  // Créer un décaissement
    createDecaissement(): void {
      const formData = new FormData();
      formData.append('projet', this.decaissementForm.value.projet);
      formData.append('nomEtape', this.decaissementForm.value.nomEtape);
      formData.append('montant', this.decaissementForm.value.montant);
      formData.append('dateDecaissement', this.decaissementForm.value.dateDecaissement);
      formData.append('description', this.decaissementForm.value.description);
    
      // Ajouter le fichier livrable s'il est présent
      if (this.livrableFile) {
        formData.append('document', this.livrableFile); // Assurez-vous que le champ correspond au modèle Django
      }
    
      // Log des données envoyées
      formData.forEach((value, key) => {
        console.log(`${key}: ${value}`);
      });
    
      this.projetService.addDecaissement(formData).subscribe(
        (response) => {
          console.log('Décaissement créé avec succès !', response);
          this.router.navigate(['/decaissements']); // Redirection après création
        },
        (error) => {
          console.error('Erreur lors de la création du décaissement :', error);
        }
      );
    }
}