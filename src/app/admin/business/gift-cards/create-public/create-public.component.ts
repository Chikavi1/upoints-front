import { Component } from '@angular/core';
import { CrudService } from '../../../../services/crud.service';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-public',
  imports: [HttpClientModule,ReactiveFormsModule],
  providers: [CrudService],
  templateUrl: './create-public.component.html',
  styleUrl: './create-public.component.scss'
})
export class CreatePublicComponent {
  
  minDate: string = new Date().toISOString().split('T')[0];
  form: any;
  
  onSubmit() {
    console.log('se envia')
  }

   allowOnlyNumbers(event: KeyboardEvent): void {
    const isNumber = /^[0-9]$/.test(event.key);  
    if (!isNumber) {
      event.preventDefault();  
    }
}

}