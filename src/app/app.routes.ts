import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ErrorComponent } from './pages/error/error.component';

export const routes: Routes = [
  {
    path: 'detail/:id',
    loadComponent: async () => (await import('./pages/detail/detail.component')).DetailComponent
  },
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: '**', // wildcard
    component: ErrorComponent,
  },
];
