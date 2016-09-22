import { Injectable } from '@angular/core';

import { Repo } from './repo';
import {REPOS} from "./mock.repos";


@Injectable()
export class HeroService {
  getHeroes(term): Repo[] {
    return REPOS;
  }
}
