import {Component, computed, effect, inject} from '@angular/core';
import {CardComponent} from "../../components/card/card.component";
import {ActivatedRoute} from "@angular/router";
import {OlympicService} from "../../core/services/olympic.service";

@Component({
  selector: 'app-detail',
  imports: [
    CardComponent
  ],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss'
})
export class DetailComponent {
  private route = inject(ActivatedRoute);
  private olympicService = inject(OlympicService);

  // Get olympic
  id = this.route.snapshot.params['id'];
  public olympic = computed(() => this.olympicService.getOlympicById(this.id) || []);
}
