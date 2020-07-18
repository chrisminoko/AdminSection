import { Injectable, Inject } from '@angular/core';  
import { HttpClient,HttpResponse} from '@angular/common/http';  
import { Observable } from 'rxjs';
import {tournament} from '../models/tournaments';

@Injectable({
  providedIn: 'root'
})
export class TournamentService {

  private rootUrl="http://localhost:5000/";
  constructor(private _http:HttpClient) { }

  getTournament():Observable<tournament[]>{
    return this._http.get<tournament[]>(this.rootUrl+'api/Tournament/GetAll')
  }

  getTournamentById(id:number){
   return this._http.get(this.rootUrl+'api/Tournament/Search?id='+id)
  }

  addTournament(tournament){
   return this._http.post(this.rootUrl+'api/Tournament',tournament)
  }

  deleteTournament(id:number){
   return this._http.delete(this.rootUrl+'api/Tournament/'+id)
  }
  updateTournament(tournament){
   return this._http.put(this.rootUrl+'api/Tournament/',tournament)
  }
}
