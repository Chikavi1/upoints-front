import { Component } from '@angular/core';
import { FormsModule,FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CrudService } from '../../services/crud.service';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [FormsModule,ReactiveFormsModule,HttpClientModule],
  providers: [CrudService],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  register: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _api:CrudService) {

    this.register = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.minLength(10)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      birthday:  ['', [Validators.required]],
      gender: ['', [Validators.required]]
    });

  }

  onSubmit() {
  // Obtener los valores del formulario
  const formData = { ...this.register.value };

  // Convertir la fecha del formato 'dd/mm/yyyy' a 'yyyy-mm-dd'
  if (formData.birthday) {
    const [day, month, year] = formData.birthday.split('/');
    formData.birthday = `${year}-${month}-${day}`;
  }

  console.log('Form data:', formData);

  // Validar el formulario
  if (this.register.valid) {
    this._api.post('users', formData).subscribe(
      data => {
        console.log('Respuesta del servidor:', data);
      },
      error => {
        console.error('Error al enviar:', error);
      }
    );
  } else {
    const invalidControls = this.findInvalidControls();
    alert(`Los siguientes campos son inválidos: ${invalidControls.join(', ')}`);
  }
}


  setUser(){
    localStorage.setItem('auth','true');
    this.router.navigate(['/admin']);

  }

   formatDateInput(event: Event): void {
  const input = event.target as HTMLInputElement;
  let value = input.value;

  // Eliminar cualquier carácter que no sea número
  value = value.replace(/\D/g, '');

  // Formatear la fecha automáticamente a dd/mm/yyyy
  if (value.length > 2 && value.length <= 4) {
    value = `${value.slice(0, 2)}/${value.slice(2)}`;
  } else if (value.length > 4) {
    value = `${value.slice(0, 2)}/${value.slice(2, 4)}/${value.slice(4, 8)}`;
  }

  // Limitar la longitud máxima
  if (value.length > 10) {
    value = value.slice(0, 10);
  }

  input.value = value;
}

  
allowOnlyNumbers(event: Event): void {
  const input = event.target as HTMLInputElement;
  input.value = input.value.replace(/\D/g, '');
}
  
  
  // Método para encontrar los controles inválidos
  findInvalidControls(): string[] {
    const invalidControls: string[] = [];
    const controls = this.register.controls;
  
    for (const name in controls) {
      if (controls[name].invalid) {
        invalidControls.push(name);  
      }
    }
  
    return invalidControls;
  }
}
