import { Component, OnInit } from '@angular/core';
import { User } from '../../../../models/user';
import { DetailCitoyenService } from './service/detail-citoyen-service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
    selector: 'app-detail-citoyen',
    imports: [CommonModule,],
    providers: [DatePipe]  ,
    templateUrl: './detail-citoyen.component.html',
    styleUrls: ['./detail-citoyen.component.css'],
    standalone: true,
    
})
export class DetailCitoyenComponent implements OnInit {
  loading:boolean=false
  citoyen!:User
  citoyenId!:number
  constructor(private detailCitoyenService: DetailCitoyenService, private router:ActivatedRoute, private datePipe: DatePipe){
    
  }


  formatDate(date: string | Date): string {
    return this.datePipe.transform(date, 'MMMM d, y') || '';
  }


  ngOnInit():void{
  this.citoyenId = Number(this.router.snapshot.paramMap.get('id_citoyen'));
   this.loadCitoyenDetail()
  }
  
  loadCitoyenDetail(): void {
    this.loading = true;
    this.detailCitoyenService.getCitoyensById(this.citoyenId).subscribe((data: any) => {
      this.citoyen = data;
      console.log('infos de lui',this.citoyen)
    });
  }
}
