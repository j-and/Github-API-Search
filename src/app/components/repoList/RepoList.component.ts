import {Component, ViewEncapsulation, Input} from '@angular/core';
import {HeroService} from "../../services/hero.service";


/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'RepoList',
  encapsulation: ViewEncapsulation.None,
  /*styleUrls: [
    '../app.style.css'
  ],*/
  templateUrl: './RepoList.html',

})


export class RepoList {

  repositories: Array<any>;

  constructor() {

  }

}

