import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() {}

   isLoggedIn(): boolean {
    const token = localStorage.getItem('authToken'); 
    return !!token;  
   }
  
   getUserRole(): string {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user.role || ''; // Por ejemplo, 'admin' o 'cliente'
  }


   

   logout(): void {
    localStorage.removeItem('authToken');
  }
}
