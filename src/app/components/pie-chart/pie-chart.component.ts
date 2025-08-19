import {
  Component,
  computed,
  effect,
  inject,
  input,
  InputSignal,
  OnDestroy,
  OnInit,
  Signal,
  signal,
  WritableSignal
} from '@angular/core';
import {ActiveElement, Chart, ChartConfiguration, ChartEvent, Colors, registerables} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {OlympicCountryInterface} from '../../core/models/OlympicCountryInterface';
import {Router} from '@angular/router';
import {FormattedPieChartInterface} from "../../core/models/FormattedPieChartInterface";
import {ParticipationInterface} from "../../core/models/ParticipationInterface";

Chart.register(ChartDataLabels, ...registerables, Colors);

@Component({
  selector: 'app-pie-chart',
  imports: [],
  templateUrl: './pie-chart.component.html',
  styleUrl: './pie-chart.component.scss'
})
export class PieChartComponent implements OnInit, OnDestroy {
  private readonly router: Router = inject(Router);
  isLoading: WritableSignal<boolean> = signal<boolean>(true);

  readonly olympicCountries: InputSignal<OlympicCountryInterface[]> = input.required<OlympicCountryInterface[]>();

  readonly olympicFormattedChartPie: Signal<FormattedPieChartInterface> = computed(() =>
    this.getFormattedOlympicCountriesPieChart(this.olympicCountries())
  );

  public readonly config: ChartConfiguration<'pie', number[], string> = {
    type: 'pie',
    data: {
      labels: [],
      datasets: [
        {
          data: []
        }
      ]
    },
    options: {
      responsive: true,
      layout: {
        padding: {
          top: 50,
          right: 100,
          bottom: 100,
          left: 100
        }
      },
      plugins: {
        datalabels: {
          color: '#000',
          align: 'end',
          anchor: 'end',
          formatter: (_value, ctx) => ctx.chart.data.labels?.[ctx.dataIndex] || ''
        },
        colors: {
          forceOverride: true
        },
        legend: {
          display: false
        },
        tooltip: {
          backgroundColor: '#008080FF',
          padding: 15,
          displayColors: false,
          callbacks: {
            label: (context) => {
              return `${context.parsed || 0} 🏅`;
            }
          }
        },
      },
      onClick: async (_event: ChartEvent, elements: ActiveElement[]) => {
        if (elements?.length) {
          const countryId = this.formatted?.countryId[elements[0].index];
          void this.router.navigateByUrl(`/detail/${countryId}`);
        }
      }
    },
    plugins: [ChartDataLabels]
  };

  private chart?: Chart<'pie', number[], string>;
  private formatted?: FormattedPieChartInterface;

  constructor() {
    effect(async () => {
      if (!this.chart) return;
      this.formatted = this.olympicFormattedChartPie();
      this.chart.data.labels = this.formatted.countryName;
      this.chart.data.datasets[0].data = this.formatted.totalMedals;
      this.chart.update();
      this.isLoading.set(false);
    });
  }

  getFormattedOlympicCountriesPieChart(olympicsCountry: OlympicCountryInterface[]): FormattedPieChartInterface {
    // On crée un tableau intermédiaire avec les pays et leur total de médailles
    let olympicsFormatted = olympicsCountry.filter(olympic => olympic.country).map(olympic => {
      return {
        countryName: olympic.country,
        totalMedals: olympic.participations?.reduce((total: number, participation: ParticipationInterface) => total + participation.medalsCount, 0),
        countryId: olympic.id
      };
    });

    //On trie par totalMedals décroissant
    olympicsFormatted.sort((a, b) => b.totalMedals - a.totalMedals);

    // On sépare en deux tableaux
    return {
      countryName: olympicsFormatted.map(item => item.countryName),
      totalMedals: olympicsFormatted.map(item => item.totalMedals),
      countryId: olympicsFormatted.map(item => item.countryId)
    };
  }

  ngOnInit(): void {
    this.chart = new Chart('PieChart', this.config);
  }

  ngOnDestroy(): void {
    this.chart?.destroy();
  }

}
