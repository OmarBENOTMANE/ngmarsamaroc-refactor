import {Inject, Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthHelper} from './auth.helper';
import {CommonUtil} from '../../helpers/common.util';
import {ApiConfig} from "../../model/api-config";


@Injectable()
export class PasswordService {

  headers: HttpHeaders;

  constructor(private httpClient: HttpClient,
              @Inject('api.config') private apiConfig: ApiConfig,
              private authHelper: AuthHelper) {
    this.headers = new HttpHeaders({'Content-Type': 'application/json; charset=utf-8'});
    this.headers = this.authHelper.addHeaderAuthorization(this.headers);
  }

  getRecoverPasswordServiceUrl(): string {
    return CommonUtil.getApiUrl('RECOVER_PASSWORD_SERVICE_URL', this.apiConfig);
  }

  getResetPasswordServiceUrl(): string {
    return CommonUtil.getApiUrl('RESET_PASSWORD_SERVICE_URL', this.apiConfig);
  }

  recoverPasswordByUsername(username: string): Observable<any> {
    return this.httpClient.get<any>(`${this.getRecoverPasswordServiceUrl()}?username=${username}`);
  }

  resetPassword(token: string, password: string): Observable<any> {
    return this.httpClient.post<any>(`${this.getResetPasswordServiceUrl()}?token=${token}`, password, {headers: this.headers});
  }

}
