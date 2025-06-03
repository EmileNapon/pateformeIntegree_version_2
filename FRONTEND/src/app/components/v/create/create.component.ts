import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CalendrierDecaissement } from '../service/service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-create',
  standalone: false,
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class CreatevComponent implements OnInit {
  phaseForm!: FormGroup;
  FormsPhasePhase!:FormGroup; 
  projets: any[] = [];
  projetId: string | null = null;
  
  isVissibleCalendrier!:boolean
  buttonLivrablePhase!:boolean


  isVissibleCalendrierButton!:boolean
  isVissibleCalendrierCreate!:boolean
  isVissibleCalendrierList!:boolean

  phasePhaseVisible!:boolean
  statutAjoutLivrableVisible!:boolean

  constructor(
    private fb: FormBuilder,
    private phaseService: CalendrierDecaissement, private router: Router, private route: ActivatedRoute, 
  ) {}

  ngOnInit(): void {
  this.isVissibleCalendrierCreate=false
  this.isVissibleCalendrierButton=true
  this.isVissibleCalendrierList=true
  this.buttonLivrablePhase=false
  this.phasePhaseVisible=false
  
   this.statutAjoutLivrableVisible=false
   this.projetId = this.route.snapshot.paramMap.get('id');
   this.ngInitForms()
   this.loadPhaseProjet()
   this.ngInitFormsPhasePhase()
  }
  ngInitForms():void{
    this.phaseForm = this.fb.group({
      projet: [this.projetId],
      titre: ['', Validators.required],
      description: [''],
      date_debut: ['', Validators.required],
      date_fin: ['', Validators.required]
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
        this.isVissibleCalendrierCreate=false
        this.isVissibleCalendrierList=false
        this.isVissibleCalendrierButton=false
        this.buttonLivrablePhase=true
        this.phasePhaseVisible=false
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


  ngInitFormsPhasePhase():void{
    this.FormsPhasePhase = this.fb.group({
      projet: [this.projetId],
      titre: ['', Validators.required],
      description: [''],
      date_debut: ['', Validators.required],
      date_fin: ['', Validators.required],
      phase: [null, Validators.required]
    });
  }
  


  onSubmit2() {
    const formData = new FormData();
    formData.append('projet', this.FormsPhasePhase.value.projet);
    formData.append('titre', this.FormsPhasePhase.value.titre);
    formData.append('description', this.FormsPhasePhase.value.description);
    formData.append('date_debut', this.FormsPhasePhase.value.date_debut);
    formData.append('date_fin', this.FormsPhasePhase.value.date_fin);
    formData.append('phase', this.FormsPhasePhase.value.phase);
    formData.forEach((value, key) => {
      console.log(`${key}: ${value}`);
    });

    if (this.FormsPhasePhase.valid) {
      this.phaseService.createPhasePhase(formData).subscribe(response => {
        console.log('Phase créée avec succès', response);
        this.FormsPhasePhase.reset();
        this.loadPhaseProjet()
      }, error => {
        console.error('Erreur de création', error);
      });
    }
  }


  changecreateListeCalenedrier(): void{
    this.isVissibleCalendrierCreate=true
    this.isVissibleCalendrierList=false
    this.isVissibleCalendrierButton=false
  }

  phasePhase():void{
    this.isVissibleCalendrierCreate=false
    this.isVissibleCalendrierList=false
    this.isVissibleCalendrierButton=false
    this.buttonLivrablePhase=false
    this.phasePhaseVisible=true
    this.statutAjoutLivrableVisible=false
    

  }

  statutAjoutLivrable():void{
    this.isVissibleCalendrierCreate=false
    this.isVissibleCalendrierList=false
    this.isVissibleCalendrierButton=false
    this.buttonLivrablePhase=false
    this.phasePhaseVisible=false
    this.statutAjoutLivrableVisible=true

  }
}