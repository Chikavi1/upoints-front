import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
})
export class EditComponent {
  isOpen = false;
  @Input() user: any;
  @Output() userEdited = new EventEmitter<any>();

  open(user: any) {
    this.user = { ...user }; // Clonar el usuario para no modificarlo directamente
    this.isOpen = true;
  }

  close() {
    this.isOpen = false;
  }

  save() {
    this.userEdited.emit(this.user);
    this.close();
  }
}
