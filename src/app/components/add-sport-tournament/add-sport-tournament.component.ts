import { Component, OnInit } from '@angular/core';
import {sporttournametcountry} from '../../models/view-models/sportcountrytournament';
import {SportcountrytournamentService} from '../../services/sportcountrytournament.service';
import {Sports} from '../../models/Sports';
import {countries} from '../../models/country.model';
import {sportcountry} from '../../models/sportcountry'
import {tournament} from '../../models/tournaments'
import {SportsService} from '../../services/sports.service';
import {CountryService} from '../../services/country.service';
import {TournamentService} from '../../services/tournament.service';
import { FormBuilder } from '@angular/forms';
import { sportTournamentCountry } from 'src/app/models/sporttournament';
@Component({
  selector: 'app-add-sport-tournament',
  templateUrl: './add-sport-tournament.component.html',
  styleUrls: ['./add-sport-tournament.component.css']
})
export class AddSportTournamentComponent implements OnInit {
  sport:Sports[];
  sportName:string;
  countryName:string;
  TournamentName:string;
  dataFromForm: sportTournamentCountry;
  sportcountries:sportcountry;
  Sportcountry:sportcountry[];
  sportCountryForm: any;
  country:countries[];
  countryId:number=0;
  sportId:number=0;
  tournament:tournament[];
  tournamentId:number=0;
  constructor(private _sportournamentService:SportcountrytournamentService, private sportservice:SportsService, private countryservice:CountryService,private formBuilder: FormBuilder ,private _tournament:TournamentService) { }
  sportcountry: sporttournametcountry[];
  ngOnInit(): void {
    this.DefaultSport();
    this.DefaultCountry();
    this.DefaultTournament();
    this.getSportCountryTournament();
    this.GetCountry();
    this.GetSport();
    this.GetTournament();
  }

  getSportCountryTournament(){
    this._sportournamentService.getSportTournament().subscribe((data:any)=>{
      this.sportcountry=data;
      console.log("Fetched SportCountry :"+this.sportcountry);
    })
  }
  GetSport(){
    this.sportservice.getSports().subscribe((data:any)=>{
      this.sport=data;
      console.log("Concrete Sport Class :"+ this.sport);
    })
    }

    GetCountry(){
      this.countryservice.getCountries().subscribe((data:any)=>{
        this.country=data;
        console.log("Concreate Country Class :", this.country);
      })
    }
    GetTournament(){
      this._tournament.getTournament().subscribe((data:any)=>{
        this.tournament=data;
        console.log("Concreate Tournament Class :", this.tournament);
      })
    }

    SelectedSport(Id:number){
      this.sportId=Id;
    
      
      for (let index = 0; index < this.sport.length; index++) {
        if(this.sport[index].sportId==Id){
          this.sportName=this.sport[index].name;
          break;
        }
        
      }
      console.log("Selected Sport : "+ this.sportName);
      console.log("Selected Sport Id is : "+this.sportId);
    }
  
    SelectedCountry(Id:number){
      this.countryId=Id;
      for (let index = 0; index < this.country.length; index++) {
        if(this.country[index].countryid==Id){
          this.countryName=this.country[index].name;
          break;
        }
      }
      
      console.log("Selected Country Id is : "+this.countryId);
      console.log("Selected Sport : "+ this.countryName);
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

    DefaultSport(){
      if(this.sportName==null){
        this.sportName="Select Sport";
      }
    }
    DefaultCountry(){
      if(this.countryName==null){
        this.countryName="Select Country";
      }
    }
    DefaultTournament(){
      if(this.TournamentName==null){
        this.TournamentName="Select Tournament";
      }
    }
  
    addSportToCountry(sportCountry: sportcountry) {
      if (sportCountry != undefined && sportCountry != null) {
        this._sportournamentService.AddSportTournCountry(sportCountry).subscribe(() => {
          this.getSportCountryTournament();
          this.sportId = null;
          this.countryId = null;
          this.tournamentId=null;
        });
      }
    }
  
    onFormSubmit() {
      var ans=confirm("Are you sure you want to map "+ this.sportName +" to"+ " "+this.countryName +"with "+this.TournamentName);
      if(ans){
        console.log("It worked")
      }else{
        this.countryName="Please select country";
        this.sportName="Please select sport";
      }
      this.GetCountry();
      this.GetSport();
      this.GetTournament();
      this.dataFromForm = {
        sportcountryId:0,
        sportId:this.sportId,
        countryId:this.countryId,
        tournamentId:this.tournamentId
      
      }
      
      this.addSportToCountry(this.dataFromForm);
    }
  
    delete(id:number){
      var ans= confirm("Do you want to delete Sport with Id: "+id)
        if(ans){
          this._sportournamentService.deleteSportTournCountry(id).subscribe((data:any)=>{
            this.getSportCountryTournament();
          },error=> console.error(error))
        }
    }
  
}
