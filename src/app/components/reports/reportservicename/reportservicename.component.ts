import { Component } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { ServicesService } from '../../../services/services.service';

@Component({
  selector: 'app-reportservicename',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './reportservicename.component.html',
  styleUrl: './reportservicename.component.css'
})
export class ReportservicenameComponent {
  barChartOptions: ChartOptions = {responsive:true,}

  barChartLabels: String[] = [];

  barChartType: ChartType = 'pie';

  //barChartType: ChartType = 'doughnut';

 // barChartType: ChartType = 'line';

 //barChartType: ChartType = 'bar';

  //barChartType: ChartType = 'polarArea';

  barChartLegend = true;
  barChartData: ChartDataset[]=[]

  constructor(private sS:ServicesService) {}

  ngOnInit(): void {
    this.sS.getquantitybyName().subscribe((data) => {

      this.barChartLabels = data.map((item) => item.nameservice);
      this.barChartData = [
        {
          data: data.map((item) => item.quantityService),
          label: 'Cantidad',
          backgroundColor: [
            '#0094d3',
            '#4169c7',
            '#0000CD',
            '#9BBB59',
            '#8064A2',
           '#4BACC6',
            '#4F81BC',
           '#C0504D',
          ],
          borderColor: 'rgba(173, 216, 230, 1)',
          borderWidth: 1,
        },
      ];
    });
  }
}
