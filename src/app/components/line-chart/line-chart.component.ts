import {Component, computed, effect, inject, input, InputSignal, OnDestroy, OnInit} from '@angular/core';
import {Chart, ChartConfiguration, Colors, registerables} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import {OlympicCountry} from "../../core/models/Olympic";
import {OlympicService} from "../../core/services/olympic.service";

Chart.register(ChartDataLabels, ...registerables, Colors);

@Component({
  selector: 'app-line-chart',
  imports: [],
  templateUrl: './line-chart.component.html',
  styleUrl: './line-chart.component.scss'
})
export class LineChartComponent implements OnInit, OnDestroy {

  readonly olympicCountry: InputSignal<OlympicCountry | undefined> = input<OlympicCountry | undefined>();
  readonly olympicService: OlympicService = inject(OlympicService);
  readonly olympicFormatted = computed(() => {
    return this.olympicService.getFormattedOlympicCountriesLineChart(this.olympicCountry());
  })


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
        }
      },
    }
  }

  private chart?: Chart<'line', number[], string>;

  constructor() {
    effect(() => {
      if (!this.chart) return;
      const formatted: { year: string[], totalMedals: number[] } = this.olympicFormatted();
      this.chart.data.labels = formatted.year;
      this.chart.data.datasets[0].data = formatted.totalMedals;
      this.chart.update();
    });
  }

  ngOnInit(): void {
    this.chart = new Chart('lineChart', this.config);
  }

  ngOnDestroy(): void {
    this.chart?.destroy();
  }

}
