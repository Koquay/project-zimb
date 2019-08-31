import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Menu } from '../../models/data-model';
import { TabPaneService } from './tab-pane.service';
import { OrderService } from '../../../order/order.service';
import { FoodProductService } from '../../../food-product/food-product.service';


@Component({
  selector: 'app-tab-pane',
  templateUrl: './tab-pane.component.html',
  styleUrls: ['./tab-pane.component.scss']
})
export class TabPaneComponent implements OnInit {
  @Input() currentMenu: Menu[];
  @Input() private activeTab;
  private quantities;
  private menuData;
  private quantity = 1;
  private sides;
  private currentItem;
  @ViewChild('openMessage', { static: true }) openMessage: ElementRef<HTMLElement>;
  @ViewChild('debugSidemodal', { static: true }) debugSidemodal: ElementRef<HTMLElement>;

  constructor(
    private tabPaneService: TabPaneService,
    private orderService: OrderService,
    private foodProductService: FoodProductService
  ) { }

  ngOnInit() {
    this.getMenuStaticData();
  }

  // private getSides() {
  //   this.foodProductService.getMenuType('sides').subscribe(sides => {
  //     this.sides = sides;
  //   })
  // }

  private getMenuStaticData() {
    this.tabPaneService.getMenuStaticData().subscribe(data => {
      this.quantities = data[0];
      this.menuData = data[1];
      console.log('static data', data)
    })
  }

  private addToOrder(item, chosenSide?) {
    console.log('item', item)
    this.currentItem = item;
    if (item.side && !chosenSide) {
      this.foodProductService.getSides().subscribe(sides => {
        this.sides = sides;
        console.log('this.sides', this.sides)
        let el: HTMLElement = this.openMessage.nativeElement; 
        let el2: HTMLElement = this.debugSidemodal.nativeElement; 

        console.log('el', el)
        console.log('el2', el2)
        el.click();
      })
    } else {
      let sideAndDrink;

      if(this.currentItem.side) {
        sideAndDrink = this.currentItem.side;
      }
      
      if(sideAndDrink) {
        this.currentItem.name = this.currentItem.name + " (" + sideAndDrink + ")";
      }
      
      console.log('menu this.currentItem', this.currentItem);

      let newItem = JSON.parse(JSON.stringify(this.currentItem));

      this.orderService.addToOrder(newItem).subscribe();
    }
  }

  private addToOrderX(item, chosenSide?, drink?) {
    this.currentItem = item;
    if (item.side && !chosenSide) {
      this.foodProductService.getSides().subscribe(sides => {
        this.sides = sides;
        let el: HTMLElement = this.openMessage.nativeElement;
        el.click();
      })
    } else {

      if (item.drink && !drink) {
        this.foodProductService.getSides().subscribe(sides => {
          this.sides = sides;
          let el: HTMLElement = this.openMessage.nativeElement;
          el.click();
        })
      } else {
        let sideAndDrink;

        if (this.currentItem.side) {
          sideAndDrink = this.currentItem.side;
        }

        if (this.currentItem.drink) {
          sideAndDrink = sideAndDrink + " " + this.currentItem.side;
        }

        if (sideAndDrink) {
          this.currentItem.name = this.currentItem.name + " (" + sideAndDrink + ")";
        }

        console.log('menu this.currentItem', this.currentItem);

        let newItem = JSON.parse(JSON.stringify(this.currentItem));

        this.orderService.addToOrder(newItem).subscribe();
      }


    }
  }

  private addSide(side) {
    this.currentItem.side = side;
    console.log('currentItem', this.currentItem)
    this.addToOrder(this.currentItem, side);
  }

  private getMenuImage(index) {
    let image = this.menuData.find(image => image.type == this.activeTab);
    return image.images[index];
  }

  private getName(name) {
    return name.substr(0, name.indexOf(','))
  }
}
