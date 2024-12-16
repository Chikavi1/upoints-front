import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CrudService } from '../../../services/crud.service';
import { HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-visits',
  imports: [CommonModule, RouterLink, HttpClientModule],
  providers: [CrudService],
  templateUrl: './visits.component.html',
  styleUrl: './visits.component.scss'
})
export class VisitsComponent implements OnInit {
  visits: any[] = [];
  totalItems: number = 0; // Total de elementos
  currentPage: number = 1; // Página actual
  itemsPerPage: number = 10; // Elementos por página

  constructor(private crudService: CrudService) {}

  ngOnInit() {
    this.fetchVisits(this.currentPage);
  }

  fetchVisits(page: number) {
    const caca = { page: page.toString(), limit: this.itemsPerPage.toString() };
    this.crudService.get('visits', ).subscribe((response: any) => {
      this.visits = response.data;
      this.totalItems = response.pagination.totalItems;
      this.currentPage = response.pagination.currentPage;
    });
  }

  // Cambiar de página
  changePage(page: number) {
    this.fetchVisits(page);
  }
}