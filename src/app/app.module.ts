import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

/*
 * Platform and Environment providers/directives/pipes
 */
import { ENV_PROVIDERS } from './environment';
import { ROUTES } from './app.routes';
// App is our top level component
import { App } from './app.component';
import { AppState, InteralStateType } from './app.service';
import {About} from "./pages/about/about.component";
import {Home} from "./pages/home/home.component";
import {NoContent} from "./pages/no-content/no-content";

import {RepoFilter} from "./components/repoFilter/RepoFilter.component";
import {RepoList} from "./components/repoList/RepoList.component";
import {HeroService} from "./services/hero.service";



// Application wide providers
const APP_PROVIDERS = [
  AppState,
  HeroService
];

type StoreType = {
  state: InteralStateType,
  restoreInputValues: () => void,
  disposeOldHosts: () => void
};

/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
  bootstrap: [ App ],
  declarations: [
    App,
    About,
    Home,
    NoContent,

    RepoFilter,
    RepoList
  ],
  imports: [ // import Angular's modules
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(ROUTES, { useHash: true })
  ],
  providers: [ // expose our Services and Providers into Angular's dependency injection
    ENV_PROVIDERS,
    APP_PROVIDERS
  ]
})
export class AppModule {

}
