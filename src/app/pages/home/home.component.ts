import { Component, Input, Output } from '@angular/core';


import { Title } from './title';
import {AppState} from "../../app.service";
import {HeroService} from "../../services/hero.service";


@Component({
  // The selector is what angular internally uses
  // for `document.querySelectorAll(selector)` in our index.html
  // where, in this case, selector is the string 'home'
  selector: 'home',  // <home></home>
  // We need to tell Angular's Dependency Injection which providers are in our app.
  providers: [
    Title
  ],
  // Our list of styles in our component. We may add more to compose many styles together
  styleUrls: [ './home.style.css' ],
  // Every Angular template is first compiled by the browser before Angular runs it's compiler
  templateUrl: './home.template.html',
  directives: 'RepoList.component.ts'
})
export class Home {

  childTitle:string = 'This text is passed to child';

  repositories: Array<any> = [];
  //@Input() searchTerm:string;
  // @Output() repositories: Array<any>;


  // TypeScript public modifiers
  constructor(private heroService: HeroService) {

  }

  doSearch(term) {
    this.repositories = this.heroService.getHeroes(term);
  }

}
