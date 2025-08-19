import {Component, computed, inject, Signal} from '@angular/core';
import {CardComponent} from "../../components/card/card.component";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {OlympicService} from "../../core/services/olympic.service";
import {LineChartComponent} from "../../components/line-chart/line-chart.component";
import {OlympicCountryInterface} from "../../core/models/OlympicCountryInterface";
import {ParticipationInterface} from "../../core/models/ParticipationInterface";

@Component({
  selector: 'app-detail',
  imports: [
    CardComponent,
    LineChartComponent,
    RouterLink
  ],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss'
})
export class DetailComponent {
  private route: ActivatedRoute = inject(ActivatedRoute);
  private olympicService: OlympicService = inject(OlympicService);

  // Get olympic
  public id: number = this.route.snapshot.params['id'];
  public olympic: Signal<OlympicCountryInterface | undefined> = computed(() => this.olympicService.getOlympicById(this.id));

  totalAthleteCount: Signal<number> = computed(() => {
    const olympicData: OlympicCountryInterface | undefined = this.olympic();
    if (!olympicData || !olympicData.participations) {
      return 0;
    }
    return olympicData.participations.reduce((total: number, participation: ParticipationInterface) => total + participation.athleteCount, 0);
  });

  totalMedalsCount: Signal<number> = computed(() => {
    const olympicData: OlympicCountryInterface | undefined = this.olympic();
    if (!olympicData || !olympicData.participations) {
      return 0;
    }
    return olympicData.participations.reduce((total: number, participation: ParticipationInterface) => total + participation.medalsCount, 0);
  });
}
