import { Component } from '@angular/core';
import { FormBuilder, FormGroup,   ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CrudService } from '../../../../services/crud.service';
import { HttpClientModule } from '@angular/common/http';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create',
  imports: [RouterModule,CommonModule, ReactiveFormsModule, HttpClientModule],
  providers: [CrudService],
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss'
})
export class CreateComponent {
  form: FormGroup;
  minDate: string;
  
  onSubmit() {
    if (this.form.valid) {
      
      const formData = { ...this.form.value };
      delete formData.scheduledEmail;
 
      this._api.post('gift-card',formData).subscribe(data => {
        console.log(data);
        this.showSuccess();

      })

    } else {
      const invalidControls = this.findInvalidControls();
      alert(`Los siguientes campos son inválidos: ${invalidControls.join(', ')}`);
    }
  }

  allowOnlyNumbers(event: KeyboardEvent): void {
  const isNumber = /^[0-9]$/.test(event.key); // Verifica si es un número
  if (!isNumber) {
    event.preventDefault(); // Bloquea cualquier entrada que no sea un número
  }
}

   showSuccess() {
    Swal.fire({
      title: '¡Éxito!',
      text: 'Operación realizada correctamente.',
      icon: 'success',
      confirmButtonText: 'OK',
    }).then(() => {

       this.router.navigate(['admin/business/gift-cards']);   
    });
  }



  constructor(private fb: FormBuilder,private router: Router, private _api:CrudService) {
    const today = new Date().toISOString().split('T')[0];
    this.minDate = today

    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      amount: ['', [Validators.required]],
      message: ['', [Validators.required]],
      scheduledEmail: [false, [Validators.required]],
      date_delivery: [today, [Validators.required]],
    });

  }


  findInvalidControls(): string[] {
    const invalidControls: string[] = [];
    const controls = this.form.controls;
  
    for (const name in controls) {
      if (controls[name].invalid) {
        invalidControls.push(name);  
      }
    }
  
    return invalidControls;
  }

}
