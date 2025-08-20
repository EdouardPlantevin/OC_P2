import {
  Component,
  input,
  InputSignal,
  OnDestroy,
  OnInit
} from '@angular/core';
import {Chart, ChartConfiguration, Colors, registerables} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import {OlympicCountryInterface} from "../../core/models/OlympicCountryInterface";
import {FormattedLineChartInterface} from "../../core/models/FormattedLineChartInterface";
import {Observable, Subscription} from "rxjs";

Chart.register(ChartDataLabels, ...registerables, Colors);

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrl: './line-chart.component.scss'
})
export class LineChartComponent implements OnInit, OnDestroy {

  readonly olympicCountry: InputSignal<OlympicCountryInterface | undefined> = input<OlympicCountryInterface | undefined>();
  public olympicFormattedSubscription!: Subscription

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

  private getFormattedOlympicCountriesLineChart(olympicsCountry?: OlympicCountryInterface): Observable<FormattedLineChartInterface> {
    return new Observable(observer => {
      observer.next({
        year: olympicsCountry?.participations?.map(p => String(p.year)) ?? [],
        totalMedals: olympicsCountry?.participations?.map(p => p.medalsCount) ?? []
      });
      observer.complete();
    });
  }


  ngOnInit(): void {
    this.olympicFormattedSubscription = this.getFormattedOlympicCountriesLineChart(this.olympicCountry()).subscribe(formatted => {
      this.formatted = formatted

      this.chart = new Chart('lineChart', this.config);
      this.chart.data.labels = this.formatted.year;
      this.chart.data.datasets[0].data = this.formatted.totalMedals ?? 0;
      this.chart.update();
    });
  }

  ngOnDestroy(): void {
    this.olympicFormattedSubscription.unsubscribe();
    this.chart?.destroy();
  }

}
