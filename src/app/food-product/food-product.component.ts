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
  private isLoading = false;
  private menuData;
  private activeTab = 'burgers-pitas-wraps';
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
    const business = this.activatedRoute.snapshot.paramMap.get('business');
    console.log('business', business);

    this.foodProductService.getMenu(business).subscribe(menu => {
      this.menu = menu;
      this.loadMenu('burgers-pitas-wraps');
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
    this.tabPaneService.getMenuStaticData().subscribe(data => {
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
