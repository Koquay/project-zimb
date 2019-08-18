import { Component, OnInit, Input } from '@angular/core';
import { Menu } from '../../models/data-model';
import { TabPaneService } from './tab-pane.service';
import { OrderService } from '../../../order/order.service';


@Component({
  selector: 'app-tab-pane',
  templateUrl: './tab-pane.component.html',
  styleUrls: ['./tab-pane.component.scss']
})
export class TabPaneComponent implements OnInit {
  @Input() currentMenu:Menu[];
  @Input() private activeTab;
  private quantities;
  private menuData;
  private quantity = 1;
  
  constructor(
    private tabPaneService:TabPaneService,
    private orderService:OrderService
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
    console.log('menu item', item);
    console.log('item.quantity', item.quantity);
    let newItem = JSON.parse(JSON.stringify(item));
    
    this.orderService.addToOrder(newItem).subscribe();
  }

  private getMenuImage(index) {
    let image = this.menuData.find(image => image.type == this.activeTab);
    return image.images[index];
  }

}
