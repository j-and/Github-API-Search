import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {Repo} from "./repo";

var BASE_URL = 'https://api.github.com/';

@Injectable()
export class RepoService {
  constructor(private http: Http) {
  }

  getRepos(term: string): Promise<Repo[]> {
    return this.http.get(`${BASE_URL}search/repositories?q=${term}+language:javascript&sort=stars&order=desc`)
      .toPromise()
      .then(response => {
        console.log(response);
        let data = response.json().items;
        console.log(data);
        return data;
      })
  }

  getRepoDetails(owner: string, repo: string): Promise<Repo> {
    return this.http.get(`${BASE_URL}repos/${owner}/${repo}`)
      .toPromise()
      .then(response => {
        let repoDetails = response.json();
        console.log("repoDetails", repoDetails);
        return repoDetails;
      })
  }
}
