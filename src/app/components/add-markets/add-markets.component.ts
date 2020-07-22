import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {MarketsService} from '../../services/markets.service';
import {markets} from '../../models/markets';

@Component({
  selector: 'app-add-markets',
  templateUrl: './add-markets.component.html',
  styleUrls: ['./add-markets.component.css']
})
export class AddMarketsComponent implements OnInit {
  market :markets[];
  markets :markets;
  MarketForm:any;
  SportUpdate:number;
  count=1;
  FormTitle:string;
  title: string="Add Market";
  constructor(private _marketservice:MarketsService,private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.getMarket();
    this.MarketForm=this.formBuilder.group({
      markeType:['',Validators.required],
    })
  }
  getMarket(){
    return this._marketservice.getMarket().subscribe((data:any)=>{
      this.market=data;
      console.log("Markets : "+this.market)
    });
  }

  AddMarkets(market:markets){
    if(market!=undefined && market !=null){
      if(this.SportUpdate==null){
        market.marketId=this.market.length+1;
        this._marketservice.addMarket(market).subscribe(()=>{
          this.getMarket();
          this.resertForm();
        });

      }else{
        market.marketId=this.SportUpdate;
        this._marketservice.updateMarket(market).subscribe(()=>{
          this.getMarket();
          this.SportUpdate=null;
        })
      }
    }
  }

  delete(id:number){
    var ans= confirm("Do you want to delete market with Id: "+id)
      if(ans){
        this._marketservice.deleteMarket(id).subscribe((data:any)=>{
          this.getMarket();
        },error=> console.error(error))
      }
  }

  onFormSubmit(){
    const sport=this.MarketForm.value;
    this.AddMarkets(sport);
    this.getMarket();
    this.resertForm();
  }

  resertForm(){
    this.MarketForm.reset();
    this.title="Add Bet Type";
    this.count=1;
  }
  LoadDataForEdit(sportID:number){
    this.count=0;
    console.log("AM IN !!" + this.count)
    this.title="Update";
    this.SportUpdate=sportID;
    console.log("ID LOADED: "+this.SportUpdate)
    this._marketservice.getMarketById(sportID).subscribe((data:any)=>{
      console.log("Selected Sport : "+ data.markeType);
      this.MarketForm.controls['markeType'].setValue(data.markeType);
    })
  }
}
