import { Component, OnInit } from '@angular/core';
import { OrderService } from './order.service';
import { Order } from '../shared/models/data-model';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  private order: Order;
  private deleteItem;

  constructor(
    private orderService: OrderService
  ) { }

  ngOnInit() {
    this.getOrder();
  }

  private getOrder() {
    this.orderService.getOrder().subscribe(order => {
      this.order = order;
    })
  }

  private increaseQuantity(item) {
    this.orderService.increaseQuantity(item).subscribe(order => {
      this.order = order;
    })
  }

  private decreaseQuantity(item) {
    if (item.quantity > 1) {
      this.orderService.decreaseQuantity(item).subscribe(order => {
        this.order = order;
      })
    }
  }

  private removeItem(itemToRemove) {
    this.orderService.removeItem(itemToRemove).subscribe(order => {
      this.order = order;
    })
  }

  private setDeleteItem(item) {
    this.deleteItem = item;
  }

}
