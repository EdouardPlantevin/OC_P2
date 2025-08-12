import {Component, computed, effect, inject} from '@angular/core';
import {CardComponent} from "../../components/card/card.component";
import {ActivatedRoute} from "@angular/router";
import {OlympicService} from "../../core/services/olympic.service";
import {JsonPipe} from "@angular/common";

@Component({
  selector: 'app-detail',
  imports: [
    CardComponent,
    JsonPipe
  ],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss'
})
export class DetailComponent {
  private route = inject(ActivatedRoute);
  private olympicService = inject(OlympicService);

  // Get olympic
  id = this.route.snapshot.params['id'];
  public olympic = computed(() => this.olympicService.getOlympicById(this.id) || null);

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
