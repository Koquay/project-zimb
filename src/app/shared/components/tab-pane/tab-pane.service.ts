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
            
      {type: "chow-mein", label: "Exotic Exclusive", images:["ezgif-1-de74b2937ab0.jpg", "ezgif-1-0974ac1d262c.jpg"]},
      {type: "rice", label: "For Little Nandos Fans", images:["ezgif-1-cb7d7f733678.jpg", "ezgif-1-9d96d3e679f7.jpg"]},
      {type: "rice", label: "PERI-PERI Chicken", images:["ezgif-1-cb7d7f733678.jpg", "ezgif-1-9d96d3e679f7.jpg"]},
      {type: "rice", label: "Sides, Drinks & Extras", images:["ezgif-1-cb7d7f733678.jpg", "ezgif-1-9d96d3e679f7.jpg"]},
      {type: "rice", label: "Beer / Cider", images:["ezgif-1-cb7d7f733678.jpg", "ezgif-1-9d96d3e679f7.jpg"]},
      {type: "rice", label: "Wine", images:["ezgif-1-cb7d7f733678.jpg", "ezgif-1-9d96d3e679f7.jpg"]},
      {type: "rice", label: "Retail Bottles", images:["ezgif-1-cb7d7f733678.jpg", "ezgif-1-9d96d3e679f7.jpg"]},
      {type: "rice", label: "Appeteazers", images:["ezgif-1-cb7d7f733678.jpg", "ezgif-1-9d96d3e679f7.jpg"]},
      
      
    ]
  }

  public getQuantities() {
    return of(this.quantities);
  }

  public getMenuData() {
    return of(this.menuData);
  }
}
