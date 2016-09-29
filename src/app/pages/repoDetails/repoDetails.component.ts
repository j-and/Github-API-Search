import {Component, OnInit} from '@angular/core';
import {ActivatedRoute}   from '@angular/router';
import {RepoService} from "../../services/repo.service";
import {Repo} from "../../services/repo";

@Component({
  selector: 'repoDetails',
  templateUrl: './RepoDetails.template.html',
})

export class RepoDetails implements OnInit {
  repoDetails: Repo;
  loadingTable = false;
  message = "";

  ngOnInit(): void {
    console.log("this.routeSnapshot", this.route.snapshot);
    this.showDetails(this.route.snapshot.params['owner'], this.route.snapshot.params['repo']);
  }

  showDetails(owner, repo) {
    this.loadingTable = true;
    this.message = "";
    let self = this;
    this.repoService.getRepoDetails(owner, repo)
      .then(function (repo) {
        self.repoDetails = repo;
        self.loadingTable = false;
        return self.repoDetails
      })
      .catch(error=> {
        console.warn(error);
        self.loadingTable = true;
        self.message = "Error 404";
      });
  }

  constructor(private repoService: RepoService,
              private route: ActivatedRoute) {
  };
}







