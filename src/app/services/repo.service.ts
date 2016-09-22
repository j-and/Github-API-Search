import {Injectable} from '@angular/core';

import {Repo} from './repo';
import {REPOS} from "./mock.repos";


@Injectable()
export class RepoService {

  getRepos(term: string): Repo[] {
    var filtered = REPOS.filter((value: Repo) => {
      var lowerStr = value.name.toLowerCase();
      return lowerStr.indexOf(term)>-1;
    });
    console.log("filtered", filtered);
    return filtered;

  }
}

