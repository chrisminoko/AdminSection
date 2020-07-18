import { Injectable, Inject } from '@angular/core';  
import { HttpClient,HttpResponse} from '@angular/common/http';  

@Injectable({
  providedIn: 'root'
})
export class MarketsService {

  private rootUrl="http://localhost:5000/";
  constructor(private _http:HttpClient) { }
  getMarket(){
    return this._http.get(this.rootUrl+'api/Markets')
    
  }


  getMarketById(id:number){
   return this._http.get(this.rootUrl+'api/Markets/Search?id='+id)
  }

  addMarket(Markets){
   return this._http.post(this.rootUrl+'api/Markets',Markets)
  }

  deleteMarket(id:number){
   return this._http.delete(this.rootUrl+'api/Markets/'+id)
  }
  updateMarket(Markets){
   return this._http.put(this.rootUrl+'api/Markets/',Markets)
  }
}
