import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BaseChartDirective, provideCharts, withDefaultRegisterables } from 'ng2-charts';


@Component({
  selector: 'app-client-stats',
  providers: [provideCharts(withDefaultRegisterables())],
  standalone: true,
  imports: [
    CommonModule,
    BaseChartDirective
  ],
  templateUrl: './client-stats.component.html',
  styleUrl: './client-stats.component.scss'
})
export class ClientStatsComponent {

   data = {
    labels: ['January', 'February', 'March'],
    datasets: [
      {
        label: 'Sales',
        data: [65, 59, 80],
        backgroundColor: ['red', 'blue', 'green'],
      },
    ],
  };

  barChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
    },
  };
}