import {Component, ViewEncapsulation, Input} from '@angular/core';
import {RepoService} from "../../services/repo.service";
import {Repo} from "../../services/repo";


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
  @Input() repos:Repo[];

      constructor() {

  }

}

