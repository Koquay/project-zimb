import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Order, Menu, MenuItem } from '../shared/models/data-model';
import { HttpClient } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';
import { MessageService } from '../shared/message/message/message.service';


@Injectable({
  providedIn: 'root'
})
export class OrderService {
  public order:Order = null;
  private orderUrl = '/api/order/';

  constructor(
    private httpClient:HttpClient,
    private messageService:MessageService
  ) { }

  public placeOrder() {
    return this.httpClient.post<Order>(this.orderUrl, this.order).pipe(
      tap(order => {
        console.log('new order', order)
      }),
      catchError(error => {
        console.log('error', error)
        this.messageService.sendErrorMessage(error);
        throw error;
      })
    )
  } 

  public addToOrder(item:Menu) {
   if(this.order == null) {
      this.order = new Order();      
    }

    let menuItem = new MenuItem();

    menuItem.name = item.name;
    menuItem.price = item.price;
    menuItem.quantity = item.quantity;
    menuItem.type = item.type;
    menuItem._id = item._id;

    console.log('menu item', menuItem);
    
    this.order.menuItems.push(menuItem);

    return of()
  }

  public getOrder() {
    this.order.subtotal = this.getSubtotal();
    this.order.discount = this.getDiscount();
    this.order.tax = this.getTax();
    this.order.total = this.getTotal();    
    return of(this.order);
  }

  public getTax() {
    return this.getSubtotal() * .10;
  }

  public getDiscount() {
    return this.getSubtotal() * .10;
  }

  public getTotal() {
    return this.getSubtotal() + this.getTax() - this.getDiscount();
  }

  public getSubtotal() {
    let subtotal = 0;

    for(let item of this.order.menuItems) {
      subtotal += item.price * item.quantity;
    }

    return subtotal;
  }

  public increaseQuantity(itemToIncrease) {
    // item.quantity += 1;
    // return this.getOrder();

    let item = this.order.menuItems.find(item => item._id == itemToIncrease._id);

    if (item) {
      item.quantity += 1;
      return this.getOrder();
    }
  }

  public decreaseQuantity(itemToDecrease) {
    let item = this.order.menuItems.find(item => item._id == itemToDecrease._id);

    if (item.quantity > 1) {
      item.quantity -= 1;
      return this.getOrder();
    }
  }

  public removeItem(itemToRemove) {
    let index = this.order.menuItems.findIndex(item => item._id == itemToRemove._id);

    if (index >= 0) {
      this.order.menuItems.splice(index, 1);
      return this.getOrder();
    }
  }  
}


