import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, HostListener } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-layout',
  imports: [ 
    CommonModule,
  RouterModule
  ],
   schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {

  isMenuOpen: boolean = false;
  screenLarge = false;

    toggleMenu() {
        this.isMenuOpen = !this.isMenuOpen;
    }
  
  @HostListener('window:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.altKey && event.key === 'c') {
      event.preventDefault(); // Previene el comportamiento por defecto del navegador
      this.saveAction();
    }
  }

  constructor(private router:Router) {
    this.updateScreenSize();
  }


  closeMenu() {
    if (!this.screenLarge) {
      this.isMenuOpen = false;
    }
  }

  saveAction() {
    console.log('Acción de guardar ejecutada');
  }


  logout() {
    this.router.navigate(['/']);
  }

  @HostListener('window:resize', [])
  onResize() {
    this.updateScreenSize();
  }

  updateScreenSize() {
    this.screenLarge = window.innerWidth >= 768;
    if (this.screenLarge) {
      this.isMenuOpen = true; // Mantén abierto el menú en pantallas grandes
    }
  }
}
