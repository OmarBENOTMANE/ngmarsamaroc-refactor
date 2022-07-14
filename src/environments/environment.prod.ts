// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.


import {AuthTypes} from "../app/core/factorie/auth.type";
import {AuthScheme} from "../app/core/model/auth-scheme.enum";
import {ErrorHandlerType} from "../app/core/factorie/error-handler.type";
import {LoggerTypes} from "../app/core/factorie/logger.type";

const server = "http://178.18.253.206:9001"

export const environment = {
  server : "http://178.18.253.206:9001",
  mockdata : 'http://demo8421340.mockable.io/',
  swager: 'http://localhost:9090/',
  production: false,
  appName: 'VTS Frontend Application',
  appLogo: './assets/images/logo.png',
  defaultAvatar: './assets/images/profil.png',
  // tslint:disable-next-line:max-line-length
  defaultApplicationLogo: './assets/images/logo.png',
  envName: 'dev',
  buildVersion: '0.0.1-SNAPSHOT',
  buildTimestamp: new Date().toISOString(),
  defaultLanguage: 'fr',
  defaultDateFormat: 'DD-MM-YYYY HH:mm',
  defaultDateFormatNoTime: 'DD-MM-YYYY',
  // tslint:disable-next-line:max-line-length
  emailPattern: '^([a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)$',
  // tslint:disable-next-line:max-line-length
  emailRegExp: /^([a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)$/,
  authToken: localStorage.getItem('authToken'),
  apiConfig: {
    apiEnv: 'dev',
    timeExpired: 1200,
    credentials: {
      clientId: '',
      clientSecret: ''
    },
    apiUrls: [
      {id: 'About_SERVICE_URL', url: server + '/' , requireAuthBefore: false},
      {id: 'OAUTH_SERVICE_URL', url: server + '/auth', requireAuthBefore: false},
      {id: 'RESET_PASSWORD_SERVICE_URL', url: server + '/reset-password', requireAuthBefore: false},
      {id: 'RECOVER_PASSWORD_SERVICE_URL', url: server + '/recover-password', requireAuthBefore: false},
    ],
    apiUrl: server,
    apiUploads: server + '/attachments/upload',
    authService: AuthTypes.OAUTH,
    authScheme: AuthScheme.BEARER,
    errorHandler: ErrorHandlerType.SIMPLE,
    loggerService: LoggerTypes.CONSOLE
  },

};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
