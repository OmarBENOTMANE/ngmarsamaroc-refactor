import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";


@Injectable({
    providedIn: 'root'
  })

export class FileService {

    public server = environment.server + '/files';

    constructor(private http: HttpClient) { }

    upload(file: File |null, numCmd:any): Observable<any>{
        const formData: FormData = new FormData();
        if (file){
            formData.append('file', file);
            
        }
        
        return this.http.post(this.server +'/'+ numCmd, formData)
    }

    getFileName(numCmd:any):Observable<any>{
        return this.http.get(this.server +'/fileName/'+ numCmd)
    }
    getUrlFile(numCmd:any): string{
        return this.server +'/'+ numCmd;
    }

    /*uploadFile(formData : FormData): Observable<any>{
        return this.http.post(this.server, formData)
    }*/
    deleteFile(numBp: any):Observable<any> {
        return this.http.delete<any>(this.server + '/actions/delete/'+ numBp)
      }
}