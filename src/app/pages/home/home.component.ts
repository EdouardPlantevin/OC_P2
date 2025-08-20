import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { CardComponent } from '../../components/card/card.component';
import { PieChartComponent } from '../../components/pie-chart/pie-chart.component';
import { OlympicCountryInterface } from '../../core/models/OlympicCountryInterface';
import {Observable, map, of, Subscription} from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [CardComponent, PieChartComponent],
  standalone: true
})
export class HomeComponent implements OnInit, OnDestroy {

  private olympicService = inject(OlympicService);
  public olympicsSubscription!: Subscription;

  public olympics: OlympicCountryInterface[] = [];
  public maxParticipations: number = 0;

  ngOnInit(): void {
    this.olympicsSubscription = this.olympicService.getOlympics().subscribe(olympicsData => {
      this.olympics = olympicsData.map((olympic) => {
        return olympic;
      })
      this.maxParticipations = this.getMaxParticipations(this.olympics);
    })
  }

  ngOnDestroy(): void {
    this.olympicsSubscription.unsubscribe();
  }

  private getMaxParticipations(olympicsCountry: OlympicCountryInterface[]): number {
    const countries = olympicsCountry ?? [];
    return countries.reduce((max, c) => {
      const count = c.participations?.length ?? 0;
      return count > max ? count : max;
    }, 0);
  }
}
