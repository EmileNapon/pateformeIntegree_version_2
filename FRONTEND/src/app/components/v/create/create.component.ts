import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CalendrierDecaissement } from '../service/service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjetService } from '../../projets/services/services.service';

@Component({
  selector: 'app-create',
  standalone: false,
  templateUrl: './creat.component.html',
  styleUrl: './create.component.css'
})
export class CreatevvComponent implements OnInit {
  phaseForm!: FormGroup;
  FormsPhasePhase!:FormGroup; 
  projet: any
  projetId: string | null = null;
  

  phaseId!:number

  constructor(
    private fb: FormBuilder,
    private phaseService: CalendrierDecaissement, private projetService:ProjetService, private router: Router, private route: ActivatedRoute, 
  ) {}

  ngOnInit(): void {
   this.projetId = this.route.snapshot.paramMap.get('id');
   this.ngInitForms()
   this.loadProjet()
  }
  // chargement du projet

  loadProjet(): void {
    this.projetService.getProjetById(1).subscribe(data => {
      this.projet = data;
      console.log('phsae ', this.projet)
    });
  }

  ngInitForms():void{
    this.phaseForm = this.fb.group({
      projet: [1],
      nom: ['', Validators.required],
      dateDebut: ['', Validators.required],
      dateFin: ['', Validators.required],
      montant:[null],
      statut: ['Termine'],
      description: [''],
    });
  }

  onSubmit() {


    const formData = new FormData();

    formData.append('projet', this.phaseForm.value.projet);
    formData.append('titre', this.phaseForm.value.titre);
    formData.append('description', this.phaseForm.value.description);
    formData.append('date_debut', this.phaseForm.value.date_debut);
    formData.append('date_fin', this.phaseForm.value.date_fin);
    formData.forEach((value, key) => {
      console.log(`${key}: ${value}`);
    });
  

    if (this.phaseForm.valid) {
      this.phaseService.createPhase(formData).subscribe(response => {
        console.log('Phase créée avec succès', response);
        this.phaseForm.reset();
        this.loadPhaseProjet()
      }, error => {
        console.error('Erreur de création', error);
      });
    }
  }

  phase: any[]=[]
  loadPhaseProjet(): void {
    this.phaseService.getPhasesProjet().subscribe(data => {
      this.phase = data;
      console.log('phsae ', this.phase)
    });
  }


  resetForm() {
    this.phaseForm.reset({
      statut: 'planifie'
    });
  }
  


  

}