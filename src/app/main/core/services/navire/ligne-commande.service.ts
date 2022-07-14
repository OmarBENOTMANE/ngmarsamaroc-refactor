import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import { LigneCommande } from '../../models/navire/ligne-commande.model';
import {environment} from "../../../../../environments/environment";
import { AnyRecord } from 'dns';

@Injectable({
  providedIn: 'root'
})
export class LigneCommandeService {

  public server = environment.server + '/ligneCommandes';

  //public mokdata = environment.mockdata ;
  //public swager = environment.swager + '/ligneCommandes'
  //private server = this.swager
  constructor(private http: HttpClient) { }

  getLineCmds():Observable<LigneCommande[]> {
    return this.http.get<LigneCommande[]>(this.server)
  }
  getLineCmd(idCmd: number):Observable<LigneCommande> {
    return this.http.get<LigneCommande>(this.server + '/cmd/' + 1 );
  }
  saveLineCmd(lineCmd:LigneCommande):Observable<LigneCommande>{
    return this.http.post<LigneCommande>(this.server , lineCmd );
  }
  updateAffect(lineCmd: AnyRecord):Observable<LigneCommande> {
    return this.http.put<LigneCommande>(this.server + '/actions/selected', lineCmd) ;
  }
  updateLCMD(lineCmd: any):Observable<any> {
    return this.http.put<any>(this.server , lineCmd)
  }
  getLCMD(id:any):Observable<any>{
    return this.http.get<any>(this.server + '/action/'+ id)
  }
  getLBP(id:any): Observable<any> {
    return this.http.get<any>(this.server + '/findByNumDossier/'+ id)
  }
  getPrestations():Observable<any> {
    return this.http.get<any>(this.server + '/movements') ;
  }
  generateLDC(id:any, ligne:any):Observable<any> {
    return this.http.put<any>(this.server + '/actions/generateCmdLine/' + id, ligne)
  }
  getLinesBP(id:any):Observable<any> {
    return this.http.get<any>(this.server + '/'+ id)
  }
  deleteLDC(id:number):Observable<any>{
    return this.http.delete<any>(this.server +'/action/delete/'+ id)
  }
}
