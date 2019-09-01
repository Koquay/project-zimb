import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Menu } from '../../models/data-model';
import { TabPaneService } from './tab-pane.service';
import { OrderService } from '../../../order/order.service';
import { FoodProductService } from '../../../food-product/food-product.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';


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
  private drinks;
  private currentItem;
  @ViewChild('openSidesModal', { static: true }) openSidesModal: ElementRef<HTMLElement>;
  @ViewChild('openDrinksModal', { static: true }) openDrinksModal: ElementRef<HTMLElement>;
  
  closeResult: string;

  constructor(
    private tabPaneService: TabPaneService,
    private orderService: OrderService,
    private foodProductService: FoodProductService,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    this.getMenuStaticData();
  }

  private getMenuStaticData() {
    this.tabPaneService.getMenuStaticData().subscribe(data => {
      this.quantities = data[0];
      this.menuData = data[1];
      console.log('static data', data)
    })
  }

  private addToOrder(item) {    
    
    if(!this.currentItem) {
      this.currentItem = JSON.parse(JSON.stringify(item));
    }
    if (this.currentItem.side && !this.currentItem.chosenSide) {
      this.foodProductService.getSides().subscribe(sides => {
        this.sides = sides;
        console.log('this.sides', this.sides)

        let el: HTMLElement = this.openSidesModal.nativeElement; 
        el.click();
      })
    } else if (this.currentItem.drink && !this.currentItem.chosenDrink) {
      this.foodProductService.getDrinks().subscribe(drinks => {
        this.drinks = drinks;
        console.log('this.drinks', this.drinks)

        let el: HTMLElement = this.openDrinksModal.nativeElement; 
        el.click();
      })
    }
    else {
      let sideAndDrink;

      if(this.currentItem.chosenSide) {
        sideAndDrink = this.currentItem.chosenSide;
      }

      if(this.currentItem.chosenDrink) {
        sideAndDrink = sideAndDrink + " + " + this.currentItem.chosenDrink;
      }
      
      if(sideAndDrink) {
        this.currentItem.name = this.currentItem.name + " (" + sideAndDrink + ")";
      }
      
      console.log('menu this.currentItem', this.currentItem);

      let newItem = JSON.parse(JSON.stringify(this.currentItem));
      this.currentItem = null;
      
      this.orderService.addToOrder(newItem).subscribe();
    }
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
    });
  }

  private addSide(side) {
    this.currentItem.chosenSide = side;
    this.addToOrder(this.currentItem);
  }

  private addDrink(drink) {
    this.currentItem.chosenDrink = drink;
    this.addToOrder(this.currentItem);
  }

  private getMenuImage(index) {
    let image = this.menuData.find(image => image.type == this.activeTab);
    return image.images[index];
  }

  private getName(name) {
    return name.substr(0, name.indexOf(','))
  }
}
