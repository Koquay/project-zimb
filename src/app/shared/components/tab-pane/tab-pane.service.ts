import { Injectable } from '@angular/core';
import { of, forkJoin } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TabPaneService {
  private quantities;
  private menuData;

  constructor() {
    this.createDB();
  }

  public getMenuStaticData(business) {
    return forkJoin([
      this.getQuantities(), this.getMenuData(business)
    ])
  }

  private createDB() {
    this.quantities = [
      {value: 1 },
      {value: 2 },
      {value: 3 },
      {value: 4 },
      {value: 5 },
      {value: 6 },
      {value: 7 },
      {value: 8 },
      {value: 9 },
      {value: 10 }
    ];

    this.menuData = [
      {business: "nandos", type: "burgers-pitas-wraps", label: "Burgers, Pitas, Wraps", images:["burger-banner.jpg"]},         
      {business: "nandos", type: "flame-grilled-chicken", label: "Flame Grilled Chicken", images:["flamed-grilled-chicken.jpg"]},
      {business: "nandos", type: "salads", label: "Salads", images:["salads.jpg"]},                 
      {business: "nandos", type: "sides", label: "Sides", images:["salads.jpg"]},           
      {business: "nandos", type: "drinks", label: "Drinks", images:["salads.jpg"]},       
      
      {business: "chicken-inn", type: "best-loved-taste", label: "Best Loved Taste", images:["flamed-grilled-chicken.jpg"]}, 
      {business: "chicken-inn", type: "rotisserie-chicken", label: "Rotisserie Chicken", images:["flamed-grilled-chicken.jpg"]}, 
      {business: "chicken-inn", type: "burgers", label: "Burgers", images:["flamed-grilled-chicken.jpg"]}, 
      {business: "chicken-inn", type: "value-offers", label: "Value Offers", images:["flamed-grilled-chicken.jpg"]}, 
      
      
    ]
  }

  public getQuantities() {
    return of(this.quantities);
  }

  public getMenuData(business) {
    let currentMenu = this.menuData.filter(menu => menu.business == business);
    return of(currentMenu);
  }
}
