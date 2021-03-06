import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";


@Injectable({
    providedIn: 'root'
  })

export class GlobalAuthService {

  Permission(permission: string | undefined) {
    if(permission) {
        let permissions = [''];
        return permissions.includes(permission);
    }else {
        return true;   
    }
     
}
}