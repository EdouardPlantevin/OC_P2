import { Component } from '@angular/core';
import {RouterOutlet} from "@angular/router";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-root',
  template: `
    <router-outlet/>
  `,
  imports: [
    RouterOutlet,
    CommonModule
  ],
  standalone: true
})
export class AppComponent {
}
