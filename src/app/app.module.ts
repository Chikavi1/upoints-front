import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
 import { AppRoutingModule } from './app-routing.module'; // Importa el módulo de rutas

import { HttpClientModule, provideHttpClient } from '@angular/common/http';

@NgModule({
  declarations: [
    
  ],
  imports: [
    
    BrowserModule,       
    HttpClientModule,       
    AppRoutingModule,     
  ],
  providers: [provideHttpClient()],
  bootstrap: []       // Componente raíz que se carga primero
})
export class AppModule { }
