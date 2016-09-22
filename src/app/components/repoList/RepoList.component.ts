import {Component, ViewEncapsulation, Input} from '@angular/core';
import {Repo} from "../../services/repo";


/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'RepoList',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './RepoList.html',
})


export class RepoList {
  @Input() repos: Repo[];

  constructor() {
  }

}

