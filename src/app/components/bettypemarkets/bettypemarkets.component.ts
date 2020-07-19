import { Component, OnInit } from '@angular/core';
import {bettpemarkets} from '../../models/view-models/bettypemarkets';
import {MarketsService} from '../../services/markets.service';
import {markets} from '../../models/markets';
import {bettypes} from '../../models/bettypes';

import {BettypesService} from '../../services/bettypes.service';
import {BettypemarketsService} from '../../services/bettypemarkets.service';
import {bettypemarket} from '../../models/bettypemarket';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-bettypemarkets',
  templateUrl: './bettypemarkets.component.html',
  styleUrls: ['./bettypemarkets.component.css']
})
export class BettypemarketsComponent implements OnInit {

  constructor(private _bettypemarketservice:BettypemarketsService, private _bettpeService:BettypesService,private _marketService:MarketsService, private formBuilder: FormBuilder) { }
  bettpemarkets :bettpemarkets[];
  markets:markets[];
  marketsName:string;
  bettypesName:string;
  bettypes:bettypes[];
  dataFromForm: bettypemarket;
  BetTypeMarket:bettypemarket[];
  bettypesId:number=0;
  marketsId:number=0;
  ngOnInit(): void {
    this.ShowBetType();
    this.DefaultBettype();
    this.DefaultMarket();
    this.GetBettype();
    this.GetMarkets();
  }

  ShowBetType(){
    this._bettypemarketservice.getBettypeMarket().subscribe((data:any)=>{
      this.bettpemarkets=data;
      console.log('Sport COuntry Vm'+this.bettpemarkets);
    })
  }

  GetMarkets(){
    this._marketService.getMarket().subscribe((data:any)=>{
      this.markets=data;
      console.log("Concrete marketst Class :"+ this.markets);
    })
    }

    GetBettype(){
      this._bettpeService.getBettype().subscribe((data:any)=>{
        this.bettypes=data;
        console.log("Concreate Country Class :", this.bettypes);
      })
    }

    SelectedBettype(Id:number){
      this.bettypesId=Id;
      for (let index = 0; index < this.bettypes.length; index++) {
        if(this.bettypes[index].betypeid==Id){
          this.bettypesName=this.bettypes[index].bettype;
          break;
        }
      }
      
      console.log("Selected Bet type  Id is : "+this.bettypesId);
      console.log("Selected Tournament : "+ this.bettypesName);
    }

    DefaultBettype(){
      if(this.bettypesName==null){
        this.bettypesName="Select Bettype";
      }
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


      
    addSportToCountry(bettpemarket:  bettypemarket) {
      if (bettpemarket != undefined && bettpemarket != null) {
        this._bettypemarketservice.addBettypeMarket(bettpemarket).subscribe(() => {
          this.ShowBetType();
          this.marketsId = null;
          this.bettypesId = null;
        });
      }
    }
  
    onFormSubmit() {
      var ans=confirm("Are you sure you want to map "+ this.bettypesName +" to"+ " "+this.marketsName );
      if(ans){
        console.log("It worked")
      }else{
        this.bettypesName="Please select Bet type";
        this.marketsName="Please select Market Type";
      }
      this.GetMarkets();
      this.GetBettype();
      this.dataFromForm = {
        betTypeMarketID:0,
        betTypeId:this.bettypesId,
        betypeMarketId:this.marketsId
      }
      this.addSportToCountry(this.dataFromForm);
    }
  
    delete(id:number){
      var ans= confirm("Do you want to delete bettype market with Id: "+id)
        if(ans){
          this._bettypemarketservice.deleteBettypeMarket(id).subscribe((data:any)=>{
            this.ShowBetType();
          },error=> console.error(error))
        }
    }

}
