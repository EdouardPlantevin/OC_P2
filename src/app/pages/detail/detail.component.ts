import {Component, computed, inject} from '@angular/core';
import {CardComponent} from "../../components/card/card.component";
import {ActivatedRoute} from "@angular/router";
import {OlympicService} from "../../core/services/olympic.service";
import {LineChartComponent} from "../../components/line-chart/line-chart.component";

@Component({
  selector: 'app-detail',
  imports: [
    CardComponent,
    LineChartComponent
  ],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss'
})
export class DetailComponent {
  private route = inject(ActivatedRoute);
  private olympicService = inject(OlympicService);

  // Get olympic
  id: number = this.route.snapshot.params['id'];
  public olympic = computed(() => this.olympicService.getOlympicById(this.id));

  totalAthleteCount = computed(() => {
    const olympicData = this.olympic();
    if (!olympicData || !olympicData.participations) {
      return 0;
    }
    return olympicData.participations.reduce((total, participation) => total + participation.athleteCount, 0);
  });

  totalMedalsCount = computed(() => {
    const olympicData = this.olympic();
    if (!olympicData || !olympicData.participations) {
      return 0;
    }
    return olympicData.participations.reduce((total, participation) => total + participation.medalsCount, 0);
  });
}
