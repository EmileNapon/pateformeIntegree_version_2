import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { User } from '../../../../models/user';
import { Router } from '@angular/router';
import { UserService } from '../../service/service';
import { ListPrestataireService } from './service/list-prestataire-service';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-list-prestataire',
    templateUrl: './list-prestataire.component.html',
    styleUrls: ['./list-prestataire.component.css'],
    standalone: true,
    imports:[CommonModule, FormsModule]
})
export class ListPrestataireComponent implements OnInit{
  

  searchTerm: string = '';
  sortOrder: string = '';
  prestatairesActifs:number=0
  prestatairesNotActifs:number=0
  prestataires: User[] = [];
  loading:boolean=false

  page: number = 1; // Current page
  size: number = 5; // Default items per page
  sizeOptions: number[] = [5, 10, 20, 100]; // Page size options
  totalPages: number = 0; // Total number of pages
  paginatePrestataires: any[] = []; // Paginated apprenants for display

  constructor(private listPrestataireService:ListPrestataireService,  private router:Router ) { }

  ngOnInit():void{ 
    this.loadPrestataires()
  }

  // loadPrestataires(): void {
  //   this.loading = true;
  //   this.userService.getPrestataires().subscribe((data: any[]) => {
  //     this.prestataires = data;
  //     this.totalPages = Math.ceil(this.prestataires.length / this.size);
  //     this.updatePaginateprestataires();
  //     this.loading = false;
  //   }, () => {
  //     this.loading = false;
  //   });
  // }


  loadPrestataires(): void {
    this.loading = true;
    const filters: any = { role: 'supplier' };
  
    if (this.searchTerm) filters.search = this.searchTerm;
    if (this.sortOrder) filters.ordering = this.sortOrder;
  
    this.listPrestataireService.getPrestataire(filters).subscribe((data: any[]) => {
      this.prestataires = data;
      this.totalPages = Math.ceil(this.prestataires.length / this.size);
      this.updatePaginateprestataires();
  
      // ✅ Recalcul des totaux visibles
      this.prestatairesActifs = this.prestataires.filter(a => a.is_active).length;
      this.prestatairesNotActifs = this.prestataires.filter(a => !a.is_active).length;
  
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


  onDeletePrestataire(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet apprenant ?')) {
      this.listPrestataireService.deletePrestataire(id).subscribe(() => {
        this.paginatePrestataires = this.paginatePrestataires.filter(pres => pres.id !== id);
        this.totalPages = Math.ceil(this.paginatePrestataires.length / this.size);
        this.page = Math.min(this.page, this.totalPages || 1);
        this.updatePaginateprestataires();
        this.loadPrestataires()
      });
    }
  }

}
