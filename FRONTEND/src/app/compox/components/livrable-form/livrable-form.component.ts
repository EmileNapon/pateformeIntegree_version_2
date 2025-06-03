import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../../services/data.service';
import { Livrable } from '../../models/phase.model';

@Component({
  selector: 'app-livrable-form',
  standalone: false,
  template: `
    <div class="card mb-4 border-secondary">
      <div class="card-body">
        <h6 class="card-title mb-3">{{ isEditMode ? 'Modifier' : 'Ajouter' }} un livrable</h6>
        
        <form [formGroup]="livrableForm" (ngSubmit)="onSubmit()">
          <div class="row">
            <div class="col-md-6 mb-3">
              <label for="nom" class="form-label">Nom</label>
              <input 
                type="text" 
                id="nom" 
                class="form-control" 
                formControlName="nom" 
                placeholder="Nom du livrable"
              >
              <div *ngIf="submitted && f['nom'].errors" class="text-danger">
                <small *ngIf="f['nom'].errors['required']">Le nom est requis</small>
                <small *ngIf="f['nom'].errors['maxlength']">Le nom ne doit pas dépasser 200 caractères</small>
              </div>
            </div>
            
            <div class="col-md-6 mb-3">
              <label for="dateRemise" class="form-label">Date de remise</label>
              <input 
                type="date" 
                id="dateRemise" 
                class="form-control" 
                formControlName="dateRemise"
              >
            </div>
          </div>
          
          <div class="mb-3">
            <label for="description" class="form-label">Description</label>
            <textarea 
              id="description" 
              class="form-control" 
              formControlName="description" 
              rows="2" 
              placeholder="Description du livrable"
            ></textarea>
          </div>
          
          <div class="mb-3">
            <label for="fichier" class="form-label">Fichier</label>
            <input 
              type="file" 
              id="fichier" 
              class="form-control" 
              (change)="onFileChange($event)"
            >
            <small *ngIf="currentFile" class="text-muted">
              Fichier actuel: {{ currentFile }}
            </small>
          </div>
          
          <div class="d-flex justify-content-end">
            <button type="button" class="btn btn-outline-secondary me-2" (click)="cancel()">
              Annuler
            </button>
            <button type="submit" class="btn btn-primary">
              {{ isEditMode ? 'Mettre à jour' : 'Ajouter' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  `,
  styles: []
})
export class LivrableFormComponent implements OnInit {
  @Input() phaseId!: number;
  @Input() livrable?: Livrable;
  @Output() complete = new EventEmitter<boolean>();
  
  livrableForm!: FormGroup;
  isEditMode = false;
  submitted = false;
  currentFile?: string;
  selectedFile?: File;

  constructor(
    private formBuilder: FormBuilder,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    this.createForm();
    
    if (this.livrable) {
      this.isEditMode = true;
      this.loadLivrable();
    }
  }

  createForm(): void {
    this.livrableForm = this.formBuilder.group({
      nom: ['', [Validators.required, Validators.maxLength(200)]],
      description: [''],
      dateRemise: ['']
    });
  }

  loadLivrable(): void {
    if (!this.livrable) return;
    
    // Format date for the form (YYYY-MM-DD)
    let dateRemise = '';
    if (this.livrable.dateRemise) {
      const date = new Date(this.livrable.dateRemise);
      dateRemise = this.formatDateForInput(date);
    }
    
    this.livrableForm.patchValue({
      nom: this.livrable.nom,
      description: this.livrable.description,
      dateRemise: dateRemise
    });
    
    if (typeof this.livrable.fichier === 'string') {
      this.currentFile = this.livrable.fichier;
    }
  }

  formatDateForInput(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  get f() { return this.livrableForm.controls; }

  onFileChange(event: any): void {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
    }
  }

  onSubmit(): void {
    this.submitted = true;
    
    if (this.livrableForm.invalid) {
      return;
    }
    
    const livrableData: Livrable = {
      ...this.livrableForm.value,
      phaseId: this.phaseId
    };
    
    if (this.livrableForm.value.dateRemise) {
      livrableData.dateRemise = new Date(this.livrableForm.value.dateRemise);
    }
    
    if (this.selectedFile) {
      livrableData.fichier = this.selectedFile;
    } else if (this.currentFile) {
      livrableData.fichier = this.currentFile;
    }
    
    if (this.isEditMode && this.livrable?.id) {
      livrableData.id = this.livrable.id;
      this.dataService.updateLivrable(livrableData).subscribe(() => {
        this.complete.emit(true);
      });
    } else {
      this.dataService.addLivrable(livrableData).subscribe(() => {
        this.complete.emit(true);
      });
    }
  }

  cancel(): void {
    this.complete.emit(false);
  }
}