import { AfterViewInit, Component } from '@angular/core';
import { Router } from '@angular/router';
import { CrudService } from '../../services/crud.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
declare var Stripe: any;

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,HttpClientModule],
  providers: [CrudService],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent implements AfterViewInit  {

  private stripe: any; 
  private card: any;   

  carts: any = [];
  checkoutForm: FormGroup;
  total = 0;
  pending = false;

 
  constructor(private router: Router, private _api: CrudService) { 
    this.updateCart();

    this.checkoutForm = new FormGroup({
        email: new FormControl('', [Validators.required]),
        full_name: new FormControl('', [Validators.required]),
      });

  }

   ngAfterViewInit() {
     this.stripe = Stripe('pk_test_51QUyNoDU5nT1bn5nKumCvFFE1JfrFdUY8ZJtItM1EM4fJ51OLKDAj7M7rGFEmRr92eJHhS5QCgVhb52zy4vlJd0q00zrpkChdf');  
     const elements = this.stripe.elements();

     this.card = elements.create('card', {
      style: {
        base: {
          color: '#ffff',
          fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
          fontSmoothing: 'antialiased',
          fontSize: '16px',
          '::placeholder': {
            color: '#ffff',
            content: 'Número de tarjeta' 
          }
        },
        invalid: {
          color: '#fa755a',
          iconColor: '#fa755a'
        }
      },
      hidePostalCode: true,
      
      placeholder: 'Número de tarjeta'
    });
     
    this.card.mount('#card-element');
  }


  async processPayment() {

    if (this.checkoutForm.invalid) {
      return;
    }

    this.pending = true;

    try {
      const { token, error } = await this.stripe.createToken(this.card);
      if (error) {
        console.error('Error al crear el token:', error.message);
        return;
      }

      this.pay(token.id);

    } catch (error) {
      console.error('Error al procesar el pago:', error);
    }
  }


  removeFromCart(itemId: number) { 
    const existingCart = JSON.parse(localStorage.getItem('cartInfo') || '[]');
    const updatedCart = existingCart.filter((item: any) => item.id !== itemId);
    localStorage.setItem('cartInfo', JSON.stringify(updatedCart));
    this.updateCart();
  }

  updateCart() {
    this.carts = JSON.parse(localStorage.getItem('cartInfo') || '[]');
    this.setTotal();
  }


  setTotal() {
    this.total = 0;
    this.carts.forEach((item: any) => {
      this.total += parseInt(item.amount);
      
    });
  }
  clear() {
    localStorage.removeItem('cartInfo');
  }
   

  pay(token: string) {
    this.carts.forEach((cart:any)=> delete cart.id);
        const data: any = {
          "total": this.total,
          "currency": "MXN",
          "email":  this.checkoutForm.value.email,
          "token": token,
          "items": this.carts
        }
        
    this._api.post('gift-card/pay', data).subscribe((response: any) => {
      console.log('respuesta: ', response);
      if (response.success) {
        this.pending = false;
        this.clear();
        this.router.navigate(['/payment-status']);
      }
    }, err => {
      this.pending = false;
    });



  }
}
