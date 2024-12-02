import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
    imports: [ FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  constructor(private authService: AuthService, private router: Router) {}


  login(event: Event) {
    event.preventDefault(); // Prevenir el comportamiento predeterminado del formulario

    const user = { username: 'user1', role: 'business', token: 'abc123' };
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('authToken', user.token);

    const userRole = this.authService.getUserRole();
    console.log(userRole)
    if (userRole === 'business') {
        this.router.navigate(['/admin/business']);
    } else if (userRole === 'cliente') {
        this.router.navigate(['/clients/dashboard']);
    }
}

}
