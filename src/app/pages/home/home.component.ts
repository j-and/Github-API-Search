import {Component} from '@angular/core';
import {Repo} from "../../services/repo";
import {RepoService} from "../../services/repo.service";

@Component({
  selector: 'home',
  styleUrls: ['./home.style.css'],
  templateUrl: './Home.template.html'
})
export class Home {

  repositories: Repo[];
  loading = false;
  message = "";

  constructor(private repoService: RepoService) {
  }

  onSearch(searchTerm) {
    console.log("search", searchTerm);
    let self = this;
    this.loading = true;
    this.message = "";
    this.repoService.getRepos(searchTerm)
      .then(function (repos) {
        self.repositories = repos;
        self.loading = false;
        if (self.repositories.length === 0) {
          self.message = "No repositories is found";
        }
      })
      .catch(error=> {
        console.warn(error)
        self.loading = false;
        self.message = "Error 404";
      });
  }
}
