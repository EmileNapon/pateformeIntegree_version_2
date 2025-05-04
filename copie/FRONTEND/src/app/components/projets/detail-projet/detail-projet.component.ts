import { Component, OnInit } from '@angular/core';
import { ProjetService } from '../services/services.service';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../utilisateurs/service/service';
import { PartenaireService } from '../../partenaires/services/services';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-detail-projet',
  imports: [CommonModule],
  templateUrl: './detail-projet.component.html',
  styleUrl: './detail-projet.component.css'
})
export class DetailProjetComponent implements OnInit {
  projet: any
  detailsProjet:any
  autorite:any[]=[]
  prestataire: any[]=[]
  Localisation: any
  partenaire:any[]=[]
  ActeursImpliques:any
  ActeursImpliquesList:any[]=[]
  id!:number
  filtrePrestataires:any=[]  
  filtrePartenaire:any[]=[]
  filtreAutorites:any[]=[]
constructor(private projetService: ProjetService,  private route: ActivatedRoute,
  private userService: UserService, private partenaireService: PartenaireService){}

ngOnInit(): void {
  this.id = Number(this.route.snapshot.paramMap.get('id'));
  this.loadProject()
  
 this.loadPrestatairesProjet()

  
  
  
}


loadProject(): void {
  this.projetService.getProjetById(this.id).subscribe(data => {
    this.projet = data;
    this.loadDetailsProjet()
    console.log('projet ', this.projet)
  });
}

loadDetailsProjet(): void {
  console.log('nnnnnnnnnn')
  this.projetService.getDetailsProjetsById(this.id).subscribe(data => {
    this.detailsProjet = data;
    this.loadLocalisationProjet()
    console.log('detailsProjet ', this.detailsProjet)
  });
}

// loadAutoritesProjet(): void {
//   this.userService.getAutorite().subscribe(data => {
//     this.autorite = data;
//     this.filtreAutorites = this.autorite.filter(a => a.id == this.id);
//     console.log('autorite ', this.autorite)
//   });
// }

loadPrestatairesProjet(): void {
  this.userService.getPrestataires().subscribe(data => {
    this.prestataire = data;
    this.filtrePrestataires = this.prestataire.filter(p => p.id == this.id);
    console.log('filtrePrestataires ', this.prestataire)
  });
}

loadLocalisationProjet(): void {
  this.projetService.getProjetsLocalisationById(this.id).subscribe(data => {
    this.Localisation = data;
    console.log('Localisation ', this.Localisation)
    this.loadActeursImpliquesList()
  });
}



loadActeursImpliquesList(): void {
  this.userService.getProjetsActeurs().subscribe(data => {
    this.ActeursImpliquesList = data;
    this.getPartenaireList()
  });
}

getPartenaireList() {
  this.partenaireService.getProjetsPartenaire().subscribe(data => {
    this.partenaire = data;
    console.log('partenaire//',this.partenaire)
    console.log('ActeursImpliquesList//',this.ActeursImpliquesList)
    this.filtrePartenaire = this.partenaire.filter(p => this.ActeursImpliquesList.some(acteur => acteur.partenaire == p.id));
    console.log('filtrePartenaire//',this.filtrePartenaire)

  });
}


getStatutClass(statut: string): string {
  switch (statut) {
    case 'en_cours': return 'badge bg-primary';
    case 'termine': return 'badge bg-success';
    case 'planifie': return 'badge bg-info';
    case 'attente_financement': return 'badge bg-warning';
    default: return 'badge bg-secondary';
  }
}

}











