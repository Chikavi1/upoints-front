import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CrudService } from '../../../services/crud.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-gift-cards',
  imports: [CommonModule,RouterModule,HttpClientModule],
  standalone: true,
  providers: [CrudService],
  templateUrl: './gift-cards.component.html',
  styleUrl: './gift-cards.component.scss'
})
export class GiftCardsComponent {
  giftCards: any = []
  totalItems: number = 0;  
  currentPage: number = 1;  
  itemsPerPage: number = 10; 

  constructor(private _api: CrudService) {
        this.fetchVisits(this.currentPage);
      }
      
  fetchVisits(page: number) {
    const params = { page: page.toString(), limit: this.itemsPerPage.toString() };

    this._api.get('gift-card', { params }).subscribe((response: any) => {
       this.giftCards = response.data;
      this.totalItems = response.pagination.totalItems;
      this.currentPage = response.pagination.currentPage;
    });
  }

  previoussearch() {
    this.fetchVisits(this.currentPage - 1);
  }

  onSearch(query: string): void {
    const trimmedQuery = query.trim();
    if (trimmedQuery) {
      console.log(`Buscando: ${trimmedQuery}`);
      this.seachQuery(trimmedQuery);
    } else {
      console.log('Por favor, introduce un término de búsqueda.');
    }
  }

  seachQuery(query: string) {
    this._api.get(`gift-card/search?query=${query}`).subscribe((data: any) => {
      console.log(data);
      this.giftCards = data;
    });
  }

  nextSearch() {
    this.fetchVisits(this.currentPage + 1);
  }
  
}

