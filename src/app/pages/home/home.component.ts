import {Component, computed, effect, inject, OnInit} from '@angular/core';
import { OlympicService } from 'src/app/core/services/olympic.service';
import {CardComponent} from "../../components/card/card.component";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [
    CardComponent
  ],
  standalone: true
})
export class HomeComponent {
  // public olympics$: Observable<any> = of(null);
  //
  // constructor(private olympicService: OlympicService) {}
  //
  // ngOnInit(): void {
  //   this.olympics$ = this.olympicService.getOlympics();
  // }

  private olympicService: OlympicService = inject(OlympicService);

  public olympics$ = computed(() => this.olympicService.olympicsResource.value() || []);

  constructor() {
    effect(() => {
      console.log(this.olympics$());
    });
  }
}
