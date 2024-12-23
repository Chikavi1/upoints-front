import { Component } from '@angular/core';
import { FormBuilder, FormGroup,   ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-create',
  imports: [RouterModule,ReactiveFormsModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss'
})
export class CreateComponent {
  form: FormGroup;

  onSubmit() {
    
  }

  constructor(private fb: FormBuilder) {
    this.form = new FormGroup({});
  }

}
