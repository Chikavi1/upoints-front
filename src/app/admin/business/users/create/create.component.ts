import { CommonModule } from '@angular/common';
import { Component  } from '@angular/core';
import { FormControl, FormGroup,  ReactiveFormsModule, Validators } from '@angular/forms';
import { CrudService } from '../../../../services/crud.service';
import { HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-create',
  standalone: true,
  imports: [ ReactiveFormsModule,HttpClientModule],
  providers: [CrudService],
  templateUrl: './create.component.html',
})
export class CreateComponent  {
  form: FormGroup;

  constructor(private apiService: CrudService) {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{10}$')]),
      birthday: new FormControl('', [Validators.required]),
      gender: new FormControl('', [Validators.required]),
      addVisit: new FormControl(false),
    });
  }

  generatePassword(length: number): string {
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()";
    let password = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      password += charset[randomIndex];
    }
    return password;
  }

  onSubmit() {
    if (this.form.valid) {
     console.log('formulario', this.form.value);

     const generatedPassword = this.generatePassword(8);
      const userData = { ...this.form.value, password: generatedPassword };

      this.createUser(userData);
      
      
    } else {
      this.form.markAsTouched();
      console.log('Formulario inválido');
    }
  }

  createUser(data: any) {
    this.apiService.post('users', data).subscribe({
      next: (data) => {
        console.log('caca', data);
        // Check for 409 (User already exists) and 200 (User created)
        if (data.status === 409) {
          alert('Usuario ya existe');
          return;
        }
  
        if (data.status === 200) {
          console.log('USUARIO creado');
          this.form.reset();
        }
      },
      error: (err) => {
        console.error('Error al crear usuario:', err.message);
        alert('Hubo un error al crear el usuario');
      },
    });
  }
  
  
}