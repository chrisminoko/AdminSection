import { Component, OnInit } from '@angular/core';
import { sportcountryvm } from '../../models/view-models/sportcountry';
import { SportcountryService } from '../../services/sportcountry.service';
import { Sports } from '../../models/Sports';
import { countries } from '../../models/country.model';
import { sportcountry } from '../../models/sportcountry'
import { SportsService } from '../../services/sports.service';
import { CountryService } from '../../services/country.service';
import { FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-add-sport-country',
  templateUrl: './add-sport-country.component.html',
  styleUrls: ['./add-sport-country.component.css']
})
export class AddSportCountryComponent implements OnInit {

  constructor(private _sporcountyvmServices: SportcountryService, private sportservice: SportsService, private countryservice: CountryService, private formBuilder: FormBuilder) { }
  sportCountryVm: sportcountryvm[];
  sport: Sports[];
  sportName: string;
  countryName: string;
  dataFromForm: sportcountry;
  sportcountries: sportcountry;
  Sportcountry: sportcountry[];
  sportCountryForm: any;
  country: countries[];
  countryId: number = 0;
  sportId: number = 0;
  SportUpdate: number;
  count = 1;
  FormTitle: string;
  title: string = "Map";
  ngOnInit(): void {
    this.DefaultSport();
    this.DefaultCountry();
    this.ShowSportCountry();
    this.GetCountry();
    this.GetSport();
    this.sportCountryForm = this.formBuilder.group({

    });
  }

  ShowSportCountry() {
    this._sporcountyvmServices.ShowSportCountry().subscribe((data: any) => {
      this.sportCountryVm = data;
      console.log('Sport COuntry Vm' + this.sportCountryVm);
    })
  }

  GetSport() {
    this.sportservice.getSports().subscribe((data: any) => {
      this.sport = data;
      console.log("Concrete Sport Class :" + this.sport);
    })
  }

  GetCountry() {
    this.countryservice.getCountries().subscribe((data: any) => {
      this.country = data;
      console.log("Concreate Country Class :", this.country);
    })
  }
  DefaultSport() {
    if (this.sportName == null) {
      this.sportName = "Select Sport";
    }
  }
  DefaultCountry() {
    if (this.countryName == null) {
      this.countryName = "Select Country";
    }
  }

  SelectedSport(Id: number) {
    this.sportId = Id;


    for (let index = 0; index < this.sport.length; index++) {
      if (this.sport[index].sportId == Id) {
        this.sportName = this.sport[index].name;
        break;
      }

    }
    console.log("Selected Sport : " + this.sportName);
    console.log("Selected Sport Id is : " + this.sportId);
  }

  SelectedCountry(Id: number) {
    this.countryId = Id;
    for (let index = 0; index < this.country.length; index++) {
      if (this.country[index].countryid == Id) {
        this.countryName = this.country[index].name;
        break;
      }
    }

    console.log("Selected Country Id is : " + this.countryId);
  }


  addSportToCountry(sportCountry: sportcountry) {
    if (sportCountry != undefined && sportCountry != null) {

      if (this.SportUpdate == null) {
        this._sporcountyvmServices.AddSportCountry(sportCountry).subscribe(() => {
          this.ShowSportCountry();
          this.resertForm();
        });
      }else {
        this.title="Update";
        sportCountry.sportcountryId=this.SportUpdate;
        sportCountry.sportId=this.sportId;
        sportCountry.countryId=this.countryId;
        console.log(" Logged "+this.SportUpdate)
        this._sporcountyvmServices.updateSportCountry(sportCountry).subscribe((data:any)=>{
          this.ShowSportCountry();
          console.log("Edited : "+ data)
          this.SportUpdate=null;
         
        })
      }
    }
  }

  onFormSubmit() {
    var ans = confirm("Are you sure you want to map " + this.sportName + " to" + " " + this.countryName);
    if (ans) {
      console.log("It worked")
    } else {
      this.countryName = "Please select country";
      this.sportName = "Please select sport";
    }
    this.GetCountry();
    this.GetSport();
    this.dataFromForm = {
      sportcountryId: 0,
      sportId: this.sportId,
      countryId: this.countryId,

    }

    this.addSportToCountry(this.dataFromForm);
  }

  delete(id: number) {
    var ans = confirm("Do you want to delete Sport with Id: " + id)
    if (ans) {
      this._sporcountyvmServices.deleteSportCountry(id).subscribe((data: any) => {
        this.ShowSportCountry();
      }, error => console.error(error))
    }
  }

  resertForm() {
    this.sportCountryForm.reset();
    this.title = "Add Country";
    this.count = 1;
  }

  LoadDataForEdit(Id:number) {
    console.log("Clicked ID : "+Id);
    this.count = 0;
    this.title = "Update";
  
    this.GetDefaultSportCountry(Id);
  }

  GetDefaultSportCountry(id:number){
    return this._sporcountyvmServices.getSportCountryById(id).subscribe((data:any)=>{
      this.sportcountries=data;
      console.log("Inside DefaultSportCountry : "+this.sportcountries);
      this.SelectedCountry(this.sportcountries.countryId);
      this.SelectedSport(this.sportcountries.sportId);

    })
  }

}
