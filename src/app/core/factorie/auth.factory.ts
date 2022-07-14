import {HttpClient} from "@angular/common/http";
import {AuthHelper} from "../service/sercurity/auth.helper";
import {AuthService} from "../service/sercurity/auth.service";
import {environment} from "../../../environments/environment";
import {OauthService} from "../service/sercurity/oauth.service";
import {AuthTypes} from "./auth.type";

export let authFactory = (http: HttpClient, authHelper: AuthHelper) : AuthService => {
  switch (environment.apiConfig.authService) {
    case AuthTypes.OAUTH:
      return new OauthService(http, environment.apiConfig, authHelper);
    default:
      return new OauthService(http, environment.apiConfig, authHelper);
  }
}
