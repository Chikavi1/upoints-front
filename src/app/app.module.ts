import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component'; // Asegúrate de tener el componente principal
import { AppRoutingModule } from './app-routing.module'; // Importa el módulo de rutas
import { LandingClientComponent } from './landing/landing-client/landing-client.component'; // Tu componente de cliente
import { LandingBusinessComponent } from './landing/landing-business/landing-business.component'; // Tu componente de negocio
import { LoginComponent } from './auth/login/login.component'; // Tu componente de login
import { LayoutComponent } from './admin/layout/layout.component';

@NgModule({
  declarations: [
    
  ],
  imports: [
    BrowserModule,              
    AppRoutingModule,     
  ],
  providers: [],
  bootstrap: []       // Componente raíz que se carga primero
})
export class AppModule { }
