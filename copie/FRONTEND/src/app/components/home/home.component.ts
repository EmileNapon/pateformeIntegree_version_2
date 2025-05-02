import { CommonModule} from '@angular/common';

import { Component} from '@angular/core';
import { NavbarPrincipaleComponent } from '../navbar-principale/navbar-principale.component';



@Component({
  selector: 'app-home',
  standalone:true,
  imports: [ CommonModule,NavbarPrincipaleComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {


}
