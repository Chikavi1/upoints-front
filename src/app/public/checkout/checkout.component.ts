import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CrudService } from '../../services/crud.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-checkout',
  imports: [HttpClientModule],
  providers: [CrudService],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent {


  constructor(private router: Router,private _api:CrudService) { }


  pay() {

    const data: any = {
      "amount": 100,
      "currency": "ARS",
      "description": "Tarjeta de regalo de Carls jr",
      "source": {
        "object": "card",
        "number": "4242 4242 4242 4242",
        "exp_month": 8,
        "exp_year": 2025,
        "cvc": "314"
      },
      "from": "Luis Rojas",
      "to": "chikavi10@gmail.com",
      "message": "Mensaje de prueba",
    }


    this._api.post('gift-card/pay', data).subscribe((response: any) => {
      
      console.log('respuesta: ', response);

    });


    // this.router.navigate(['/success']);
  }
}
