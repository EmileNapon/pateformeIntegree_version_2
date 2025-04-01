import { Component, OnInit } from '@angular/core';
import { ListAutoriteService } from './service/list-autorite-service';
import { Router } from '@angular/router';
import { User } from '../../../../models/user';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-list-authorite',
    standalone: true,
    imports:[CommonModule],
    templateUrl: './list-authorite.component.html',
    styleUrls: ['./list-authorite.component.css'],

})
export class ListAutoriteComponent implements OnInit {



  autorite: User[] = [];
  loading:boolean=false

  page: number = 1; // Current page
  size: number = 5; // Default items per page
  sizeOptions: number[] = [5, 10, 20, 100]; // Page size options
  totalPages: number = 0; // Total number of pages
  paginateAutorites: any[] = []; // Paginated apprenants for display

  constructor(private listAutoriteService:ListAutoriteService,  private route:Router ) { }

  ngOnInit():void{ 
    this.loadAutorite()
  }

  loadAutorite(): void {
    this.loading = true;
    this.listAutoriteService.getAutorite().subscribe((data: any[]) => {
      this.autorite = data;
      this.totalPages = Math.ceil(this.autorite.length / this.size);
      this.updatePaginateAutorites();
      this.loading = false;
    }, () => {
      this.loading = false;
    });
  }

  updatePaginateAutorites(): void {
    const startIndex = (this.page - 1) * this.size;
    const endIndex = startIndex + this.size;
    this.paginateAutorites = this.autorite.slice(startIndex, endIndex);
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
      this.totalPages = Math.ceil(this.autorite.length / this.size);
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
  onDeleteApprenant(updateApprenantId:number):void{
    this.route.navigate([`/plateforme-integree/apprenants/${updateApprenantId}/update/`])
  }

}
