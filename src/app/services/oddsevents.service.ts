import { Injectable, Inject } from '@angular/core';  
import { HttpClient,HttpResponse} from '@angular/common/http';  

@Injectable({
  providedIn: 'root'
})
export class OddseventsService {


  private rootUrl="http://localhost:5000/";
  constructor(private _http:HttpClient) { }

  getOddsEvent(){
    return this._http.get(this.rootUrl+'api/OddsEvent');
  }

  getOddsEventById(id:number){
    return this._http.get(this.rootUrl+'api/OddsEvent/Search?id='+id)
   }
 
   addOddsEvent(OddsEvent){
    return this._http.post(this.rootUrl+'api/OddsEvent/',OddsEvent)
   }
 
   deleteOddsEvent(id:number){
    return this._http.delete(this.rootUrl+'api/OddsEvent/'+id)
   }
   updateOddsEvent(OddsEvent){
    return this._http.put(this.rootUrl+'api/OddsEvent/',OddsEvent)
   }
}
