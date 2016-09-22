import {Component} from '@angular/core';

import {Repo} from "../../services/repo";
import {Title} from './title';
import {RepoService} from "../../services/repo.service";

@Component({
  selector: 'home',
  providers: [
    Title
  ],
  styleUrls: ['./home.style.css'],
  templateUrl: './home.template.html',
  directives: 'RepoList.component.ts'
})
export class Home {

  repositories: Repo[];

  constructor(private repoService: RepoService) {

  }

  onSearch(searchTerm) {
    console.log("search", searchTerm); //, this.repositories);
    this.repositories = this.repoService.getRepos(searchTerm);
  }
}
