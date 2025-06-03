import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../../../models/user';
import { CommonModule } from '@angular/common';
import { UserService } from '../../service/service';

import { FormsModule } from '@angular/forms';
import { ListAutoriteService } from './service/list-citoyen-service';

@Component({
    selector: 'app-list-authorite',
    standalone: true,
    imports:[CommonModule, FormsModule],
    templateUrl: './list-authorite.component.html',
    styleUrls: ['./list-authorite.component.css'],

})
export class ListAutoriteComponent implements OnInit {


  searchTerm: string = '';
  sortOrder: string = '';
  autoritesActifs:number=0
  autoritesNotActifs:number=0

  autorites: User[] = [];
  loading:boolean=false

  page: number = 1; // Current page
  size: number = 5; // Default items per page
  sizeOptions: number[] = [5, 10, 20, 100]; // Page size options
  totalPages: number = 0; // Total number of pages
  paginateAutorites: any[] = []; // Paginated apprenants for display

  constructor(private listAutoriteService:ListAutoriteService,  private route:Router ) { }

  ngOnInit():void{ 
    this.loadAutorites()
  }

  // loadAutorite(): void {
  //   this.loading = true;
  //   this.userService.getAutorite().subscribe((data: any[]) => {
  //     this.autorite = data;
  //     this.totalPages = Math.ceil(this.autorite.length / this.size);
  //     this.updatePaginateAutorites();
  //     this.loading = false;
  //   }, () => {
  //     this.loading = false;
  //   });
  // }

  loadAutorites(): void {
    this.loading = true;
    const filters: any = { role: 'autority' };
  
    if (this.searchTerm) filters.search = this.searchTerm;
    if (this.sortOrder) filters.ordering = this.sortOrder;
  
    this.listAutoriteService.getAutorites(filters).subscribe((data: any[]) => {
      this.autorites = data;
      console.log('listes de autorite',this.autorites)
      this.totalPages = Math.ceil(this.autorites.length / this.size);
      this.updatePaginateAutorites();
  
      // ✅ Recalcul des totaux visibles
      this.autoritesActifs = this.autorites.filter(a => a.is_active).length;
      this.autoritesNotActifs = this.autorites.filter(a => !a.is_active).length;
  
      this.loading = false;
    }, () => {
      this.loading = false;
    });
  }


  updatePaginateAutorites(): void {
    const startIndex = (this.page - 1) * this.size;
    const endIndex = startIndex + this.size;
    this.paginateAutorites = this.autorites.slice(startIndex, endIndex);
  }

  nextPage(): void {
    if (this.page < this.totalPages) {
      this.page++;
      this.updatePaginateAutorites();
    }
  }

  prevPage(): void {
    if (this.page > 1) {
      this.page--;
      this.updatePaginateAutorites();
    }
  }

  changePageSize(newSize: number): void {
    if (this.sizeOptions.includes(newSize)) {
      this.size = newSize;
      this.page = 1; // Reset to first page
      this.totalPages = Math.ceil(this.autorites.length / this.size);
      this.updatePaginateAutorites();
    }
  }

  onPageSizeChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const newSize = parseInt(selectElement.value, 10);
    this.changePageSize(newSize);
  }




  allerDetail(apprenantId:number):void{
    this.route.navigate([`/admin/apprenants/${apprenantId}/detail/`])
  }
  allerEdit(updateApprenantId:number):void{
    this.route.navigate([`/plateforme-integree/autorites/${updateApprenantId}/update`])
  }

  onDeleteAutorite(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet apprenant ?')) {
      this.listAutoriteService.deleteAutorite(id).subscribe(() => {
        this.paginateAutorites = this.paginateAutorites.filter(autorite => autorite.id !== id);
        this.totalPages = Math.ceil(this.paginateAutorites.length / this.size);
        this.page = Math.min(this.page, this.totalPages || 1);
        this.updatePaginateAutorites();
        this.loadAutorites()
      });
    }
  }

}
