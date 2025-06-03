import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CalendrierDecaissement } from '../service/service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-create',
  standalone: false,
  templateUrl: './modifier.html',
  styleUrl: './modifier.css'
})
export class CreateComponent implements OnInit {

    PhaseProjetForm: FormGroup;
    phaseProjetId!: number;
  
    phaseProjetEdit:any=''
  
    constructor(
      private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      private router: Router, private calendrierDecaissement: CalendrierDecaissement
  
    ) 
    {
      this.PhaseProjetForm = this.formBuilder.group({
        titre: ['', Validators.required],
        description: ['', [Validators.required, Validators.email]],
        date_debut: ['', Validators.required],
        date_fin: ['', Validators.required],
        role: ['autority', Validators.required],
  
      });
    }
  
    ngOnInit(): void {
        this.phaseProjetId = this.route.snapshot.params['updateAutorite'];
        this.LoadphaseProjetEdit();
      
      }
    
      LoadphaseProjetEdit():void{
        this.calendrierDecaissement.getPhaseProjetById(this.phaseProjetId).subscribe((data) => {
          this.phaseProjetEdit = data;
          this.filtreLoadphaseProjetEdit()
        });
      }
      filtreLoadphaseProjetEdit():void{
          this.PhaseProjetForm.patchValue({
            titre: this.PhaseProjetForm.titre,
            description: this.PhaseProjetForm.description,
            date_debut: this.PhaseProjetForm.date_debut,
            date_fin: this.PhaseProjetForm.date_fin,
            
          });
        
      }
      updatephaseProjet(): void {
        if (this.PhaseProjetForm.valid) {
        const formData = new FormData();
        formData.append('titre', this.PhaseProjetForm.value.titre);
        formData.append('description', this.PhaseProjetForm.value.description);
        formData.append('date_debut', this.PhaseProjetForm.value.date_debut);
        formData.append('date_fin', this.PhaseProjetForm.value.date_fin);
        formData.forEach((value, key) => {
          console.log(`${key}: ${value}`);
        });
        
          this.calendrierDecaissement.updateAutorite(this.phaseProjetId, this.PhaseProjetForm.value).subscribe(() => {
            this.router.navigate(['/plateforme-integree/dashboard-admin/list-autorites']);
          });
        }
      }
}