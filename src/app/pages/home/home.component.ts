import {Component, computed, inject, Signal} from '@angular/core';
import { OlympicService } from 'src/app/core/services/olympic.service';
import {CardComponent} from "../../components/card/card.component";
import {PieChartComponent} from "../../components/pie-chart/pie-chart.component";
import {OlympicCountryInterface} from "../../core/models/OlympicCountryInterface";
import {HttpResourceRef} from "@angular/common/http";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [
    CardComponent,
    PieChartComponent
  ]
})
export class HomeComponent {

  private olympicService: OlympicService = inject(OlympicService);

  public olympics: Signal<HttpResourceRef<OlympicCountryInterface[] | undefined>> = computed(() => {
    return this.olympicService.olympicsResource;
  });

  public maxParticipations: Signal<number> = computed(() => {
    return this.getMaxParticipations(this.olympics().value() ?? []);
  });

  private getMaxParticipations(olympicsCountry: OlympicCountryInterface[]): number {
    const countries = olympicsCountry ?? [];
    return countries.reduce((max, c) => {
      const count = c.participations?.length ?? 0;
      return count > max ? count : max;
    }, 0);
  }
}
