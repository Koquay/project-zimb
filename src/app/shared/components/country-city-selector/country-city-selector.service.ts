import { Injectable } from '@angular/core';
import { forkJoin, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CountryCitySelectorService {
  private countries;
  private cities;
  public selectedCity = null;
  public selectedCountry = null;

  constructor() {
    this.createDb();
  }

  public setCityCountry(city, country) {
    this.selectedCity = city;
    this.selectedCountry = country;
    console.log('selectedCityCountry', this.selectedCity, this.selectedCountry)
    return of();
  }  

  public getCityCountry() {
    return of({city:this.selectedCity, country:this.selectedCountry})    
  }  

  public getStaticData() {
    return forkJoin([
      of(this.countries)
    ])
  }

  public getCitiesForCountry(target) {
    this.selectedCountry = target;
    console.log('selected city, selected country', this.selectedCity, this.selectedCountry)
    let cities = this.cities.filter(country => country.country = target);
    return of(cities);
  }

  public setCity(city) {
    this.selectedCity = city;
    console.log('selectedCity, selectedCountry', this.selectedCity, this.selectedCountry)
    return of();
  }

  private createDb() {
    this.countries = [
      { country: "Zimbabwe" },
    ];

    this.cities = [
      { country: "Zimbabwe", city: "Harare" },
      { country: "Zimbabwe", city: "Mutare" },
      { country: "Zimbabwe", city: "Bulawayo" },
      { country: "Zimbabwe", city: "Kwekwe" },
      { country: "Zimbabwe", city: "Midlands" },
    ];
  }

}
