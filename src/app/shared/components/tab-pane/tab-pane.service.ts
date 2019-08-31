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

  public getMenuStaticData() {
    return forkJoin([
      this.getQuantities(), this.getMenuData()
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
      {type: "burgers-pitas-wraps", label: "Burgers, Pitas, Wraps", images:["burger-banner.jpg"]},         
      {type: "flame-grilled-chicken", label: "Flame Grilled Chicken", images:["flamed-grilled-chicken.jpg"]},
      {type: "salads", label: "Salads", images:["salads.jpg"]},                 
      {type: "sides", label: "Sides", images:["salads.jpg"]},                 
      
    ]
  }

  public getQuantities() {
    return of(this.quantities);
  }

  public getMenuData() {
    return of(this.menuData);
  }
}
