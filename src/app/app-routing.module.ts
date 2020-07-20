import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AddCountryComponent} from '../app/components/add-country/add-country.component';
import { AddEventComponent } from './components/add-event/add-event.component';
import { AddSportCountryComponent } from './components/add-sport-country/add-sport-country.component';
import { AddSportComponent } from './components/add-sport/add-sport.component';
import { AddTournamentComponent } from './components/add-tournament/add-tournament.component';
import { AddSportTournamentComponent } from './components/add-sport-tournament/add-sport-tournament.component';
import { AddBetTypeComponent } from './components/add-bet-type/add-bet-type.component';
import { AddMarketsComponent } from './components/add-markets/add-markets.component';
import { BettypemarketsComponent } from './components/bettypemarkets/bettypemarkets.component';
import { TournamentbettyoeComponent } from './components/tournamentbettyoe/tournamentbettyoe.component';

const routes: Routes = [
  {path: '', redirectTo:'/AddSport',pathMatch:'full'},
  {path:'AddCountry', component:AddCountryComponent},
  {path:'AddEvents', component:AddEventComponent},
  {path:'MapSportCountry', component:AddSportCountryComponent},
  {path:'AddSport', component:AddSportComponent},
  {path:'AddTournament', component:AddTournamentComponent},
  {path:'MergeJoin', component:AddSportTournamentComponent},
  {path:'AddBettype', component:AddBetTypeComponent},
  {path:'AddMarket', component:AddMarketsComponent},
  {path:'AddMarketBettype', component:BettypemarketsComponent},
  {path:'AddTournamentBettype', component:TournamentbettyoeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
