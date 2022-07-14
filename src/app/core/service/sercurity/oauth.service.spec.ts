import { TestBed } from '@angular/core/testing';

import {OauthService} from "./oauth.service";

describe('Oauth.Service.TsService', () => {
  let service: OauthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OauthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
