import { Injectable, Inject } from '@angular/core';  
import { HttpClient,HttpResponse} from '@angular/common/http';  

@Injectable({
  providedIn: 'root'
})
export class BettypemarketsService {

  private rootUrl="http://localhost:5000/";
  constructor(private _http:HttpClient) { }

  getBettypeMarket(){
    return this._http.get(this.rootUrl+'api/BettypeMarket');
  }

  getBettypeMarketById(id:number){
    return this._http.get(this.rootUrl+'api/BettypeMarket/Search?id='+id)
   }
 
   addBettypeMarket(BettypeMarket){
    return this._http.post(this.rootUrl+'api/BettypeMarket',BettypeMarket)
   }
 
   deleteBettypeMarket(id:number){
    return this._http.delete(this.rootUrl+'api/BettypeMarket/'+id)
   }
   updateBettypeMarket(BettypeMarket){
    return this._http.put(this.rootUrl+'api/BettypeMarket/',BettypeMarket)
   }

}
