import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { User } from '../../../../models/user';
import { ListCitoyenService } from './service/list-citoyen-service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-list-citoyen',
    templateUrl: './list-citoyen.component.html',
    styleUrls: ['./list-citoyen.component.css'],
    standalone: true,
    imports:[CommonModule, FormsModule]
})
export class ListCitoyenComponent implements OnInit{
 
  searchTerm: string = '';
  sortOrder: string = '';
  citizensActifs:number=0
  citizensNotActifs:number=0
  citoyens: User[] = [];
  loading:boolean=false

  id=1

  page: number = 1; // Current page
  size: number = 5; // Default items per page
  sizeOptions: number[] = [5, 10, 20, 100]; // Page size options
  totalPages: number = 0; // Total number of pages
  paginateCitoyens: any[] = []; // Paginated apprenants for display

  constructor(private listCitoyenService:ListCitoyenService,  private router:Router ) { }

  ngOnInit():void{ 
    this.loadCitoyens()
  }

  // loadCitoyens(): void {
  //   this.loading = true;
  //   this.listCitoyenService.getCitoyens().subscribe((data: any[]) => {
  //     this.citoyens = data;
  //     this.totalPages = Math.ceil(this.citoyens.length / this.size);
  //     this.updatePaginatCitoyens();
  //     this.loading = false;
  //   }, () => {
  //     this.loading = false;
  //   });
  // }



  loadCitoyens(): void {
    this.loading = true;
    const filters: any = { role: 'citizen' };
  
    if (this.searchTerm) filters.search = this.searchTerm;
    if (this.sortOrder) filters.ordering = this.sortOrder;
  
    this.listCitoyenService.getCitoyens(filters).subscribe((data: any[]) => {
      this.citoyens = data;
      this.totalPages = Math.ceil(this.citoyens.length / this.size);
      this.updatePaginatCitoyens();
  
      // ✅ Recalcul des totaux visibles
      this.citizensActifs = this.citoyens.filter(a => a.is_active).length;
      this.citizensNotActifs = this.citoyens.filter(a => !a.is_active).length;
  
      this.loading = false;
    }, () => {
      this.loading = false;
    });
  }

  updatePaginatCitoyens(): void {
    const startIndex = (this.page - 1) * this.size;
    const endIndex = startIndex + this.size;
    this.paginateCitoyens = this.citoyens.slice(startIndex, endIndex);
  }

  nextPage(): void {
    if (this.page < this.totalPages) {
      this.page++;
      this.updatePaginatCitoyens();
    }
  }

  prevPage(): void {
    if (this.page > 1) {
      this.page--;
      this.updatePaginatCitoyens();
    }
  }

  changePageSize(newSize: number): void {
    if (this.sizeOptions.includes(newSize)) {
      this.size = newSize;
      this.page = 1; // Reset to first page
      this.totalPages = Math.ceil(this.citoyens.length / this.size);
      this.updatePaginatCitoyens();
    }
  }

  onPageSizeChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const newSize = parseInt(selectElement.value, 10);
    this.changePageSize(newSize);
  }


  onDeleteCitoyen(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet apprenant ?')) {
      this.listCitoyenService.deleteCitoyens(id).subscribe(() => {
        this.paginateCitoyens = this.paginateCitoyens.filter(apprenant => apprenant.id !== id);
        this.totalPages = Math.ceil(this.paginateCitoyens.length / this.size);
        this.page = Math.min(this.page, this.totalPages || 1);
        this.updatePaginatCitoyens();
        this.loadCitoyens()
      });
    }
  }

  allerDetail(apprenantId:number):void{
    this.router.navigate([`/plateforme-integree/detail-citoyen/${apprenantId}`])
    console.log(';;;;;;;;;;;;;;;;;;;;;;;;;;;;')
  }
  allerEdit(updateApprenantId:number):void{
    this.router.navigate([`/admin/apprenants/${updateApprenantId}/update/`])
  }




}
