import {Component, computed, inject, OnInit} from '@angular/core';
import { Observable, of } from 'rxjs';
import { OlympicService } from 'src/app/core/services/olympic.service';
import {JsonPipe} from "@angular/common";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
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
}
