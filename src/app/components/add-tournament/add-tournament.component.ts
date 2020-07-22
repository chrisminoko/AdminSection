import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {TournamentService} from '../../services/tournament.service';
import {tournament} from '../../models/tournaments';


@Component({
  selector: 'app-add-tournament',
  templateUrl: './add-tournament.component.html',
  styleUrls: ['./add-tournament.component.css']
})
export class AddTournamentComponent implements OnInit {
  tournament :tournament[];
  tournaments :tournament;
  tournamentForm:any;
  tournamentUpdate=null;
  FormTitle:string;
  count=1;
  title: string="Add Tournament";
  SportUpdate:number;
  constructor(private _tournamentservice:TournamentService,private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.getTournament();
    this.tournamentForm=this.formBuilder.group({
      name:['',Validators.required],
    })
  }

  getTournament(){
    this._tournamentservice.getTournament().subscribe((data:any)=>{
      this.tournament=data;
      console.log("Sports : "+ this.tournament);
    })
  }
  AddTournament(tournament:tournament){
    if(tournament!=undefined && tournament !=null){
      if(this.tournamentUpdate==null){
        tournament.tournamentId=this.tournament.length+1;
        this._tournamentservice.addTournament(tournament).subscribe(()=>{
          this.getTournament();
          this.resertForm();
        });
        

      }
    }else{
      this.title="Update";
      tournament.tournamentId=this.SportUpdate;
      this._tournamentservice.updateTournament(tournament).subscribe(()=>{
        this.getTournament();
        this.tournamentUpdate=null;
      })
    }
  }

  delete(id:number){
    var ans= confirm("Do you want to delete Tournament with Id: "+id)
      if(ans){
        this._tournamentservice.deleteTournament(id).subscribe((data:any)=>{
          this.getTournament();
        },error=> console.error(error))
      }
  }

  onFormSubmit(){
    const sport=this.tournamentForm.value;
    this.AddTournament(sport);
    this.getTournament();
  }

  resertForm(){
    this.tournamentForm.reset();
    this.title="Add Tournament";
    this.count=1;
  }

  LoadDataForEdit(sportID:number){
    this.count=0;
    this.title="Update";
    this.SportUpdate=sportID;
    console.log("ID LOADED: "+this.SportUpdate)
    this._tournamentservice.getTournamentById(sportID).subscribe((data:any)=>{
      console.log("Selected Tournament : "+ data.name);
      this.tournamentForm.controls['name'].setValue(data.name);
    })
  }

}
