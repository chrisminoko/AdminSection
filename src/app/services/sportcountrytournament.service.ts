import { Injectable } from '@angular/core';
import {countries} from '../models/country.model';
import { HttpClient} from '@angular/common/http';  
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SportcountrytournamentService {

  private rootUrl="http://localhost:5000/";
  constructor(private _http:HttpClient) { }
  getSportTournament(){
    return this._http.get(this.rootUrl+'api/SportTournament/GetDetails')
  }

  AddSportTournCountry(sportcountry){
    return this ._http.post(this.rootUrl+"api/SportTournament/",sportcountry);
  }

  deleteSportTournCountry(id:number){
    return this._http.delete(this.rootUrl+'api/SportTournament/'+id)
  }

}
