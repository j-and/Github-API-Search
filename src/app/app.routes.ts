import { Routes, RouterModule } from '@angular/router';
import { Home } from './home';
import { About } from './about';


import { DataResolver } from './app.resolver';


export const ROUTES: Routes = [
  { path: '',      component: Home },
  { path: 'home',  component: Home },
  { path: 'about', component: About },


];
