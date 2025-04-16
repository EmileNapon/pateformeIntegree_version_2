import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PartenaireService } from './service/service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-partenaires',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-partenaires.component.html',
  styleUrl: './create-partenaires.component.css',
  standalone:true
})
export class CreatePartenairesComponent implements OnInit {

constructor(private formBuilder: FormBuilder, private partenaireService: PartenaireService ){

}
  FormPartenaire!: FormGroup;
ngOnInit(): void {
  this.ngInitFormPartenaires()
    
}

  ngInitFormPartenaires():void{
    this.FormPartenaire = this.formBuilder.group({
      nom: ['', [Validators.required, Validators.maxLength(255)]],
      type: [ Validators.required],
      contact: [ Validators.required],
     // logo:[null]
    });
  }
  createProjetPartenaire(): any{
    const formData = new FormData();
    formData.append('nom', this.FormPartenaire.value.nom);
    formData.append('type', this.FormPartenaire.value.type);
    formData.append('contact', this.FormPartenaire.value.contact);
   // formData.append('logo', this.projetFormPartenanire.value.logo);

    formData.forEach((value, key) => {
      console.log(`${key}: ${value}`);
    });
    
      this.partenaireService.addProjetsPartenaire(formData).subscribe(
        (response) => {
          console.log('partenaire créé avec succès!', response);
          //  this.router.navigate(['/plateforme-integree/list-projets']); // Redirige vers la liste des projets après la création
        },
        (error) => {
          console.error('Erreur lors de la création du projet:', error);
        }
      );
    
      }
    
  }




