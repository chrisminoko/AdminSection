import { Injectable, Inject } from '@angular/core';  
import { HttpClient,HttpResponse} from '@angular/common/http';  

@Injectable({
  providedIn: 'root'
})
export class TournamentbetypeService {

  private rootUrl="http://localhost:5000/";
  constructor(private _http:HttpClient) { }

  getTournamentBettpe(){
    return this._http.get(this.rootUrl+'api/TournamentBettpe')
    
  }


  getTournamentBettpeId(id:number){
   return this._http.get(this.rootUrl+'api/TournamentBettpe/Search?id='+id)
  }

  addTournamentBettpe(TournamentBettpe){
    console.log("What being posted : "+TournamentBettpe)
   return this._http.post(this.rootUrl+'api/TournamentBettpe',TournamentBettpe)
  }

  deleteTournamentBettpe(id:number){
   return this._http.delete(this.rootUrl+'api/TournamentBettpe/'+id)
  }
  updateTournamentBettpe(TournamentBettpe){
   return this._http.put(this.rootUrl+'api/TournamentBettpe/',TournamentBettpe)
  }
}
