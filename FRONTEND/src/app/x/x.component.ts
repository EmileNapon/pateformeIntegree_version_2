import { Component } from '@angular/core';
import {  FormBuilder, FormGroup, Validators } from '@angular/forms';


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
   
export class App {
  projectForm: FormGroup;
  constructor(private fb: FormBuilder) {
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
      bailleurs: [''],
      budget: [null],
      objectifs: [''],
      description: [''],
      statut: ['planifie']
    });
  }

  onSubmit() {
    if (this.projectForm.valid) {
      console.log('Form submitted:', this.projectForm.value);
    }
  }

  resetForm() {
    this.projectForm.reset({
      statut: 'planifie'
    });
  }
}
