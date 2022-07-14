import { Injectable } from '@angular/core';
import {environment} from "../../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import { Commande } from '../../models/navire/commande.model';

@Injectable({
  providedIn: 'root'
})
export class CommandeService {

  public server = environment.server + '/commandes';

  constructor(private http: HttpClient) { }

  getAllCmd(page:number , size:number): Observable<Commande> {
    return this.http.get<Commande>(this.server + '?size='+size+'&page='+page) ;
  }
  saveCmd(commande :Commande) : Observable<Commande> {
    return this.http.post<Commande>(this.server , commande ) ;
  }
  generateCmd(numeroEscale: number): Observable<any>{
    return this.http.get<any>(this.server + '/actions/generateCmd/'+ numeroEscale )
  }
  getCmdByid(id: string):Observable<any>{
    return this.http.get<any>(this.server + '/'+ id)
  }  
  generateBP(id: string):Observable<any> {
    return this.http.get<any>(this.server + '/actions/transformtobp/' + id)
  }
  validateBP(id: string):Observable<any> {
    return this.http.get<any>(this.server + '/actions/validate/' + id)
  }
  unvalidateBP(id: string):Observable<any> {
    return this.http.get<any>(this.server + '/actions/validate/' + id)
  }
  sendBP(id: string):Observable<any> {
    return this.http.get<any>(this.server + '/actions/send/' + id)
  }
  updateCMD(cmd:any): Observable<any> {
    return this.http.put<Commande> (this.server + '/', cmd) ;
  }  
  filterCmd(code, num, nom,page,size):Observable<any>{
    return this.http.get<any>(this.server + '/actions/filter?codeClient='+ code +'&numeroEscale='+ num+'&nomClient='+nom+'&page='+page+'&size='+ size)
  }
  getBP(page  , size): Observable<any> {
    return this.http.get<any>(this.server + '/bulletins/history'+'?size='+size+'&page='+page) ;
  }
  getBPnotsent(page  , size): Observable<any> {
    return this.http.get<any>(this.server + '/bulletins'+'?size='+size+'&page='+page) ;
  }
  getCmdHistory(page  , size): Observable<any> {
    return this.http.get<any>(this.server + '/actions/history'+'?size='+size+'&page='+page) ;
  }
  validateCMD(numBp:any, value:boolean):Observable<any> {
    return this.http.get<any>(this.server + '/actions/validate/' +numBp+ '/'+ value)
  }
  sendCMD(numBp:any):Observable<any> {
    return this.http.get<any>(this.server + '/actions/send/' +numBp)
  }
  cancelCMD(numBp:any):Observable<any> {
    return this.http.get<any>(this.server + '/actions/cancel/' +numBp)
  }
  cancelGenerationCMD(numCmd:any):Observable<any> {
    return this.http.get<any>(this.server + '/actions/cancelGeneration/' +numCmd)
  }
  

  getReasons():Observable<any>{
    return this.http.get<any>(this.server + '/cancel/motif')
  }

  preValidateBP(numBp : any, value: any){
    return this.http.get<any>(this.server + '/actions/preValidate/'+numBp+'/'+value)
  }
  precancelBP(numBp:any, body:any, value:boolean):Observable<any> {
    return this.http.put<any>(this.server + '/actions/preCancel/' +numBp+ '/'+ value, body)
  }
  cancelBP(numBp : any){
    return this.http.get<any>(this.server + '/actions/cancel/'+ numBp)
  }

  findAllPreCanceled():Observable<any> {
    return this.http.get<any>(this.server + '/precancled')
  }

  findAllPreValidated():Observable<any> {
    return this.http.get<any>(this.server + '/prevalidated')
  }
  


  

  
  
 
  

}

