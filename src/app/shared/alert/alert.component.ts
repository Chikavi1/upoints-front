import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './alert.component.html',
})
export class AlertComponent {
  @Input() isVisible: boolean = false;
  @Input() message: string = "Hi";
  @Input() closeText: string = "Cancel";
  @Input() doneText: string = "Done";

  @Output() close = new EventEmitter<void>();

  closeModal() {
    this.isVisible = false;
    this.close.emit();
  }

  confirmDeletion() {
    // Lógica para eliminar el producto
    console.log('Producto eliminado');
    this.closeModal();
  }
}