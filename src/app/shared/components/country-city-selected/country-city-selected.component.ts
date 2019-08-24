import { Component, OnInit } from '@angular/core';
import { CountryCitySelectorService } from '../country-city-selector/country-city-selector.service';

@Component({
  selector: 'app-country-city-selected',
  templateUrl: './country-city-selected.component.html',
  styleUrls: ['./country-city-selected.component.scss']
})
export class CountryCitySelectedComponent implements OnInit {

  constructor(
    private countryCitySelectorService:CountryCitySelectorService
  ) { }

  ngOnInit() {
  }

}
