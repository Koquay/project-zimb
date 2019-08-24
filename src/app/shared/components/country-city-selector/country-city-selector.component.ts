import { Component, OnInit, Input } from '@angular/core';
import { CountryCitySelectorService } from './country-city-selector.service';

@Component({
  selector: 'app-country-city-selector',
  templateUrl: './country-city-selector.component.html',
  styleUrls: ['./country-city-selector.component.scss']
})
export class CountryCitySelectorComponent implements OnInit {
  private countries;
  private cities;
  private selectedCountry;
  private selectedCity;

  constructor(
    private countryCitySelectorService:CountryCitySelectorService
  ) { }

  ngOnInit() {
    this.getStaticData();
  }

  private setCityCountry() {
    this.countryCitySelectorService.setCityCountry(this.selectedCity, this.selectedCountry).subscribe();
  }

  private getCities() {    
    this.countryCitySelectorService.getCitiesForCountry(this.selectedCountry).subscribe(cities => {
      this.selectedCity = null;
      this.cities = cities;
    })
  }

  private setCity() {
    this.countryCitySelectorService.setCity(this.selectedCity).subscribe();
  }

  private getStaticData(){
    this.countryCitySelectorService.getStaticData().subscribe(data => {
      this.countries = data[0];   
    })
  }


}
