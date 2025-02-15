import { Component, OnInit } from '@angular/core';
import { Menu } from '../shared/models/data-model';
import { FoodProductService } from './food-product.service';
import { TabPaneService } from '../shared/components/tab-pane/tab-pane.service';
import { ActivatedRoute } from '@angular/router';
import { HomeService } from '../home/home.service';

@Component({
  selector: 'app-food-product',
  templateUrl: './food-product.component.html',
  styleUrls: ['./food-product.component.scss']
})
export class FoodProductComponent implements OnInit {
  private menu:Menu[];
  private currentMenu:Menu[];
  private initialMenu:Menu;
  private business;
  private isLoading = false;
  private menuData;
  private activeTab
  private businessTitle;
  
  constructor(
    private foodProductService:FoodProductService,
    private tabPaneService:TabPaneService,
    private activatedRoute:ActivatedRoute,
    private homeService:HomeService
  ) { }

  ngOnInit() {
    this.getMenu();
    this.getMenuStaticData();
    this.getBusinessTitle();
  }

  private getMenu() {    
    this.business = this.activatedRoute.snapshot.paramMap.get('business');
    console.log('business', this.business);

    this.foodProductService.getMenu(this.business).subscribe(menu => {
      this.menu = menu;
      this.initialMenu = this.menu.find(menu => menu.initial_menu == true);
      this.loadMenu(this.initialMenu.type);
      this.activeTab = this.initialMenu.type;
    })
  }

  private loadMenu(type) {
    this.isLoading = true;    
    this.currentMenu = this.menu.filter(menu => menu.type == type);
    this.activeTab = type;
    this.isLoading = false;
    console.log('currentMenu', this.currentMenu)
  }

  private getMenuStaticData() {
    this.tabPaneService.getMenuStaticData(this.business).subscribe(data => {
      this.menuData = data[1];
      console.log('static data', data)
    })
  }

  private getBusinessTitle() {
    this.homeService.getBusinessTitle().subscribe(title => {
      console.log('business tile', title)
      this.businessTitle = title;
    })
  }
}
