import { Component, OnInit } from '@angular/core';
import { OrderListService } from './order-list.service';
import { Order, SearchCriteria } from '../shared/models/data-model';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit {
  private pendingOrders:Order[];
  private completedOrders:Order[];
  private searchedOrders:Order[];
  private orders:Order[];
  private searchCriteria:SearchCriteria;
  private isLoading = true;
  
  constructor(
    private orderListService:OrderListService
  ) {
    this.searchCriteria = new SearchCriteria();
   }

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

  private searchOrder() {
    console.log('Order Search', this.searchCriteria)
    this.isLoading = true;
    this.orderListService.searchOrder(this.searchCriteria).subscribe(orders => {
      this.searchedOrders = orders;
      this.isLoading = false;
    })
  }

}
