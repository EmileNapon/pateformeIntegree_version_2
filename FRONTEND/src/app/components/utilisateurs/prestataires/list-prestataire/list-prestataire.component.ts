import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { User } from '../../../../models/user';
import { ListPrestataireService } from './service/list-prestataire-service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-list-prestataire',
    templateUrl: './list-prestataire.component.html',
    styleUrls: ['./list-prestataire.component.css'],
    standalone: true,
    imports:[CommonModule]
})
export class ListPrestataireComponent implements OnInit{
  


  prestataires: User[] = [];
  loading:boolean=false

  page: number = 1; // Current page
  size: number = 5; // Default items per page
  sizeOptions: number[] = [5, 10, 20, 100]; // Page size options
  totalPages: number = 0; // Total number of pages
  paginatePrestataires: any[] = []; // Paginated apprenants for display

  constructor(private listAutoriteService:ListPrestataireService,  private router:Router ) { }

  ngOnInit():void{ 
    this.loadPrestataires()
  }

  loadPrestataires(): void {
    this.loading = true;
    this.listAutoriteService.getPrestataires().subscribe((data: any[]) => {
      this.prestataires = data;
      this.totalPages = Math.ceil(this.prestataires.length / this.size);
      this.updatePaginateprestataires();
      this.loading = false;
    }, () => {
      this.loading = false;
    });
  }

  updatePaginateprestataires(): void {
    const startIndex = (this.page - 1) * this.size;
    const endIndex = startIndex + this.size;
    this.paginatePrestataires = this.prestataires.slice(startIndex, endIndex);
  }

  nextPage(): void {
    if (this.page < this.totalPages) {
      this.page++;
      this.updatePaginateprestataires();
    }
  }

  prevPage(): void {
    if (this.page > 1) {
      this.page--;
      this.updatePaginateprestataires();
    }
  }

  changePageSize(newSize: number): void {
    if (this.sizeOptions.includes(newSize)) {
      this.size = newSize;
      this.page = 1; // Reset to first page
      this.totalPages = Math.ceil(this.prestataires.length / this.size);
      this.updatePaginateprestataires();
    }
  }

  onPageSizeChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const newSize = parseInt(selectElement.value, 10);
    this.changePageSize(newSize);
  }




  allerDetail(apprenantId:number):void{
    this.router.navigate([`/admin/apprenants/${apprenantId}/detail/`])
  }
  allerEdit(updateApprenantId:number):void{
    this.router.navigate([`/admin/apprenants/${updateApprenantId}/update/`])
  }
  onDeleteApprenant(updateApprenantId:number):void{
    this.router.navigate([`/admin/apprenants/${updateApprenantId}/update/`])
  }

}
