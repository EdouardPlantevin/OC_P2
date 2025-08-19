import {
  Component,
  computed,
  effect,
  input,
  InputSignal,
  OnDestroy,
  OnInit, Signal
} from '@angular/core';
import {Chart, ChartConfiguration, Colors, registerables} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import {OlympicCountryInterface} from "../../core/models/OlympicCountryInterface";
import {FormattedLineChartInterface} from "../../core/models/FormattedLineChartInterface";

Chart.register(ChartDataLabels, ...registerables, Colors);

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrl: './line-chart.component.scss'
})
export class LineChartComponent implements OnInit, OnDestroy {

  readonly olympicCountry: InputSignal<OlympicCountryInterface | undefined> = input<OlympicCountryInterface | undefined>();
  readonly olympicFormatted: Signal<FormattedLineChartInterface> = computed(() => {
    return this.getFormattedOlympicCountriesLineChart(this.olympicCountry());
  })
  private chart?: Chart<'line', number[], string>;
  private formatted?: FormattedLineChartInterface;

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
      this.formatted = this.olympicFormatted();
      this.chart.data.labels = this.formatted?.year;
      this.chart.data.datasets[0].data = this.formatted?.totalMedals;
      this.chart.update();
    });
  }

  private getFormattedOlympicCountriesLineChart(olympicsCountry?: OlympicCountryInterface): FormattedLineChartInterface {
    return {
      year: olympicsCountry?.participations?.map(p => String(p.year)) ?? [],
      totalMedals: olympicsCountry?.participations?.map(p => p.medalsCount) ?? []
    };
  }


  ngOnInit(): void {
    this.chart = new Chart('lineChart', this.config);
  }

  ngOnDestroy(): void {
    this.chart?.destroy();
  }

}
