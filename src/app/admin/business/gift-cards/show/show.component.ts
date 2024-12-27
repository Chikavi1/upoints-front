import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-show',
  imports: [],
  templateUrl: './show.component.html',
  styleUrl: './show.component.scss'
})
export class ShowComponent {

  constructor(private router: Router) {}

  checkout() {
    this.router.navigate(['/checkout']);
  }

}
