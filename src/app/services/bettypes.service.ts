import { Injectable, Inject } from '@angular/core';  
import { HttpClient,HttpResponse} from '@angular/common/http';  

@Injectable({
  providedIn: 'root'
})
export class BettypesService {

  private rootUrl="http://localhost:5000/";
  constructor(private _http:HttpClient) { }
  getBettype(){
    return this._http.get(this.rootUrl+'api/BetTypes/GetAll')
    
  }

  getBettypeById(id:number){
   return this._http.get(this.rootUrl+'api/BetTypes/Search?id='+id)
  }

  addBettype(BetTypes){
   return this._http.post(this.rootUrl+'api/BetTypes',BetTypes)
  }

  deleteBettype(id:number){
   return this._http.delete(this.rootUrl+'api/BetTypes/'+id)
  }
  updateBettype(BetTypes){
   return this._http.put(this.rootUrl+'api/BetTypes/',BetTypes)
  }
}
