import {Component, Input} from '@angular/core';
import {Repo} from "../../services/repo";

@Component({
  selector: 'RepoList',
 templateUrl: './RepoList.template.html'
  })

export class RepoList {

  @Input() repos: Repo[];
  constructor() {
  }
}
