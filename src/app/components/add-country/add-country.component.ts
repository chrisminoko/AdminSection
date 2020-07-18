import { Component, OnInit } from '@angular/core';
import {countries} from '../../models/country.model';
import {CountryService} from '../../services/country.service';
import { FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-add-country',
  templateUrl: './add-country.component.html',
  styleUrls: ['./add-country.component.css']
})
export class AddCountryComponent implements OnInit {
  country : countries[];
  countries:countries;
  countryForm:any;
  countryUpdate=null;
  FormTitle:string;
  constructor(private _countryservice:CountryService,private formBuilder:FormBuilder) { }

  ngOnInit(): void {
   this.getcountries();
   this.countryForm=this.formBuilder.group({
    name:['',Validators.required],
    flagUrl:['',Validators.required],
   })
  }

  getcountries(){
    this._countryservice.getCountries().subscribe((data:any)=>{
      this.country=data;
      console.log("Countries : "+this.country);
    })
  }

  AddCountry(country:countries){
    if(country!=undefined && country !=null){
      if(this.countryUpdate==null){
        country.countryid=this.country.length+1;
        this._countryservice.addCountry(country).subscribe(()=>{
          this.getcountries();
          this.resertForm();
        });
        

      }
    }else{
      this._countryservice.updateCountry(country).subscribe(()=>{
        this.getcountries();
        this.countryUpdate=null;
      })
    }
  }

  delete(id:number){
    var ans= confirm("Do you want to delete Country with Id: "+id)
      if(ans){
        this._countryservice.deleteCountry(id).subscribe((data:any)=>{
          this.getcountries();
        },error=> console.error(error))
      }
  }

  onFormSubmit(){
    const country=this.countryForm.value;
    this.AddCountry(country);
    this.getcountries();
  }
  loadCountryToEdit(countryId:number){
    this._countryservice.getCountryById(countryId).subscribe((data:any)=>{
      this.country=data;
      this.countryUpdate=countryId;
      console.log('Found this', this.country)
      this.countryForm.controls['name'].setValue(data[0].name);
      this.countryForm.controls['flagUrl'].setValue(data[0].flagUrl);  
    });
  }
  resertForm(){
    this.countryForm.reset();
  }

  setHeading(){
    this.countryUpdate=null;
  }

}
