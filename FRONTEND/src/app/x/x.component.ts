import { Component, OnInit } from '@angular/core';
import {  FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProjetService } from '../components/projets/services/services.service';


interface Project {
  nom: string;
  code_projet: string;
  debut_troncon: string;
  fin_troncon: string;
  region: string;
  latitude: number;
  longitude: number;
  type_travaux: string;
  longueur_troncon: number;
  largeur_chaussee: number;
  dateDebut: Date;
  dateFin: Date;
  type_revetement: string;
  normes_techniques: string;
  maitre_ouvrage: string;
  bureau_controle: string;
  bailleurs: string;
  budget: number;
  objectifs: string;
  description: string;
  statut: string;
}

@Component({
  selector: 'app-root',
  standalone: false,
  templateUrl: './x.component.html',
  styleUrls: ['./x.component.css']
})
   
export class App implements OnInit {

plan_directeur: File | null = null;
budget_detaille: File | null = null;
contrat_principal: File | null = null;

projectForm!: FormGroup;
constructor(private fb: FormBuilder, private projetService: ProjetService) {
  this.projectForm = this.fb.group({
    nom: ['', Validators.required],
    code_projet: ['', Validators.required],
    debut_troncon: [''],
    fin_troncon: [''],
    region: [''],
    latitude: [null],
    longitude: [null],
    type_travaux: [''],
    longueur_troncon: [null],
    largeur_chaussee: [null],
    dateDebut: [null],
    dateFin: [null],
    type_revetement: [''],
    normes_techniques: [''],
    maitre_ouvrage: [''],
    bureau_controle: [''],
    prestataire:[''],
    bailleurs: [''],
    user:[1],
    budget: [null],
    description: [''],
    statut: ['planifie'],
  });
}

  ngOnInit(): void {
   
  }



  onPlanDirecteurSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.plan_directeur = input.files[0];
    }
  }
  
  onBudgetDetailleSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.budget_detaille = input.files[0];
    }
  }
  
  onContratPrincipalSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.contrat_principal = input.files[0];
    }
  }
  

  onSubmit() {
    const formData = new FormData();
    const dateDebut = this.projectForm.value.dateDebut;
    const dateFin = this.projectForm.value.dateFin;
    
    formData.append('nom', this.projectForm.value.nom);
    formData.append('code_projet', this.projectForm.value.code_projet);
    formData.append('debut_troncon', this.projectForm.value.debut_troncon);
    formData.append('fin_troncon', this.projectForm.value.fin_troncon);
    formData.append('region', this.projectForm.value.region);
    formData.append('latitude', this.projectForm.value.latitude);
    formData.append('longitude', this.projectForm.value.longitude);
    formData.append('type_travaux', this.projectForm.value.type_travaux);
    formData.append('longueur_troncon', this.projectForm.value.longueur_troncon);
    formData.append('largeur_chaussee', this.projectForm.value.largeur_chaussee);
    formData.append('dateDebut', dateDebut ? dateDebut.toISOString().split('T')[0] : '');
    formData.append('dateFin', dateFin ? dateFin.toISOString().split('T')[0] : '');
    formData.append('type_revetement', this.projectForm.value.type_revetement);
    formData.append('normes_techniques', this.projectForm.value.normes_techniques);
    formData.append('maitre_ouvrage', this.projectForm.value.maitre_ouvrage);
    formData.append('bureau_controle', this.projectForm.value.bureau_controle);
    formData.append('prestataire', this.projectForm.value.prestataire);
    formData.append('bailleurs', this.projectForm.value.bailleurs);
    formData.append('user', this.projectForm.value.user);
    formData.append('budget', this.projectForm.value.budget);
    formData.append('description', this.projectForm.value.description);
    formData.append('statut', this.projectForm.value.statut);
    
    if (this.plan_directeur !== null) {
      formData.append('plan_directeur', this.plan_directeur, this.plan_directeur.name);
    }
    
    if (this.budget_detaille !== null) {
      formData.append('budget_detaille', this.budget_detaille, this.budget_detaille.name);
    }
    
    if (this.contrat_principal !== null) {
      formData.append('contrat_principal', this.contrat_principal, this.contrat_principal.name);
    }

    formData.forEach((value, key) => {
      console.log(`${key}: ${value}`);
    });

    // Soumission vers le backend
    this.projetService.addProjet(formData).subscribe(
      (response) => {
        console.log('Projet créé avec succès!', response);
        this.resetForm(); // Réinitialiser après succès
      },
      (error) => {
        console.error('Erreur lors de la création du projet:', error);
      }
    );
  }
  
  resetForm() {
    this.projectForm.reset({
      statut: 'planifie'
    });
  }
}
