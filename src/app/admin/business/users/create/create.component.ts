import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [ CommonModule,FormsModule ],
  templateUrl: './create.component.html',
})
export class CreateComponent {
 
 
  @Input() mode: 'create' | 'edit' = 'create'; 
  @Input() data: any = {};  
  @Output() modalClose = new EventEmitter<any>(); 
  @Output() modalSave = new EventEmitter<any>();  

  formData: any = {};  

  ngOnInit(){
    this.formData = { ...this.data };
    
    console.log(this.formData);
    console.log(this.mode);
  }

  closeModal() {
    this.modalClose.emit(null);  
  }

  saveData() {
    this.modalSave.emit(this.formData);  
  }
}