import { Component, OnInit } from '@angular/core';
import {oddseventsvm} from '../../models/view-models/oddseventvm';
import {MarketsService} from '../../services/markets.service';
import {markets} from '../../models/markets';
import {eventdetails} from '../../models/view-models/eventdetails';
import {oddevent} from '../../models/oddEvent';
import {EventService} from '../../services/event.service';
import { FormBuilder, Validators } from '@angular/forms';
import { OddseventsService } from 'src/app/services/oddsevents.service';


@Component({
  selector: 'app-oddsevents',
  templateUrl: './oddsevents.component.html',
  styleUrls: ['./oddsevents.component.css']
})
export class OddseventsComponent implements OnInit {

  constructor(private _marketService:MarketsService, private formBuilder: FormBuilder , private _eventService:EventService,private _oddsService:OddseventsService) { }
  event :eventdetails[];
  evnts :eventdetails[];
  oddseventsvm:oddseventsvm[];
  markets:markets[];
  oddsForm:any;
  odds:oddevent[];
  marketsName:string;
  marketsId:number=0;
  eventsName:string;
  eventsId:number=0;
  ngOnInit(): void {
    this.oddsForm=this.formBuilder.group({
      odds:['',Validators.required]
    });
    this.getOdds()
    this.getEventDetails();
    this.DefaultEvent();
    this.GetMarkets();
    this.DefaultMarket();
  }

  getOdds(){
    this._oddsService.getOddsEvent().subscribe((data:oddseventsvm[])=>{
      this.oddseventsvm=data;
      console.log("Odds Details : "+ this.oddseventsvm)
    })
  }
  getEventDetails(){
    this._eventService.getEventsDetails().subscribe((data:any)=>{
      this.evnts=data;
      console.log("Events : "+ this.evnts);
    })
  }

  GetMarkets(){
    this._marketService.getMarket().subscribe((data:any)=>{
      this.markets=data;
      console.log("Concrete marketst Class :"+ this.markets);
    })
  }

  SelectedMarket(Id:number){
    this.marketsId=Id;
    for (let index = 0; index < this.markets.length; index++) {
      if(this.markets[index].marketId==Id){
        this.marketsName=this.markets[index].markeType;
        break;
      }
    }
    
    console.log("Selected Bet type  Id is : "+this.marketsId);
    console.log("Selected Tournament : "+ this.marketsName);
  }

  DefaultMarket(){
    if(this.marketsName==null){
      this.marketsName="Select Market";
    }
  }


  SelectedEvent(Id:number){
    this.eventsId=Id;
    for (let index = 0; index < this.evnts.length; index++) {
      if(this.evnts[index].eventId==Id){
        this.eventsName=this.evnts[index].eventName;
        break;
      }
    }
    
    console.log("Selected Event  Id is : "+this.eventsId);
    console.log("Selected Event : "+ this.eventsName);
  }

  DefaultEvent(){
    if(this.eventsName==null){
      this.eventsName="Select Event";
    }
  }

  addOddEvent(event: oddevent) {
    if (event != undefined && event != null) {
      this.getOdds();
      event.marketID=this.marketsId
      event.eventsId=this.eventsId;
      this._oddsService.addOddsEvent(event).subscribe(() => {
        this.getEventDetails();
        this.clearForm();
      });
    }
  }

  onFormSubmit() {
   
    var ans=confirm("Are you sure you want to map "+ this.eventsName +"  for the "+this.marketsName+" market");
    if(ans){
      console.log("It worked");
      const formData=this.oddsForm.value;
      this.addOddEvent(formData);
      this.getOdds();
    }else{
      this.eventsName="Please select Event";
      this.marketsName="Please select Market";
    }
    this.getOdds();
 
 
  
  }

  delete(id:number){
    var ans= confirm("Do you want to delete Sport with Id: "+id)
      if(ans){
        this._oddsService.deleteOddsEvent(id).subscribe((data:any)=>{
          this.getOdds();
        },error=> console.error(error))
      }
  }

  clearForm(){
    this.oddsForm.reset();
  }

}
