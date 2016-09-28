import {Component, Input} from '@angular/core';
import {Repo} from "../../services/repo";
import {RepoService} from "../../services/repo.service";
import { Observable } from 'rxjs/Observable';
//import {ROUTES} from "@angular/router";


@Component({
  selector: 'RepoList',
 templateUrl: './RepoList.template.html'
   //directives: [ROUTES]
})

export class RepoList {
  params:string;

  @Input() repos: Repo[];
  constructor(private repoService: RepoService) {
  }

}
