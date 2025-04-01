import { DeleteAutoriteComponent } from './components/utilisateurs/autorites/delete-autorite/delete-autorite.component';
import { Component, NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CreateAutoriteComponent } from './components/utilisateurs/autorites/create-autorite/create-autorite.component';
import { EditAutoriteComponent } from './components/utilisateurs/autorites/edit-autorit/edit-autorite.component';
import { DetailAutoriteComponent } from './components/utilisateurs/autorites/detail-autorite/detail-autorite.component';
import { CreateCitoyenComponent } from './components/utilisateurs/citoyens/create-citoyen/create-citoyen.component';
import { DeleteCitoyenComponent } from './components/utilisateurs/citoyens/delete-citoyen/delete-citoyen.component';
import { EditCitoyenComponent } from './components/utilisateurs/citoyens/edit-citoyen/edit-citoyencomponent';
import { DetailCitoyenComponent } from './components/utilisateurs/citoyens/detail-citoyen/detail-citoyen.component';
import { CreatePrestataireComponent } from './components/utilisateurs/prestataires/create-prestataire/create-prestataire.component';
import { DeletePrestataireComponent } from './components/utilisateurs/prestataires/delete-prestataire/delete-prestataire.component';
import { EditPrestataireComponent } from './components/utilisateurs/prestataires/edit-prestataire/edit-prestataire.component';
import { DetailPrestataireComponent } from './components/utilisateurs/prestataires/detail-prestataire/detail-prestataire.component';
import { ListAutoriteComponent } from './components/utilisateurs/autorites/list-autorites/list-authorite.component';
import { ListCitoyenComponent } from './components/utilisateurs/citoyens/list-citoyen/list-citoyen.component';
import { ListPrestataireComponent } from './components/utilisateurs/prestataires/list-prestataire/list-prestataire.component';
import { AppComponent } from './app.component';
import { ConnexionComponent } from './components/auth/connexion/connexion.component';
import { InscriptionComponent } from './components/auth/inscription/inscription.component';
import { HomeComponent } from './components/home/home.component';
import { AdminDashboardComponent } from './components/dashboard/admin-dashboard/admin-dashboard.component';
import { AutoriteDashboardComponent } from './components/dashboard/autorite-dashboard/autorite-dashboard.component';
import { PrestataireDashboardComponent } from './components/dashboard/prestataire-dashboard/prestataire-dashboard.component';
import { ListProjetsComponent } from './components/projets/list-projets/list-projets.component';
import { DetailProjetComponent } from './components/projets/detail-projet/detail-projet.component';
import { DeleteProjetComponent } from './components/projets/delete-projet/delete-projet.component';
import { CreateProjetComponent } from './components/projets/create-projet/create-projet.component';
import { EditProjetComponent } from './components/projets/edit-projet/edit-projet.component';




const routes: Routes = [
      

  
  {path : 'plateforme-integree', component:AppComponent, children:[
  {path : 'home', component:HomeComponent},
  {path : 'auth', component:ConnexionComponent},
  {path : 'sign', component:InscriptionComponent},


  
  {path : 'dashboard-autorite', component:AutoriteDashboardComponent},
  {path : 'dashboard-prestataire', component:PrestataireDashboardComponent},
   
 {path : 'list-citoyens', component:ListCitoyenComponent},
  {path : 'create-citoyen', component:CreateCitoyenComponent},
  {path : 'delete-citoyen', component:DeleteCitoyenComponent},
  {path : 'edit-citoyen', component:EditCitoyenComponent},
  {path : 'detail-citoyen', component:DetailCitoyenComponent},

  {path : 'list-prestataires', component:ListPrestataireComponent},
  {path : 'create-prestataire', component:CreatePrestataireComponent},
  {path : 'delete-prestataire', component:DeletePrestataireComponent},
  {path : 'edit-prestataire', component:EditPrestataireComponent},
  {path : 'detail-prestataire', component:DetailPrestataireComponent},


  {path : 'list-autorites', component:ListAutoriteComponent},
  {path : 'create-autorite', component:CreateAutoriteComponent},
  {path : 'delete-autorite', component:DeleteAutoriteComponent},
  {path: 'autorites/:updateAutorite/update', component: EditAutoriteComponent},
  {path : 'detail-autorite', component:DetailAutoriteComponent},


  {path : 'list-projets', component:ListProjetsComponent},
  {path : 'create-projet', component:CreateProjetComponent},
  {path : 'delete-projet', component:DeleteProjetComponent},
  {path: 'projet/:updateprojet/update', component: EditProjetComponent},
  {path : 'detail-projet', component:DetailProjetComponent},

  {path : 'dashboard-admin', component:AdminDashboardComponent}
  


  

  ]},


  

];




@NgModule({
  imports: [RouterModule.forRoot(routes), RouterModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
