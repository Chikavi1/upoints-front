import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-redeem',
  imports: [CommonModule,FormsModule],
  standalone:true,
  templateUrl: './redeem.component.html',
  styleUrl: './redeem.component.scss'
})
export class RedeemComponent {
  query: any;
  IsSearched: any;

  returnToSearch() {
    
  }

  search() {
    
  }

  redeem() {
    
  }
}
