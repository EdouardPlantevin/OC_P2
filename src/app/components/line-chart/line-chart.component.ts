import {Component, computed, effect, inject, input, InputSignal, OnDestroy, OnInit, signal} from '@angular/core';
import {Chart, ChartConfiguration, Colors, registerables} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import {OlympicCountry} from "../../core/models/Olympic";
import {OlympicService} from "../../core/services/olympic.service";
import {LoaderComponent} from "../loader/loader.component";

Chart.register(ChartDataLabels, ...registerables, Colors);

@Component({
  selector: 'app-line-chart',
  imports: [
    LoaderComponent
  ],
  templateUrl: './line-chart.component.html',
  styleUrl: './line-chart.component.scss'
})
export class LineChartComponent implements OnInit, OnDestroy {

  readonly olympicCountry: InputSignal<OlympicCountry | undefined> = input<OlympicCountry | undefined>();
  readonly olympicService: OlympicService = inject(OlympicService);
  isLoading = signal<boolean>(true);
  readonly olympicFormatted = computed(() => {
    return this.olympicService.getFormattedOlympicCountriesLineChart(this.olympicCountry());
  })
  private chart?: Chart<'line', number[], string>;


  public readonly config: ChartConfiguration<'line', number[], string> = {
    type: 'line',
    data: {
      labels: [],
      datasets: [
        {
          data: [],
        }
      ]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
          suggestedMin: 0,
          suggestedMax: 100
        }
      },
      responsive: true,
      plugins: {
        colors: {
          forceOverride: true
        },
        legend: {
          display: false
        },
        datalabels: {
          align: 'top',
          anchor: 'end',
          offset: 6,
          color: '#000',
          font: {
            weight: 'bold'
          }
        }
      },
    }
  }

  constructor() {
    effect(async () => {
      if (!this.chart) return;
      const formatted: { year: string[], totalMedals: number[] } = await this.olympicFormatted();
      this.chart.data.labels = formatted.year;
      this.chart.data.datasets[0].data = formatted.totalMedals;
      this.chart.update();
      this.isLoading.set(false);
    });
  }

  ngOnInit(): void {
    this.chart = new Chart('lineChart', this.config);
  }

  ngOnDestroy(): void {
    this.chart?.destroy();
  }

}
