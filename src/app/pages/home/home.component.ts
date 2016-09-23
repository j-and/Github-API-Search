import {Component} from '@angular/core';

import {Repo} from "../../services/repo";
import {RepoService} from "../../services/repo.service";

@Component({
  selector: 'home',
  styleUrls: ['./home.style.css'],
  templateUrl: './home.template.html'
})
export class Home {

  repositories: Repo[];
  loading = false;

  constructor(private repoService: RepoService) {
  }

  onSearch(searchTerm) {
    console.log("search", searchTerm);
    let self = this;
    this.loading = true;
    this.repoService.getRepos(searchTerm)
      .then(function (repos) {
        self.repositories = repos;
        self.loading = false;
      });
  }

}
