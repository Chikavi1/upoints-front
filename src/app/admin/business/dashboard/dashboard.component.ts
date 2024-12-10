import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { BrowserQRCodeReader, IScannerControls } from '@zxing/browser';
import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import { RouterModule } from '@angular/router';


registerLocaleData(localeEs, 'es');

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule,RouterModule],
  providers: [{ provide: LOCALE_ID, useValue: 'es' }],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
@ViewChild('videoElement') videoElement!: ElementRef<HTMLVideoElement>;
  result: string | undefined;
  private scannerControls: IScannerControls | undefined;

  today;

  constructor() { 
    this.today = new Date();
  }
  

  async scanQRCode() {
    try {
      const videoInputDevices = await BrowserQRCodeReader.listVideoInputDevices();

      if (videoInputDevices.length === 0) {
        console.error('No se encontraron dispositivos de video.');
        return;
      }

      const selectedDeviceId = videoInputDevices[0].deviceId; // Usamos la primera cámara
      const codeReader = new BrowserQRCodeReader();

      // Decodificar directamente desde un elemento de video
      this.scannerControls = await codeReader.decodeFromVideoDevice(selectedDeviceId, this.videoElement.nativeElement, (result, error) => {
        if (result) {
          this.result = result.getText(); // El texto del código QR

          alert(this.result);
          console.log('Resultado del QR:', this.result);

          // Detener el escaneo
          this.stopCamera();
        }

        if (error) {
          console.error('Error durante el escaneo:', error);
        }
      });
    } catch (err) {
      console.error('Error al iniciar el escaneo:', err);
    }
  }

  stopCamera() {
    if (this.scannerControls) {
      this.scannerControls.stop(); // Detener el escaneo
      this.scannerControls = undefined;
    }
  }

  ngOnDestroy() {
    // Detener el escáner al destruir el componente
    this.stopCamera();
  }
 
}
