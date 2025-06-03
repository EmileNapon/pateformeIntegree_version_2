import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../../services/data.service';
import { Phase, Projet } from '../../models/phase.model';

@Component({
  selector: 'app-phase-form',
  standalone: false,
  template: `
    <div class="container page-container fade-in">
      <div class="row">
        <div class="col-md-8 mx-auto">
          <div class="card shadow-sm">
            <div class="card-body">
              <h2 class="card-title mb-4">{{ isEditMode ? 'Modifier' : 'Ajouter' }} une phase</h2>
              
              <form [formGroup]="phaseForm" (ngSubmit)="onSubmit()">
                <div class="mb-3">
                  <label for="projet" class="form-label">Projet</label>
                  <select id="projet" class="form-select" formControlName="projetId">
                    <option *ngFor="let projet of projets" [value]="projet.id">{{ projet.nom }}</option>
                  </select>
                  <div *ngIf="submitted && f['projetId'].errors" class="text-danger">
                    <small *ngIf="f['projetId'].errors['required']">Le projet est requis</small>
                  </div>
                </div>
                
                <div class="mb-3">
                  <label for="titre" class="form-label">Titre</label>
                  <input 
                    type="text" 
                    id="titre" 
                    class="form-control" 
                    formControlName="titre" 
                    placeholder="Titre de la phase"
                  >
                  <div *ngIf="submitted && f['titre'].errors" class="text-danger">
                    <small *ngIf="f['titre'].errors['required']">Le titre est requis</small>
                    <small *ngIf="f['titre'].errors['maxlength']">Le titre ne doit pas dépasser 100 caractères</small>
                  </div>
                </div>
                
                <div class="mb-3">
                  <label for="description" class="form-label">Description</label>
                  <textarea 
                    id="description" 
                    class="form-control" 
                    formControlName="description" 
                    rows="3" 
                    placeholder="Description détaillée de la phase"
                  ></textarea>
                </div>
                
                <div class="row mb-3">
                  <div class="col-md-6">
                    <label for="dateDebut" class="form-label">Date de début</label>
                    <input 
                      type="date" 
                      id="dateDebut" 
                      class="form-control" 
                      formControlName="dateDebut"
                    >
                    <div *ngIf="submitted && f['dateDebut'].errors" class="text-danger">
                      <small *ngIf="f['dateDebut'].errors['required']">La date de début est requise</small>
                    </div>
                  </div>
                  
                  <div class="col-md-6">
                    <label for="dateFin" class="form-label">Date de fin</label>
                    <input 
                      type="date" 
                      id="dateFin" 
                      class="form-control" 
                      formControlName="dateFin"
                    >
                    <div *ngIf="submitted && f['dateFin'].errors" class="text-danger">
                      <small *ngIf="f['dateFin'].errors['required']">La date de fin est requise</small>
                    </div>
                    <div *ngIf="submitted && phaseForm.errors?.['dateOrder']" class="text-danger">
                      <small>La date de fin doit être postérieure à la date de début</small>
                    </div>
                  </div>
                </div>
                
                <div class="mb-4">
                  <label for="montant" class="form-label">Montant (€)</label>
                  <input 
                    type="number" 
                    id="montant" 
                    class="form-control" 
                    formControlName="montant" 
                    placeholder="Montant alloué à cette phase"
                  >
                  <div *ngIf="submitted && f['montant'].errors" class="text-danger">
                    <small *ngIf="f['montant'].errors['required']">Le montant est requis</small>
                    <small *ngIf="f['montant'].errors['min']">Le montant doit être supérieur à 0</small>
                  </div>
                </div>
                
                <div class="d-flex justify-content-between">
                  <button type="button" class="btn btn-outline-secondary" routerLink="/phases">
                    <i class="bi bi-arrow-left me-1"></i> Annuler
                  </button>
                  <button type="submit" class="btn btn-primary">
                    <i class="bi bi-save me-1"></i> {{ isEditMode ? 'Mettre à jour' : 'Enregistrer' }}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .form-label {
      font-weight: 500;
    }
    
    .text-danger small {
      font-size: 0.8rem;
    }
  `]
})
export class PhaseFormComponent implements OnInit {
  phaseForm!: FormGroup;
  projets: Projet[] = [];
  isEditMode = false;
  phaseId?: number;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private dataService: DataService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.loadProjets();
    
    this.route.params.subscribe(params => {
      if (params['id'] && params['id'] !== 'new') {
        this.isEditMode = true;
        this.phaseId = +params['id'];
        this.loadPhase(this.phaseId);
      }
    });
  }

  createForm(): void {
    this.phaseForm = this.formBuilder.group({
      projetId: ['', Validators.required],
      titre: ['', [Validators.required, Validators.maxLength(100)]],
      description: [''],
      dateDebut: ['', Validators.required],
      dateFin: ['', Validators.required],
      montant: [60000, [Validators.required, Validators.min(0)]]
    }, { validators: this.dateOrderValidator });
  }

  dateOrderValidator(group: FormGroup): { [key: string]: boolean } | null {
    const dateDebut = group.get('dateDebut')?.value;
    const dateFin = group.get('dateFin')?.value;
    
    if (dateDebut && dateFin && new Date(dateDebut) >= new Date(dateFin)) {
      return { 'dateOrder': true };
    }
    
    return null;
  }

  loadProjets(): void {
    this.dataService.getAllProjets().subscribe(projets => {
      this.projets = projets;
      if (this.projets.length > 0 && !this.isEditMode) {
        this.phaseForm.patchValue({ projetId: this.projets[0].id });
      }
    });
  }

  loadPhase(id: number): void {
    this.dataService.getPhaseById(id).subscribe(phase => {
      if (phase) {
        // Format dates for the form (YYYY-MM-DD)
        const dateDebut = new Date(phase.dateDebut);
        const dateFin = new Date(phase.dateFin);
        
        this.phaseForm.patchValue({
          projetId: phase.projetId,
          titre: phase.titre,
          description: phase.description,
          dateDebut: this.formatDateForInput(dateDebut),
          dateFin: this.formatDateForInput(dateFin),
          montant: phase.montant
        });
      }
    });
  }

  formatDateForInput(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  get f() { return this.phaseForm.controls; }

  onSubmit(): void {
    this.submitted = true;
    
    if (this.phaseForm.invalid) {
      return;
    }
    
    const phaseData: Phase = {
      ...this.phaseForm.value,
      dateDebut: new Date(this.phaseForm.value.dateDebut),
      dateFin: new Date(this.phaseForm.value.dateFin)
    };
    
    if (this.isEditMode && this.phaseId) {
      phaseData.id = this.phaseId;
      this.dataService.updatePhase(phaseData).subscribe(() => {
        this.router.navigate(['/phases']);
      });
    } else {
      this.dataService.addPhase(phaseData).subscribe(() => {
        this.router.navigate(['/phases']);
      });
    }
  }
}