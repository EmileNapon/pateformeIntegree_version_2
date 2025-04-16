import { Component, OnInit } from '@angular/core';
import { ProjetService } from '../services/services.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Projet } from '../models/models';
import { CommonModule } from '@angular/common';
import { User } from '../../../models/user';
import { UserService } from '../../utilisateurs/service/service';
import { PartenaireService } from '../../partenaires/services/services';

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
  projetFormDetails!: FormGroup;
  projetFormLocalisation!: FormGroup;
  projetFormActeurs!:FormGroup;
  prestataires:any[]=[]
  
  projetFormVisible=true
  projetFormDetailsVisible=false
  projetFormLocalisationVisible=false
  projetFormPartenanireVisible=false
  projetFormActeursVisible=false

  projetFormVisibleButton=true
  projetFormDetailsVisibleButton=true
  projetFormLocalisationVisibleButton=true
  projetFormPartenanireVisibleButton=true
  projetFormActeursVisibleButton=true

  projetInfosVisibleButton=false
  partenaires:any[]=[]


  constructor(private projetService: ProjetService, private router: Router, private formBuilder: FormBuilder,
    private userService : UserService, private partenaireService: PartenaireService) {}

  currentStep: number = 1;

  steps: string[] = ['Infos', 'Details', 'Localisation', 'Partenaires','Acteurs', 'synthese'];

ngProjetFormDetailsVisible():void{
  this.projetFormVisible=false
  this.projetFormDetailsVisible=true
  this.projetFormLocalisationVisible=false
  this.projetFormPartenanireVisible=false
  this.projetFormActeursVisible=false
  if (this.currentStep < this.steps.length) {
    this.currentStep++;
  }
}
ngProjetFormLocalisationVisible():void{
  this.projetFormVisible=false
  this.projetFormDetailsVisible=false
  this.projetFormLocalisationVisible=true
  this.projetFormPartenanireVisible=false
  this.projetFormActeursVisible=false
  if (this.currentStep < this.steps.length) {
    this.currentStep++;
  }

}
ngProjetFormPartenanireVisible():void{

  this.projetFormVisible=false
  this.projetFormDetailsVisible=false
  this.projetFormLocalisationVisible=false
  this.projetFormPartenanireVisible=true
  this.projetFormActeursVisible=false
  if (this.currentStep < this.steps.length) {
    this.currentStep++;
  }

}
ngProjetFormActeursVisible():void{
  this.projetFormVisible=false
  this.projetFormDetailsVisible=false
  this.projetFormLocalisationVisible=false
  this.projetFormPartenanireVisible=false
  this.projetFormActeursVisible=true



  if (this.currentStep < this.steps.length) {
    this.currentStep++;
  }
}

