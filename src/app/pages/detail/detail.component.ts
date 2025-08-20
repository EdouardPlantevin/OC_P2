import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {CardComponent} from "../../components/card/card.component";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {OlympicService} from "../../core/services/olympic.service";
import {LineChartComponent} from "../../components/line-chart/line-chart.component";
import {OlympicCountryInterface} from "../../core/models/OlympicCountryInterface";
import {ParticipationInterface} from "../../core/models/ParticipationInterface";
import {Subscription} from "rxjs";

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
export class DetailComponent implements OnInit, OnDestroy {
  private olympicService: OlympicService = inject(OlympicService);

  private route: ActivatedRoute = inject(ActivatedRoute);
  public id: number = this.route.snapshot.params['id'];

  private olympicSubscription!: Subscription;
  public olympic: OlympicCountryInterface | undefined = undefined;
  public totalAthleteCount: number = 0;
  public totalMedalsCount: number = 0;

  ngOnInit(): void {
    this.olympicSubscription = this.olympicService.getOlympicById(this.id).subscribe(olympicData => {
      this.olympic = olympicData;
    })

    this.totalAthleteCount =
      this.olympic?.participations?.reduce((total, { athleteCount }) => total + athleteCount, 0) ?? 0;

    this.totalMedalsCount =
      this.olympic?.participations.reduce((total: number, participation: ParticipationInterface) => total + participation.medalsCount, 0) ?? 0
  }

  ngOnDestroy(): void {
    this.olympicSubscription.unsubscribe();
  }
}
