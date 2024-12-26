import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CrudService } from '../../../../services/crud.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [FormsModule,CommonModule,HttpClientModule,],
  providers: [CrudService],
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent {
  query: string = '';
  IsSearched: boolean = false;
  results: any = [];

  constructor(private api: CrudService,private router: Router) {}

  select(result:any){
    console.log(result) 
  }

  showSuccess() {
    Swal.fire({
      title: '¡Éxito!',
      text: 'Operación realizada correctamente.',
      icon: 'success',
      confirmButtonText: 'OK',
    }).then(() => {

      

       this.router.navigate(['admin/business/visits']);  // Aquí '/clientes' es el destino
    });
  }



  selectedResult: any = null;  

   isSelected(result: any): boolean {
    return this.selectedResult === result;
  }

   selectOnly(result: any): void {
    if (this.selectedResult === result) {
      this.selectedResult = null;   
    } else {
      this.selectedResult = result; 
    }
  }

  createVisit() {
    let data = {
        date : new Date(),
        userId: 1,
        businessId: 1,
        points: 1,
        amount: 100
      }
    
 
    
    this.api.post('visits', data).subscribe((response: any) => {
      console.log('respuesta: ',response);

      if (response.status === 200) {
        this.showSuccess();
      }
    });
        
  }
 


  returnToSearch(){
    this.IsSearched = false;
  }

  search() {
    this.api.get(`users/search?query=${this.query}`).subscribe((data: any) => {
      this.results = data;
      this.IsSearched = true;
     },err => {
      console.log(err);
    })
  }
}
