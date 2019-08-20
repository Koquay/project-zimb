import { Component, OnInit } from '@angular/core';
import { Menu } from '../shared/models/data-model';
import { HomeService } from './home.service';
import { TabPaneService } from '../shared/components/tab-pane/tab-pane.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  private menu:Menu[];
  private currentMenu:Menu[];
  private isLoading = false;
  private menuData;
  private categories;
  
  constructor(
    private homeService:HomeService,
    private tabPaneService:TabPaneService
  ) { }

  ngOnInit() {
    this.getHomeStaticData();
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
