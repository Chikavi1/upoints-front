import { Component, CUSTOM_ELEMENTS_SCHEMA, HostListener } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-layout',
  imports: [ 
  RouterModule
  ],
   schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {

  @HostListener('window:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.altKey && event.key === 'c') {
      event.preventDefault(); // Previene el comportamiento por defecto del navegador
      this.saveAction();
    }
  }

  constructor(private router:Router) {
    
  }

  saveAction() {
    console.log('Acción de guardar ejecutada');
    // Implementa tu lógica aquí
  }


  logout() {
    this.router.navigate(['/']);

  }
}
