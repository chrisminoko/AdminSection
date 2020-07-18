import { Injectable, Inject } from '@angular/core';  
import { HttpClient,HttpResponse} from '@angular/common/http';  

@Injectable({
  providedIn: 'root'
})
export class SportsService {

  constructor(private _http:HttpClient) { }
  private rootUrl="http://localhost:5000/";
  getSports(){
    return this._http.get(this.rootUrl+'api/SportType')
    
  }


  getSportsById(id:number){
   return this._http.get(this.rootUrl+'api/SportType/get?id='+id)
  }

  addSports(BetTypes){
   return this._http.post(this.rootUrl+'api/SportType',BetTypes)
  }

  deleteSport(id:number){
   return this._http.delete(this.rootUrl+'api/SportType/'+id)
  }
  updateSport(BetTypes){
   return this._http.put(this.rootUrl+'api/SportType/',BetTypes)
  }
}
