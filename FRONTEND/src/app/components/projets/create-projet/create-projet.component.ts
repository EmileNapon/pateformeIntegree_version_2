import { Component, OnInit } from '@angular/core';
import { ProjetService } from '../services/services.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Projet } from '../models/models';
import { CommonModule } from '@angular/common';
import { User } from '../../../models/user';
import { UserService } from '../../utilisateurs/service/service';
import { PartenaireService } from '../../partenaires/services/services';
import { map } from 'rxjs';
import { MapComponent } from './map/map.component';

@Component({
  selector: 'app-create-projet',
  standalone:true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-projet.component.html',
  styleUrl: './create-projet.component.css'
})
export class CreateProjetComponent implements OnInit {

  TYPE_PROJET_CHOICES = [
    'route',
  ];

  projetForm!: FormGroup;
  projetFormDetails!: FormGroup;
  projetFormLocalisation!: FormGroup;
  projetFormActeurs!:FormGroup;
  prestataires:any[]=[]
  


  projetID:any
  partenaires:any[]=[]

  onLocationSelected(location: { latitude: number; longitude: number }): void {
    console.log('Localisation sélectionnée :', location);
    this.projetFormLocalisation.patchValue({
      latitude: location.latitude,
      longitude: location.longitude
    });
  }


  constructor(private projetService: ProjetService, private router: Router, private formBuilder: FormBuilder,
    private userService : UserService, private partenaireService: PartenaireService) {}
    loadPrestataires(): void {
      this.userService.getPrestataires().subscribe(data => {
        this.prestataires = data;
        console.log('prestataires ', this.prestataires)
      });
    }


    ngOnInit(): void {
      this.ngInitForms();
    }
    
    ngInitForms(): void {
      this.projetForm = this.formBuilder.group({
        nom: ['', [Validators.required, Validators.maxLength(255)]],
        typeProjet: ['route', Validators.required],  // Valeur par défaut
        budget: [0, [Validators.required, Validators.min(1)]],
        dateDebut: ['', Validators.required],
        dateFin: [''],  // Optionnel
        statut: ['planifie', Validators.required],  // Valeurs possibles : planifie, en_cours, termine, attente_financement
        user: [1],  // Autorité initiatrice
        prestataire: [1, Validators.required],  // Lien vers un utilisateur prestataire
    
        region: ['', Validators.required],
        latitude: [null, Validators.required],
        longitude: [null, Validators.required],
    
        objectifs: ['', Validators.required],
        description: ['', Validators.required],
      });
    }

onSubmit(): void {
  const formData = new FormData();

  formData.append('nom', this.projetForm.value.nom);
  formData.append('typeProjet', this.projetForm.value.typeProjet);
  formData.append('budget', this.projetForm.value.budget);
  formData.append('dateDebut', this.projetForm.value.dateDebut);
  formData.append('dateFin', this.projetForm.value.dateFin);
  formData.append('statut', this.projetForm.value.statut);
  formData.append('user', this.projetForm.value.user);
  formData.append('prestataire', this.projetForm.value.prestataire);

  formData.append('region', this.projetForm.value.region);
  formData.append('latitude', this.projetForm.value.latitude);
  formData.append('longitude', this.projetForm.value.longitude);

  formData.append('objectifs', this.projetForm.value.objectifs);
  formData.append('description', this.projetForm.value.description);

  formData.forEach((value, key) => {
    console.log(`${key}: ${value}`);
  });

  this.projetService.addProjet(formData).subscribe(
    (response) => {
      console.log('Projet créé avec succès!', response);
    },
    (error) => {
      console.error('Erreur lors de la création du projet:', error);
    }
  );
}

    
    }
  

  
  

  




  
