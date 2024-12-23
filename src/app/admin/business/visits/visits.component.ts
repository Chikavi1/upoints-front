import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
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

  constructor(private crudService: CrudService,private router: Router) {}

  ngOnInit() {
    this.fetchVisits(this.currentPage);
  }

  fetchVisits(page: number) {
  const params = { page: page.toString(), limit: this.itemsPerPage.toString() };
  this.crudService.get('visits', { params }).subscribe((response: any) => {
    console.log(response);
    this.visits = response.data;
    this.totalItems = response.pagination.totalItems;
    this.currentPage = response.pagination.currentPage;
  });
}

  
  seeProfile() {
    this.router.navigate(['profile']);
  }
  
  previoussarch() {
    this.fetchVisits(this.currentPage - 1);
  }

  nextSearch() {
    this.fetchVisits(this.currentPage + 1);
  }
  
  // Cambiar de página
  changePage(page: number) {
    this.fetchVisits(page);
  }
}