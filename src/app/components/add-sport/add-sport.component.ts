import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {SportsService} from '../../services/sports.service';
import {Sports} from '../../models/Sports';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-sport',
  templateUrl: './add-sport.component.html',
  styleUrls: ['./add-sport.component.css']
})
export class AddSportComponent implements OnInit {
  sport :Sports[];
  sports :Sports;
  pageOfItems: Array<any>;
  SportForm:any;
  SportID :number;
  SportUpdate:number;
  FormTitle:string;
  title: string="Add Sport";
  count=1;
 
  constructor(private _sportservice:SportsService,private formBuilder:FormBuilder ,private _avRoute: ActivatedRoute,private _router:Router) { }

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

      }else {
        
        this.title="Update";
        sport.sportId=this.SportUpdate;
        console.log(" Logged "+this.SportUpdate)
        this._sportservice.updateSport(sport).subscribe((data:any)=>{
          this.getSport();
          console.log("Edited : "+ data)
          this.SportUpdate=null;
         
        })
      }
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
  LoadDataForEdit(sportID:number){
    this.count=0;
    console.log("AM IN !!" + this.count)
    this.title="Update";
    this.SportUpdate=sportID;
    console.log("ID LOADED: "+this.SportUpdate)
    this._sportservice.getSportsById(sportID).subscribe((data:any)=>{
      console.log("Selected Sport : "+ data.name);
      console.log("URL"+ data.imageurl)
      this.SportForm.controls['name'].setValue(data.name);
      this.SportForm.controls['imageUrl'].setValue(data.imageurl);
    })
  }

  onFormSubmit(){
    const sport=this.SportForm.value;
    this.AddSport(sport);
    this.resertForm();
    this.getSport();
    
  }

  resertForm(){
    this.SportForm.reset();
    this.title="Add Sport";
    this.count=1;
  }



}
