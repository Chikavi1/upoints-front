import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-show',
 standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './show.component.html',
  styleUrl: './show.component.scss'
})
export class ShowComponent {

  
  giftCardForm: FormGroup;
 
  business: any = [];

  ngOnInit(): void {
    this.business = 
      {
        id: 1,
        name: "Carls JR",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcNNJDHlqAy0b4rk0FMoRqucl0l_HZaZmfWA&s",
      }
    
  }

 
  constructor(private router: Router) {
  this.giftCardForm = new FormGroup({
        amount: new FormControl('', [Validators.required]),
        from: new FormControl('', [Validators.required]),
        to: new FormControl('', [Validators.required, Validators.email]),
        message: new FormControl(''),
        date_delivery: new FormControl(new Date(), [Validators.required]),
        scheduledEmail: new FormControl(false),
      });
  }


  validateInputs() {
    if (!this.giftCardForm.valid) {
      const invalidControls = Object.keys(this.giftCardForm.controls).filter(key => {
        const control = this.giftCardForm.get(key);
        return control?.invalid;
      });

      if (invalidControls.length > 0) {
        const messages = invalidControls.map(key => {
          const control = this.giftCardForm.get(key);
          const errors = control?.errors;
          let message = `${key} es inválido`;
          
          if (errors?.['required']) {
            message += ': es obligatorio.';
          }
          if (errors?.['minlength']) {
            message += `: debe tener al menos ${errors['minlength'].requiredLength} caracteres.`;
          }
          if (errors?.['maxlength']) {
            message += `: no debe exceder ${errors['maxlength'].requiredLength} caracteres.`;
          }
          if (errors?.['email']) {
            message += ': debe ser un correo electrónico válido.';
          }
          
          return message;
        });

        alert(`Errores en el formulario:\n- ${messages.join('\n- ')}`);
      } else {
        alert('Formulario inválido');
      }

      return;
    }
  }

  checkout() {

    this.validateInputs();

    const cartInfo = {
      id: Date.now(), 
      "amount": this.giftCardForm.value.amount,
      "name":   this.giftCardForm.value.from,
      "email": this.giftCardForm.value.to,
      "message": this.giftCardForm.value.message,
      "date_delivery": this.giftCardForm.value.date_delivery,
      "image": this.images[this.currentImageIndex],
      "business_id": this.business.id
    }

    const existingCart = JSON.parse(localStorage.getItem('cartInfo') || '[]');

    localStorage.setItem('cartInfo', JSON.stringify(cartInfo));
    existingCart.push(cartInfo);
    localStorage.setItem('cartInfo', JSON.stringify(existingCart));

    this.router.navigate(['/checkout']);
  }

   allowOnlyNumbers(event: KeyboardEvent): void {
    const isNumber = /^[0-9]$/.test(event.key);  
    if (!isNumber) {
      event.preventDefault();  
    }
   }
  
   images: string[] = [
    'https://qa-content-s3.launchgiftcards.com/images/51a44a86-2c42-11ec-8d3d-0242ac130003/Marc_Fireworks_Shadow_01.gif',
    'https://qa-content-s3.launchgiftcards.com/images/51a44a86-2c42-11ec-8d3d-0242ac130003/Marc_Dinner_Shadow_01.gif',
    'https://content-s3.launchgiftcards.com/images/03E1B452-05F5-4185-861D-DB297717B079/Ciara_Interior_Belo_Shadow_01.gif'
  ];
  currentImageIndex = 0;

  prevImage() {
    this.currentImageIndex =
      (this.currentImageIndex - 1 + this.images.length) % this.images.length;
  }

  nextImage() {
    this.currentImageIndex =
      (this.currentImageIndex + 1) % this.images.length;
  }

}
