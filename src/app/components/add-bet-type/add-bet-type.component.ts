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
  SportUpdate:number;
  FormTitle:string;
  count=1;
  title: string="Add Bettype";
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

      }else{
        
        this.title="Update";
        bettype.betypeid=this.SportUpdate;
        this._bettypeservice.updateBettype(bettype).subscribe(()=>{
          this.getbetype();
          console.log("Fetched ID: "+this.SportUpdate)
          this.SportUpdate=null;
        })
      }
    }
  }

  delete(id:number){
    
    for (let index = 0; index < this.bettype.length; index++) {
      if(this.bettype[index].betypeid==id){
        var ans= confirm("Do you want to delete : "+ this.bettype[index].bettype)
        if(ans){
          this._bettypeservice.deleteBettype(id).subscribe((data:any)=>{
            this.getbetype();
          },error=> console.error(error))
        }
        break
      }
      
      
    }

  }

  onFormSubmit(){
    const sport=this.BetTypeForm.value;
    this.Addbettype(sport);
    this.getbetype();
  }

  resertForm(){
    this.BetTypeForm.reset();
    this.title="Add Bet Type";
    this.count=1;
  }

  LoadDataForEdit(sportID:number){
    this.count=0;
    console.log("AM IN !!" + this.count)
    this.title="Update";
    this.SportUpdate=sportID;
    console.log("ID LOADED: "+this.SportUpdate)
    this._bettypeservice.getBettypeById(sportID).subscribe((data:any)=>{
      console.log("Selected Sport : "+ data.bettype);
      this.BetTypeForm.controls['bettype'].setValue(data.bettype);
    })
  }


}
