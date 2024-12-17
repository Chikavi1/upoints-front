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
    console.log(this.register.value)

    if (this.register.valid) {
      console.log('Form data:', this.register.value);

      this._api.post('users', this.register.value).subscribe(data => {
        console.log(data);
        
      })

    } else {
      const invalidControls = this.findInvalidControls();
      alert(`Los siguientes campos son inválidos: ${invalidControls.join(', ')}`);
    }
  }

  setUser(){
    localStorage.setItem('auth','true');
    this.router.navigate(['/admin']);

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
