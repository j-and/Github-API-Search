import { Component, Input} from '@angular/core';

import {Repo} from "../../services/repo";
import { Title } from './title';
import {HeroService} from "../../services/hero.service";

@Component({
    selector: 'home',
    providers: [
    Title
  ],
    styleUrls: [ './home.style.css' ],
    templateUrl: './home.template.html',
  directives: 'RepoList.component.ts'
})
export class Home {

  @Input() searchTerm:string;
  repositories:Repo[];

  onSearch(searchTerm) {
    console.log("search", searchTerm); //, this.repositories);
    this.repositories = this.heroService.getHeroes(searchTerm);
  }

  constructor(private heroService: HeroService) {

  }

}
