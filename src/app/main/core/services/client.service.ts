import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";


@Injectable({
    providedIn: 'root'
  })

export class ClientService {

    public server = environment.server + '/clients';

    constructor(private http: HttpClient) { }

    getClientName(codeClient:any):Observable<any>{
        return this.http.get(this.server + '/' + codeClient, { responseType: 'text'})
    }
}