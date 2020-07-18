import { Injectable, Inject } from '@angular/core';  
import { HttpClient,HttpResponse} from '@angular/common/http';  

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private rootUrl="http://localhost:5000/";
  constructor(private _http:HttpClient) { }

  getEventsDetails(){
    return this._http.get(this.rootUrl+'api/Events/ShowEvents')
  }
  getEventsById(id:number){
    return this._http.get(this.rootUrl+'api/Events/Search?id='+id)
   }
 
   addEvents(events){
    return this._http.post(this.rootUrl+'api/Events',events)
   }
 
   deleteEvents(id:number){
    return this._http.delete(this.rootUrl+'api/Events/'+id)
   }
   updateEvents(events){
    return this._http.put(this.rootUrl+'api/Events/',events)
   }

}
