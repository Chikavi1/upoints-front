import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [ CommonModule,FormsModule ],
  templateUrl: './create.component.html',
})
export class CreateComponent {
  user = {
    name: '',
    email: ''
  };

  openModal() {
    const modal = document.getElementById('userModal');
    if (modal) modal.classList.remove('hidden');
  }

  closeModal() {
    const modal = document.getElementById('userModal');
    if (modal) modal.classList.add('hidden');
  }

  createUser() {
    console.log('Usuario creado:', this.user);
    this.closeModal();
  }
}