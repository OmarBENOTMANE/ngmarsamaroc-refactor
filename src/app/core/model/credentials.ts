export class Credentials {
  clientId: string ;
  clientSecret: string ;

  constructor(clientId: string,
              clientSecret: string) {
    this.clientSecret = clientSecret;
    this.clientId = clientId;
  }
}
