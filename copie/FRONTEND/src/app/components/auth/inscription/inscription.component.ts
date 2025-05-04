import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';

import { UserService } from './service/inscription.service';
import { Router, RouterModule } from '@angular/router';



@Component({
  selector: 'app-connexion',
  standalone:true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule, RouterModule],
  templateUrl: './inscription.component.html',
  styleUrl: './inscription.component.css'
})
export class InscriptionComponent implements OnInit {

  selectedFile: File | null = null;
  registrationForm!:FormGroup

  constructor(private fb: FormBuilder, private userService: UserService,private router: Router){}

  ngOnInit():void{
   this.initForms()
  }
initForms():void{
  this.registrationForm = this.fb.group({
    role: ['', Validators.required],
    username: [null], // Champ séparé pour username
    first_name: [''],
    last_name: [''],
    email: ['', Validators.required],
    password: [''],
    phone_number: [''],
    profession: [''],
    name_organization: ['', Validators.required],
    nom_entreprise: ['', Validators.required],
    secteur_activite: ['', Validators.required],
    enabled_notifications: [true]
  });

  }

  onFileSelected(event: any) {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
    }
  }


  isCitizen(): boolean {
    return this.registrationForm.get('role')?.value === 'citizen';
  }

  isAutority(): boolean {
    return this.registrationForm.get('role')?.value === 'autority';
  }

  isSupplier(): boolean {
    return this.registrationForm.get('role')?.value === 'supplier';
  }


  onSubmit() {
    const formData = new FormData();
    formData.append('role', this.registrationForm.value.role);
    formData.append('username', this.registrationForm.value.first_name); // À corriger
    formData.append('first_name', this.registrationForm.value.first_name);
    formData.append('last_name', this.registrationForm.value.last_name);
    formData.append('email', this.registrationForm.value.email);
    formData.append('password', this.registrationForm.value.password);
    formData.append('phone_number', this.registrationForm.value.phone_number);
    formData.append('profession', this.registrationForm.value.profession);
    formData.append('name_organization', this.registrationForm.value.name_organization);
    formData.append('nom_entreprise', this.registrationForm.value.nom_entreprise);
    formData.append('secteur_activite', this.registrationForm.value.secteur_activite);
    formData.append('enabled_notifications', this.registrationForm.value.enabled_notifications);
    if (this.selectedFile) {
      formData.append('profile_pic', this.selectedFile, this.selectedFile.name);
    }
    formData.forEach((value, key) => {
      console.log(`${key}: ${value}`);
    });
    this.userService.registerUser(formData).subscribe(
      response => console.log('Utilisateur enregistré', response),
      
      error => console.error('Erreur', error)
    );
    this.router.navigate([`/plateforme-integree/auth`])
    
  }
}



