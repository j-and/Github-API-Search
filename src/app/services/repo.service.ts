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
        let data = response.json();
        console.log(data.items);

        // var filtered = data.items.filter((value: Repo) => {
        //   var lowerStr = value.name.toLowerCase();
        //   return (value.score >= 10 && lowerStr.indexOf(term) > -1);
        // });
        // console.log("filtered", filtered);

        return data.items;
      });
  }
}
