import { Routes } from '@angular/router';
import {NoContent} from "./pages/no-content/no-content";
import {About} from "./pages/about/about.component";
import {Home} from "./pages/home/home.component";



export const ROUTES: Routes = [
  { path: '',      component: Home },
  { path: 'home',  component: Home },
  { path: 'about', component: About },
  { path: '**',    component: NoContent }
];
