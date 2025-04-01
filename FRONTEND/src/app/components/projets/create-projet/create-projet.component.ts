import { Component, OnInit } from '@angular/core';
import { ProjetService } from '../services/services.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Projet } from '../models/models';
import { CommonModule } from '@angular/common';
import { User } from '../../../models/user';

@Component({
  selector: 'app-create-projet',
  standalone:true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-projet.component.html',
  styleUrl: './create-projet.component.css'
})
export class CreateProjetComponent implements OnInit {

  TYPE_PROJET_CHOICES = [
    'infrastructure','energie','sante','education','transport','autre'
  ];

  projetForm!: FormGroup;
  prestataires:any[]=[]

  constructor(private projetService: ProjetService, private router: Router, private formBuilder: FormBuilder,) {}

  ngOnInit(): void {
    this.ngInitForms()
    this.loadPrestataires();
      
  }

  ngInitForms():void{
    this.projetForm = this.formBuilder.group({
      nom: ['', [Validators.required, Validators.maxLength(255)]],
      typeProjet: ['', Validators.required],
      budget: [0, [Validators.required, Validators.min(1)]],
      dateDebut: ['', Validators.required],
      dateFin: [''],
      statut: ['planifie', Validators.required],
      user: [1,[Validators.required]], // Vous pouvez ici spécifier l'ID de l'utilisateur ou récupérer l'ID connecté
    });
  }


  loadPrestataires(): void {
    this.projetService.getPrestataires().subscribe(data => {
      this.prestataires = data;
      console.log('prestataires ', this.prestataires)
    });
  }
  
  selectedEncadrant: any[] = [];

  selectedPrestataire: { user: number }[] = [];
  
    formation: number |null=null
  
  
          // Gestion de la sélection des modules
          onEncadrantSelectionChange(prestataireId: number, event: any): void {
            if (event.target.checked) {
              // Ajouter le module à la sélection s'il n'existe pas déjà
              if (!this.selectedPrestataire.some(selected => selected.user === prestataireId)) {
                this.selectedPrestataire.push({user:prestataireId });  
              }
            } else {
              // Retirer le module de la sélection si la case est décochée
              this.selectedPrestataire = this.selectedPrestataire.filter(selected => selected.user !== prestataireId);
              // Récupérer la liste de tous les utilisateurs sélectionnés
            }
            const utilisateurs = this.selectedPrestataire.map(prestataire => prestataire.user);
  
            // Mettre à jour la valeur du champ 'user' dans le formulaire existant
            this.projetForm.patchValue({
              user: utilisateurs
            });
          }

  
  createProjet() {
    const formData = new FormData();
    formData.append('nom', this.projetForm.value.nom);
    formData.append('typeProjet', this.projetForm.value.typeProjet); // À corriger
    formData.append('budget', this.projetForm.value.budget);
    formData.append('dateDebut', this.projetForm.value.dateDebut);
    formData.append('dateFin', this.projetForm.value.dateFin);
    formData.append('statut', this.projetForm.value.statut);
    formData.append('user', this.projetForm.value.user);

    formData.forEach((value, key) => {
      console.log(`${key}: ${value}`);
    });
    this.projetService.addProjet(formData).subscribe(
      (response) => {
        console.log('Projet créé avec succès!', response);
        this.router.navigate(['/plateforme-integree/list-projets']); // Redirige vers la liste des projets après la création
      },
      (error) => {
        console.error('Erreur lors de la création du projet:', error);
      }
    );
  }




}