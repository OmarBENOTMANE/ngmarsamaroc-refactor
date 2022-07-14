import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { environment } from 'src/environments/environment';
import {Observable} from "rxjs";
import { Navire } from '../../models/navire/navire.model';

@Injectable({
  providedIn: 'root'
})
export class NavireService {
  private server = environment.server + '/navires'
  constructor(private _httpClient: HttpClient) { }

  getAllNavires(page,size): Observable<Navire[]>{
    return this._httpClient.get<Navire[]>(this.server + '?size='+ size + '&page=' + page)
  }

  getNaviresToBill(page:number,size:number): Observable<Navire[]>{
    return this._httpClient.get<Navire[]>(this.server + '/actions/toBill?size='+ size + '&page=' + page)
  }
  filterNavire(numeroEscale:number ,nomNavire:string,numeroLloyd:number ,page,size):Observable<Navire[]>{
    return this._httpClient.get<Navire[]>(this.server + '/actions/filter?numeroEscale='+ numeroEscale +'&nomNavire='+ nomNavire +'&numeroLloyd='+ numeroLloyd+ '&page='+page + '&size='+ size) 
  }
}
