import { Injectable } from '@angular/core';
import {countries} from '../models/country.model';
import { HttpClient} from '@angular/common/http';  
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  private rootUrl="http://localhost:5000/";
  country :countries[];

  constructor(private _http:HttpClient) { }

  getCountries():Observable<countries[]>{
    return this._http.get<countries[]>(this.rootUrl+'api/Country/GetAll')
  }

  getCountryById(id:number):Observable<countries[]>{
   return this._http.get<countries[]>(this.rootUrl+'api/Country/Search?sportid='+id)
   }
  
   addCountry(country):Observable<countries[]>{
    return this._http.post<countries[]>(this.rootUrl+'api/Country',country)
   }
   deleteCountry(id:number):Observable<countries[]>{
    return this._http.delete<countries[]>(this.rootUrl+'api/Country/'+id)
   }
   updateCountry(country):Observable<countries[]>{
    return this._http.put<countries[]>(this.rootUrl+'api/Country/',country)
   }
 

}
