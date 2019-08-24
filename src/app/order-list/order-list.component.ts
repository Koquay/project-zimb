import { Component, OnInit } from '@angular/core';
import { OrderListService } from './order-list.service';
import { Order } from '../shared/models/data-model';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit {
  private pendingOrders:Order[];
  private completedOrders:Order[];
  private orders:Order[];
  
  constructor(
    private orderListService:OrderListService
  ) { }

  ngOnInit() {
    this.getCurrentOrders();
  }

  private getCurrentOrders() {
    this.orderListService.getCurrentOrders().subscribe(orders => {
      this.orders = orders;
      this.pendingOrders = this.orders.filter(order => order.status == "Pending");
      this.completedOrders = this.orders.filter(order => order.status == "Delivered");
      console.log('pendingOrders', this.pendingOrders)    
    })
  }

}
