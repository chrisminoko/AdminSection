import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {BettypesService} from '../../services/bettypes.service';
import {bettypes} from '../../models/bettypes';


@Component({
  selector: 'app-add-bet-type',
  templateUrl: './add-bet-type.component.html',
  styleUrls: ['./add-bet-type.component.css']
})
export class AddBetTypeComponent implements OnInit {
  bettype :bettypes[];
  bettypes :bettypes;
  BetTypeForm:any;
  SportUpdate=null;
  FormTitle:string;
  constructor(private _bettypeservice:BettypesService,private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.getbetype();
    this.BetTypeForm=this.formBuilder.group({
      bettype:['',Validators.required],
    })
  }

  getbetype(){
    return this._bettypeservice.getBettype().subscribe((data:any)=>{
      this.bettype=data;
      console.log("BetTypes : "+this.bettype)
    });
  }

  Addbettype(bettype:bettypes){
    if(bettype!=undefined && bettype !=null){
      if(this.SportUpdate==null){
        bettype.betypeid=this.bettype.length+1;
        this._bettypeservice.addBettype(bettype).subscribe(()=>{
          this.getbetype();
          this.resertForm();
        });
        

      }
    }else{
      this._bettypeservice.updateBettype(bettype).subscribe(()=>{
        this.getbetype();
        this.SportUpdate=null;
      })
    }
  }

  delete(id:number){
    var ans= confirm("Do you want to delete Bet Type with Id: "+id)
      if(ans){
        this._bettypeservice.deleteBettype(id).subscribe((data:any)=>{
          this.getbetype();
        },error=> console.error(error))
      }
  }

  onFormSubmit(){
    const sport=this.BetTypeForm.value;
    this.Addbettype(sport);
    this.getbetype();
  }

  resertForm(){
    this.BetTypeForm.reset();
  }

}
