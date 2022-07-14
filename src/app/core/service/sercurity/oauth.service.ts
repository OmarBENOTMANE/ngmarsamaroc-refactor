import {Inject, Injectable} from '@angular/core';
import {AuthService} from "./auth.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ApiConfig} from "../../model/api-config";
import { AuthHelper } from './auth.helper';
import {environment} from "../../../../environments/environment";
import {OauthToken} from "../../model/oauth-token";
import { CommonUtil } from '../../helpers/common.util';
import {OauthResponse} from "../../model/oauth-response";
import {map, Observable} from "rxjs";

@Injectable()
export class OauthService  {


  constructor(private http: HttpClient,
              @Inject('api.config') private apiConfig: ApiConfig,
              private authHelper: AuthHelper) {
  }


}
