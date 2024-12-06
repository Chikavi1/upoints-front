import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, Input, Output } from '@angular/core';
import { AlertComponent } from '../../../shared/alert/alert.component';


@Component({
  selector: 'app-visits',
  imports: [CommonModule, AlertComponent ],
  templateUrl: './visits.component.html',
  styleUrl: './visits.component.scss'
})
export class VisitsComponent {

  isModalVisible = false;
  closeText: string = "Eliminar";
  doneText: string = "done";
  alertMessage: string = 'seguro?'


  toggleModal() {
    this.isModalVisible = true;
  }

  closeModal() {
    this.isModalVisible = false;
  }

  isModalOpen = false;
  modalMode: 'create' | 'edit' = 'create';
  selectedData: any = {};

  record: any = {
    
  }

  openModal(mode: 'create' | 'edit', data: any = {}) {
    this.isModalOpen = true;
    this.modalMode = mode;
    this.selectedData = data;
  }

  handleModalClose(event: any) {
    this.isModalOpen = false;
    console.log('Modal cerrado', event);
  }

  handleModalSave(data: any) {
    this.isModalOpen = false;
    console.log('Datos guardados:', data);
    // Aquí podrías enviar los datos al backend o procesarlos.
  }
}