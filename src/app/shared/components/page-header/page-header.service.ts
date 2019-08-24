import { Injectable } from '@angular/core';
import { forkJoin, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PageHeaderService {
  private countries;
  private cities;

  constructor() {
    this.createDb();
   }

   public getStaticData() {
     return forkJoin([
       of(this.countries)
     ])
   }

   public getCitiesForCountry(target) {
      let cities = this.cities.filter(country => country.country = target);
      return of(cities);
   }

  private createDb() {
    this.countries = [
      {country: "Zimbabwe"},
    ];

    this.cities = [
      {country: "Zimbabwe", city: "Harare"},
      {country: "Zimbabwe", city: "Mutare"},
      {country: "Zimbabwe", city: "Bulawayo"},
      {country: "Zimbabwe", city: "Kwekwe"},
      {country: "Zimbabwe", city: "Midlands"},      
    ];
  }
  
}
