import { Component, createComponent } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CreateComponent } from './create/create.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule, CreateComponent],
  templateUrl: './users.component.html',
})
export class UsersComponent {
  users = [
    { id: 1, name: 'Usuario 1' },
    { id: 2, name: 'Usuario 2' },
  ];


  openModal() {
    const modal = document.getElementById('userModal');
    if (modal) modal.classList.remove('hidden');
  }

  closeModal() {
    const modal = document.getElementById('userModal');
    if (modal) modal.classList.add('hidden');
  }

  user = {
    name: '',
    email: ''
  };

  createUser() {
    console.log('Usuario creado:', this.user);
    this.closeModal();
  }
 
}
