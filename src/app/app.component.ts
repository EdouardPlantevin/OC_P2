import {Component, OnDestroy, OnInit} from '@angular/core';
import {RouterOutlet} from "@angular/router";
import {CommonModule} from "@angular/common";
import {Subscription} from "rxjs";
import {OlympicService} from "./core/services/olympic.service";

@Component({
  selector: 'app-root',
  template: `
    <router-outlet/>
  `,
  imports: [
    RouterOutlet,
    CommonModule
  ]
})
export class AppComponent implements OnInit, OnDestroy {

  public olympicSubscription!: Subscription;

  constructor(private olympicService: OlympicService) {}

  ngOnInit(): void {
    this.olympicSubscription = this.olympicService.loadInitialData().subscribe();
  }

  ngOnDestroy(): void {
    this.olympicSubscription.unsubscribe();
  }
}
