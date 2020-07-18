import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {SportsService} from '../../services/sports.service';
import {Sports} from '../../models/Sports';

@Component({
  selector: 'app-add-sport',
  templateUrl: './add-sport.component.html',
  styleUrls: ['./add-sport.component.css']
})
export class AddSportComponent implements OnInit {
  sport :Sports[];
  sports :Sports;
  SportForm:any;
  SportUpdate=null;
  FormTitle:string;
  constructor(private _sportservice:SportsService,private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.getSport();
    this.SportForm=this.formBuilder.group({
      name:['',Validators.required],
      imageUrl:['',Validators.required],
    })
  }

  getSport(){
    this._sportservice.getSports().subscribe((data:any)=>{
      this.sport=data;
      console.log("Sports : "+ this.sport);
    })
  }

  AddSport(sport:Sports){
    if(sport!=undefined && sport !=null){
      if(this.SportUpdate==null){
        sport.sportId=this.sport.length+1;
        this._sportservice.addSports(sport).subscribe(()=>{
          this.getSport();
          this.resertForm();
        });
        

      }
    }else{
      this._sportservice.updateSport(sport).subscribe(()=>{
        this.getSport();
        this.SportUpdate=null;
      })
    }
  }

  delete(id:number){
    var ans= confirm("Do you want to delete Sport with Id: "+id)
      if(ans){
        this._sportservice.deleteSport(id).subscribe((data:any)=>{
          this.getSport();
        },error=> console.error(error))
      }
  }

  onFormSubmit(){
    const sport=this.SportForm.value;
    this.AddSport(sport);
    this.getSport();
  }

  resertForm(){
    this.SportForm.reset();
  }


}
