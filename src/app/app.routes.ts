import { Routes } from '@angular/router';
import {NoContent} from "./pages/no-content/no-content";
import {RepoDetails} from "./pages/repoDetails/repoDetails.component";
import {Home} from "./pages/home/home.component";



export const ROUTES: Routes = [
  { path: '',      component: Home },
  { path: 'home',  component: Home },
  { path: 'repo-details/:owner/:repo', component: RepoDetails },
  { path: '**',    component: NoContent }
];


