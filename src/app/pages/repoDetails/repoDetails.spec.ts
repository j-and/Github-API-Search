import { ActivatedRoute, Data } from '@angular/router';
import { Component } from '@angular/core';
import { inject, TestBed } from '@angular/core/testing';

// Load the implementations that should be tested
import { RepoDetails } from './repoDetails.component';

describe('repoDetails', () => {
  // provide our implementations or mocks to the dependency injector
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      // provide a better mock
      {
        provide: ActivatedRoute,
        useValue: {
          data: {
            subscribe: (fn: (value: Data) => void) => fn({
              yourData: 'yolo'
            })
          }
        }
      },
      RepoDetails
    ]
  }));

  it('should log ngOnInit', inject([RepoDetails], (repoDetails: RepoDetails) => {
    spyOn(console, 'log');
    expect(console.log).not.toHaveBeenCalled();

    RepoDetails.ngOnInit();
    expect(console.log).toHaveBeenCalled();
  }));

});
