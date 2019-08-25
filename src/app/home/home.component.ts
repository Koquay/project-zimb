import { Component, OnInit } from '@angular/core';
import { Menu } from '../shared/models/data-model';
import { HomeService } from './home.service';
import { TabPaneService } from '../shared/components/tab-pane/tab-pane.service';
import { Router } from '@angular/router';
import { CountryCitySelectorService } from '../shared/components/country-city-selector/country-city-selector.service';
import { MessageService } from '../shared/message/message/message.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  private menu: Menu[];
  private currentMenu: Menu[];
  private isLoading = false;
  private menuData;
  private categories;
  
  constructor(
    private homeService: HomeService,
    private tabPaneService: TabPaneService,
    private router: Router,
    private countryCitySelectorService: CountryCitySelectorService,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.getHomeStaticData();
  }

  private goToFoodProduct(business, title) {
    this.setBusinessTitle(title);

    this.countryCitySelectorService.getCityCountry().subscribe(cityCountry => {
      console.log('city country', cityCountry)
      if (cityCountry.city == null || cityCountry.country == null) {
        this.messageService.sendInfo("Please choose a country and city for your delivery.")
        return;
      } else {
        this.router.navigate(['/food-product', business])
      }
    })
  }

  private getHomeStaticData() {
    this.homeService.getHomeStaticData().subscribe(data => {
      console.log('data', data)
      this.categories = data[0];
    })
  }

  private setBusinessTitle(businessTitle) {
    this.homeService.setBusinessTitle(businessTitle).subscribe();
  }
}
