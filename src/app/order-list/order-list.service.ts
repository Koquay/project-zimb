import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';
import { Order } from '../shared/models/data-model';
import { of } from 'rxjs';
import { MessageService } from '../shared/message/message/message.service';

@Injectable({
  providedIn: 'root'
})
export class OrderListService {
  private orderUrl = '/api/order/';
  private orders:Order[];

  constructor(
    private httpClient:HttpClient,
    private messageService:MessageService
  ) { }

  public getCurrentOrders() {
    return this.httpClient.get<Order[]>(this.orderUrl).pipe(
      tap(orders => {
        this.orders = orders;
        console.log('current order', orders)
      }),
      catchError(error => {
        this.messageService.sendErrorMessage(error);
        throw error;
      })
    )
  }

  public getOrder(id) {
    let order = this.orders.find(order => order._id == id);
    return of(order);
  }
}
