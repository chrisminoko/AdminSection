import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {EventService} from '../../services/event.service';
import {Events} from '../../models/events';

import {eventdetails} from '../../models/view-models/eventdetails';
import {TournamentService} from '../../services/tournament.service';
import {tournament} from '../../models/tournaments';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css']
})
export class AddEventComponent implements OnInit {
  event :eventdetails[];
  evnts :eventdetails;
  EventForm:any;
  EventUpdate=null;
  FormTitle:string;
  tournament:tournament[];
  tournamentId:number=0;
  TournamentName:string;
  
  constructor(private _eventService:EventService,private formBuilder:FormBuilder,private _tournament:TournamentService) { }

  ngOnInit(): void {
    this.EventForm=this.formBuilder.group({
      eventName:['',Validators.required],
      eventDate:['',Validators.required],
     })
    this.getEventDetails();
    this.GetTournament();
    this.DefaultTournament();
  }

  getEventDetails(){
    this._eventService.getEventsDetails().subscribe((data:any)=>{
      this.evnts=data;
      console.log("Events : "+ this.evnts);
    })
  }

  GetTournament(){
    this._tournament.getTournament().subscribe((data:any)=>{
      this.tournament=data;
      console.log("Concreate Tournament Class :", this.tournament);
    })
  }
  SelectedTournament(Id:number){
    this.tournamentId=Id;
    for (let index = 0; index < this.tournament.length; index++) {
      if(this.tournament[index].tournamentId==Id){
        this.TournamentName=this.tournament[index].name;
        break;
      }
    }
    
    console.log("Selected Tournament Id is : "+this.tournamentId);
    console.log("Selected Tournament : "+ this.TournamentName);
  }
  DefaultTournament(){
    if(this.TournamentName==null){
      this.TournamentName="Select Tournament";
    }
  }

  addSportToCountry(event: Events) {
    if (event != undefined && event != null) {
      this._eventService.addEvents(event).subscribe(() => {
        this.getEventDetails();
        this.tournamentId=null;
      });
    }
  }

  onFormSubmit(name:string,date:Date) {
    var ans=confirm("Are you sure you want to map "+ this.TournamentName +" to the entered events");
    if(ans){
      console.log("It worked")
    }else{
      this.TournamentName="Please select Tournament";
    
    }
    this.GetTournament();
    this.EventForm = {
      eventName:name,
      eventDate:date,
      tournamentId:this.tournamentId,
      
     
    }
 
    this.addSportToCountry(this.EventForm);
  }

  delete(id:number){
    var ans= confirm("Do you want to delete Event with Id: "+id)
      if(ans){
        this._eventService.deleteEvents(id).subscribe((data:any)=>{
          this.getEventDetails();
        },error=> console.error(error))
      }
  }

}
