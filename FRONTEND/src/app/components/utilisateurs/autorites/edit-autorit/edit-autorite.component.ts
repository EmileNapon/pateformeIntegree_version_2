import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EditAutoriteService } from './service/edit-autorite.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-edit-authority',
    templateUrl: './edit-autorite.component.html',
    styleUrls: ['./edit-autorite.component.css'],
    standalone: true,
    imports: [ReactiveFormsModule]
})
export class EditAutoriteComponent implements OnInit{

  
  autoriteForm: FormGroup;
  autoriteId!: number;

  autoriteEdit:any=''

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private editApprenantsService :EditAutoriteService 
  ) 
  {
    this.autoriteForm = this.formBuilder.group({
      name_organization: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone_number: ['', Validators.required],
      enabled_notifications: ['', Validators.required],
      role: ['autority', Validators.required],

    });
  }

  ngOnInit(): void {
    this.autoriteId = this.route.snapshot.params['updateAutorite'];
    this.LoadAutoriteEdit();
  
  }

  LoadAutoriteEdit():void{
    this.editApprenantsService.getAutoriteById(this.autoriteId).subscribe((data) => {
      this.autoriteEdit = data;
      this.filtreLoadAutorite()
    });
  }
  filtreLoadAutorite():void{
      this.autoriteForm.patchValue({
        name_organization: this.autoriteEdit.name_organization,
        email: this.autoriteEdit.email,
        phone_number: this.autoriteEdit.phone_number,
        enabled_notifications: this.autoriteEdit.enabled_notifications,
        role: 'autority',
      });
    
  }
  updateAutorite(): void {
    if (this.autoriteForm.valid) {
    const formData = new FormData();
    formData.append('name_organization', this.autoriteForm.value.name_organization);
    formData.append('email', this.autoriteForm.value.email);
    formData.append('phone_number', this.autoriteForm.value.phone_number);
    formData.append('enabled_notifications', this.autoriteForm.value.enabled_notifications);
    formData.append('role', this.autoriteForm.value.role);
    formData.forEach((value, key) => {
      console.log(`${key}: ${value}`);
    });
    
      this.editApprenantsService.updateAutoritet(this.autoriteId, this.autoriteForm.value).subscribe(() => {
        this.router.navigate(['/plateforme-integree/dashboard-admin/list-autorites']);
      });
    }
  }


  
}
