import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddCountryComponent } from './components/add-country/add-country.component';
import { AddEventComponent } from './components/add-event/add-event.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddSportCountryComponent } from './components/add-sport-country/add-sport-country.component';
import { AddSportComponent } from './components/add-sport/add-sport.component';
import { AddTournamentComponent } from './components/add-tournament/add-tournament.component';
import { AddSportTournamentComponent } from './components/add-sport-tournament/add-sport-tournament.component';
import { AddBetTypeComponent } from './components/add-bet-type/add-bet-type.component';
import { AddMarketsComponent } from './components/add-markets/add-markets.component';
import { BettypemarketsComponent } from './components/bettypemarkets/bettypemarkets.component';
import { TournamentbettyoeComponent } from './components/tournamentbettyoe/tournamentbettyoe.component';
import { OddseventsComponent } from './components/oddsevents/oddsevents.component';
import { JwPaginationModule } from 'jw-angular-pagination';
@NgModule({
  declarations: [
    AppComponent,
    AddCountryComponent,
    AddEventComponent,
    AddSportCountryComponent,
    AddSportComponent,
    AddTournamentComponent,
    AddSportTournamentComponent,
    AddBetTypeComponent,
    AddMarketsComponent,
    BettypemarketsComponent,
    TournamentbettyoeComponent,
    OddseventsComponent,
    
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule ,
    FormsModule,
    ReactiveFormsModule,
    JwPaginationModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
