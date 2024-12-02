import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-landing-client',
  imports: [CommonModule],
  templateUrl: './landing-client.component.html',
  styleUrl: './landing-client.component.scss'
})
export class LandingClientComponent {

  main_features = 1;

  changeFeatures(feature: number) {
    console.log( feature,'f:');
    this.main_features = feature;
  }

}
