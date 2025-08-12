import { Component, computed, effect, EffectRef, inject, input, OnDestroy, OnInit } from '@angular/core';
import {
  ActiveElement,
  Chart,
  ChartConfiguration,
  ChartEvent,
  Colors,
  registerables
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { OlympicCountry } from '../../core/models/Olympic';
import { OlympicService } from '../../core/services/olympic.service';
import { Router } from '@angular/router';

Chart.register(ChartDataLabels, ...registerables, Colors);

@Component({
  selector: 'app-pie-chart',
  imports: [],
  templateUrl: './pie-chart.component.html',
  styleUrl: './pie-chart.component.scss'
})
export class PieChartComponent implements OnInit, OnDestroy {
  private readonly olympicService = inject(OlympicService);
  private readonly router = inject(Router);

  readonly olympicCountries = input.required<OlympicCountry[]>();

  readonly olympicFormattedChartPie = computed(() =>
    this.olympicService.getFormattedOlympicCountriesPieChart(this.olympicCountries())
  );

  private effectRef!: EffectRef;

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
        }
      },
      onClick: (_event: ChartEvent, elements: ActiveElement[]) => {
        if (elements?.length) {
          const countryId = this.olympicFormattedChartPie().countryId[elements[0].index];
          this.router.navigateByUrl(`/detail/${countryId}`);
        }
      }
    },
    plugins: [ChartDataLabels]
  };

  private chart?: Chart<'pie', number[], string>;

  constructor() {
    this.effectRef = effect(() => {
      if (!this.chart) return;
      const formatted = this.olympicFormattedChartPie();
      this.chart.data.labels = formatted.countryName;
      this.chart.data.datasets[0].data = formatted.totalMedals;
      this.chart.update();
    });
  }

  ngOnInit(): void {
    this.chart = new Chart('PieChart', this.config);
  }

  ngOnDestroy(): void {
    this.effectRef?.destroy();
    this.chart?.destroy();
  }

}
