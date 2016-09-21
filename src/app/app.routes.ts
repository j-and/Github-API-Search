import { Routes } from '@angular/router';
import { Home } from './home';
import { About } from './about';


export const ROUTES: Routes = [
  { path: '',      component: Home },
  { path: 'home',  component: Home },
  { path: 'about', component: About },
  { path: '**',    component: NoContent }
];
