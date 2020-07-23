import { Injectable } from '@angular/core';
import {sportcountryvm} from '../models/view-models/sportcountry';
import { HttpClient} from '@angular/common/http';  
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SportcountryService {
  private rootUrl="http://localhost:5000/";
  sporcountryVM :sportcountryvm[];
  constructor(private _http:HttpClient) { }

  ShowSportCountry():Observable<sportcountryvm[]>{
    return this._http.get<sportcountryvm[]>(this.rootUrl+'api/SportCountry/showsportcountry')
  }

  getSportCountryById(id:number){
    return this._http.get(this.rootUrl+'api/SportCountry/Search?id='+id);
  }
  AddSportCountry(sportcountry){
    return this._http.post(this.rootUrl+'api/SportCountry/',sportcountry);
  }

  deleteSportCountry(id:number){
    return this._http.delete(this.rootUrl+'api/SportCountry/'+id)
  }
  updateSportCountry(sportcountry){
    return this._http.put(this.rootUrl+'api/SportCountry/',sportcountry);
  }
}
