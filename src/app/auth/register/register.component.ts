import { Component } from '@angular/core';
import { FormsModule,FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  imports: [FormsModule,ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  register: FormGroup;

  constructor(private fb: FormBuilder) {
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
    console.log(this.register.value)
    if (this.register.valid) {
      console.log('Form data:', this.register.value);
      alert('Formulario enviado correctamente');
    } else {
      const invalidControls = this.findInvalidControls();
      alert(`Los siguientes campos son inválidos: ${invalidControls.join(', ')}`);
    }
  }
  
  // Método para encontrar los controles inválidos
  findInvalidControls(): string[] {
    const invalidControls: string[] = [];
    const controls = this.register.controls;
  
    for (const name in controls) {
      if (controls[name].invalid) {
        invalidControls.push(name); // Agrega el nombre del control al array si es inválido
      }
    }
  
    return invalidControls;
  }
}
