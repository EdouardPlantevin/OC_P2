import {Component, computed, inject, Signal} from '@angular/core';
import { OlympicService } from 'src/app/core/services/olympic.service';
import {CardComponent} from "../../components/card/card.component";
import {PieChartComponent} from "../../components/pie-chart/pie-chart.component";
import {OlympicCountry} from "../../core/models/Olympic";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [
    CardComponent,
    PieChartComponent
  ],
  standalone: true
})
export class HomeComponent {

  protected readonly Array = Array;
  private olympicService: OlympicService = inject(OlympicService);

  public olympics: Signal<OlympicCountry[] | string> = computed(() => {
    try {
      let olympicsResource = this.olympicService.olympicsResource;
      if (olympicsResource.statusCode() === 200) {
        return olympicsResource.value() ?? [];
      } else if (olympicsResource.isLoading()) {
        return "loading";
      }
      return "error";
    } catch (e) {
      return "error";
    }
  });
}
