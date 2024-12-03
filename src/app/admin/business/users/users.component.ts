import { Component, createComponent } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CreateComponent } from './create/create.component';
import { CommonModule } from '@angular/common';
import { User } from '../../../interfaces/User.interface';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule, CreateComponent],
  templateUrl: './users.component.html',
})
export class UsersComponent {
  users: User[] =
    [
      {
        id: 1,
        name: 'Usuario 1',
        email: 'Lb5Jw@example.com',
        phone: '1234567890',
        birthday: new Date('1990-01-01'),
      },
      {
        id: 1,
        name: 'Usuario 2',
        email: 'Lb5Jw@example.com',
        phone: '1234567890',
        birthday: new Date('1990-01-01'),
      }
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
