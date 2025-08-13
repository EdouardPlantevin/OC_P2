import {Component, computed, effect, inject, Signal} from '@angular/core';
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

  private olympicService: OlympicService = inject(OlympicService);

  public olympics: Signal<OlympicCountry[] | []> = computed(() => this.olympicService.olympicsResource.value() || []);

}