ngProjetInfosVisible():void{
  this.projetFormVisible=true
  this.projetFormDetailsVisible=true
  this.projetFormLocalisationVisible=true
  this.projetFormPartenanireVisible=true
  this.projetFormActeursVisible=true

  this.projetFormVisibleButton=false
  this.projetFormDetailsVisibleButton=false
  this.projetFormLocalisationVisibleButton=false
  this.projetFormPartenanireVisibleButton=false
  this.projetFormActeursVisibleButton=false
  this.projetInfosVisibleButton=true

  if (this.currentStep < this.steps.length) {
    this.currentStep++;
  }

}


  ngOnInit(): void {
    this.loadPrestataires();
    this.loadPartenaires()

    this.DernierProjetID()
      
  }

  projetID:any

  DernierProjetID(): void {
    this.projetService.getDernierProjetID().subscribe(data => {
      this.projetID = data;
      console.log('projet ', this.projetID)
      this.ngInitForms()
      this.ngInitFormDetails()
      this.ngInitFormLocalisations()
      this.ngInitFormActeurs()
    });
  }

  ngInitForms():void{
    this.projetForm = this.formBuilder.group({
      nom: ['', [Validators.required, Validators.maxLength(255)]],
      typeProjet: ['', Validators.required],
      budget: [0, [Validators.required, Validators.min(1)]],
      dateDebut: ['', Validators.required],
      dateFin: [''],
      statut: ['planifie', Validators.required],
      user: [1], // Vous pouvez ici spécifier l'ID de l'utilisateur ou récupérer l'ID connecté
    });
  }


  ngInitFormDetails():void{
    this.projetFormDetails = this.formBuilder.group({
      objectifs: ['', [Validators.required, Validators.maxLength(255)]],
      description: ['', Validators.required],
      projet: [Number(this.projetID) + 1], 
    });
  }

  ngInitFormLocalisations():void{
    this.projetFormLocalisation = this.formBuilder.group({
      region: ['', [Validators.required, Validators.maxLength(255)]],
      latitude: [ Validators.required],
      longitude: [ Validators.required],
      projet: [Number(this.projetID) + 1], 
    });
  }



  ngInitFormActeurs():void{
    this.projetFormActeurs = this.formBuilder.group({
      projet:[Number(this.projetID) + 1],
      partenaire: [1],
    });
  }

  loadPrestataires(): void {
    this.userService.getPrestataires().subscribe(data => {
      this.prestataires = data;
      console.log('prestataires ', this.prestataires)
    });
  }
  
  loadPartenaires(): void {
    this.partenaireService.getProjetsPartenaire().subscribe(data => {
      this.partenaires = data;
      console.log('partenaires ', this.partenaires)
    });
  }
 

  createProjetInfos(): any {
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
   return formData
  }

  createProjetDetails(): any {
    const formData = new FormData();
    formData.append('objectifs', this.projetFormDetails.value.objectifs);
    formData.append('description', this.projetFormDetails.value.description);
    formData.append('projet', this.projetFormDetails.value.projet);

    formData.forEach((value, key) => {
      console.log(`${key}: ${value}`);
    });
   return formData
  }

  createProjetLocalisation() :any{
    const formData = new FormData();
    formData.append('region', this.projetFormLocalisation.value.region);
    formData.append('latitude', this.projetFormLocalisation.value.latitude);
    formData.append('longitude', this.projetFormLocalisation.value.longitude);
    formData.append('projet', this.projetFormLocalisation.value.projet);

    formData.forEach((value, key) => {
      console.log(`${key}: ${value}`);
    });
  return formData
  }


  
  
  createProjetActeurs(): any {
    const formData = new FormData();
    formData.append('projet', this.projetFormActeurs.value.projet);
    formData.append('partenaire', this.projetFormActeurs.value.partenaire);

    formData.forEach((value, key) => {
      console.log(`${key}: ${value}`);
    });
   return formData
  }

 


  ngProjetSave():void{
    console.log(' Number(this.projetID)+1',  Number(this.projetID)+1)
  
     this.projetService.addProjet(this.createProjetInfos()).subscribe(
      (response) => {
        console.log('Projet créé avec succès!', response)
        this.saveDetailProjet()
        this.saveProjetsLocalisation()
        this.saveProjetsActeurs()
      },
      (error) => {
        console.error('Erreur lors de la création du projet:', error);
      }
    );
  
    }
  
    saveDetailProjet():void{
  
      this.projetService.addDetailsProjets(this.createProjetDetails()).subscribe(
        (response) => {
          console.log('Projet créé avec succès!', response);
        },
        (error) => {
          console.error('Erreur lors de la création du projet:', error);
        }
      );
    }
  
  
    saveProjetsLocalisation():void{
  
      this.projetService.addProjetsLocalisation(this.createProjetLocalisation()).subscribe(
        (response) => {
          console.log('Projet créé avec succès!', response);
  
        },
        (error) => {
          console.error('Erreur lors de la création du projet:', error);
        }
      );
  
    }
  
    saveProjetsActeurs():void{
  
      this.userService.addProjetsActeurs(this.createProjetActeurs()).subscribe(
        (response) => {
          console.log('Projet créé avec succès!', response);
          this.router.navigate(['/plateforme-integree/list-projets']); // Redirige vers la liste des projets après la création
        },
        (error) => {
          console.error('Erreur lors de la création du projet:', error);
        }
      );
    }



  nextStep() {

  }

  prevStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  

  
}