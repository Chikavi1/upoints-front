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

    const cartInfo = {
      "amount": 100,
      "from": "Luis Rojas",
      "to": "chikavi10@gmail.com",
      "message": "Mensaje de prueba",
    }

    localStorage.setItem('cartInfo', JSON.stringify(cartInfo));
    this.router.navigate(['/checkout']);
  }

   allowOnlyNumbers(event: KeyboardEvent): void {
    const isNumber = /^[0-9]$/.test(event.key);  
    if (!isNumber) {
      event.preventDefault();  
    }
}

}
