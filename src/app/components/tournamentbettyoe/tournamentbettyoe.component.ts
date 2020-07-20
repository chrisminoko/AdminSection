import { Component, OnInit } from '@angular/core';
import {tournamentbettypevm} from '../../models/view-models/tournamentbettpes';
import {tournamentbetype} from '../../models/tournamentbetype';
import {TournamentbetypeService} from '../../services/tournamentbetype.service';
import {tournament} from '../../models/tournaments';
import {bettypes} from '../../models/bettypes';
import {TournamentService} from '../../services/tournament.service';
import {BettypesService} from '../../services/bettypes.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-tournamentbettyoe',
  templateUrl: './tournamentbettyoe.component.html',
  styleUrls: ['./tournamentbettyoe.component.css']
})
export class TournamentbettyoeComponent implements OnInit {
  tournamentbettype :tournamentbettypevm[];
  dataFromForm: tournamentbetype;
  tournament:tournament[];
  TournamentName:string;
  tournamentId:number=0;
  bettypes:bettypes[];
  bettypesName:string;
  bettypesId:number=0;
  constructor(private _bettpeService:BettypesService,private _tournamentbetypeservice:TournamentbetypeService, private formBuilder: FormBuilder ,private _tournament:TournamentService) { }

  ngOnInit(): void {
    this.GetTournamentBettype();
    this.DefaultBettype();
    this.GetBettype();
    this.GetTournament();
    this.DefaultTournament();
  }
  GetTournamentBettype(){
    this._tournamentbetypeservice.getTournamentBettpe().subscribe((data:any)=>{
      this.tournamentbettype= data;
      console.log("Tournament Bet Types : "+this.tournamentbettype)
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

  addSportToCountry(tournamentbettpes: tournamentbetype) {
    if (tournamentbettpes != undefined && tournamentbettpes != null) {
      this._tournamentbetypeservice.addTournamentBettpe(tournamentbettpes).subscribe(() => {
        this.GetTournamentBettype();
        this.bettypesId = null;
        this.tournamentId=null;
      });
    }
  }

  onFormSubmit() {
    var ans=confirm("Are you sure you want to map "+ this.bettypesName +" to "+ " the "+this.TournamentName +" Tournament ");
    if(ans){
      console.log("It worked")
    }else{
      this.TournamentName="Please select Tournament";
      this.bettypesName="Please select Bet Type";
    }
    this.GetBettype();
    this.GetTournament();
    this.dataFromForm = {
      id:0,
      tournamentBetypeID:this.bettypesId,
      tournamentId:this.tournamentId
    }
    
    this.addSportToCountry(this.dataFromForm);
    this.GetTournamentBettype();
  }

  delete(id:number){
    var ans= confirm("Do you want to delete this tournament bettype with Id: "+id)
      if(ans){
        this._tournamentbetypeservice.deleteTournamentBettpe(id).subscribe((data:any)=>{
          this.GetTournamentBettype();
        },error=> console.error(error))
      }
  }

  

}
