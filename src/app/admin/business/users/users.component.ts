import { Component, createComponent } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { User } from '../../../interfaces/User.interface';
import { CrudService } from '../../../services/crud.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    CommonModule,FormsModule, HttpClientModule],
  providers: [CrudService],
  templateUrl: './users.component.html',
})
export class UsersComponent {
  users: User[] = [];

  constructor(private api: CrudService){
    this.getUsers();
  }

  getUsers() {
  this.api.get('users').subscribe({
    next: (data: any) => {
      console.log(data);
      this.users = data.data;
    },
    error: (err) => {
      console.log(err);
    },
    complete: () => {
      console.log('Request completed');
    }
  });
}
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
