import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';
import { Order, SearchCriteria } from '../shared/models/data-model';
import { of } from 'rxjs';
import { MessageService } from '../shared/message/message/message.service';

@Injectable({
  providedIn: 'root'
})
export class OrderListService {
  private orderUrl = '/api/order/';
  private orderSearchUrl = '/api/order/search/';
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

  public searchOrder(searchCriteria: SearchCriteria) {
    let searchParams = this.buildSearchParams(searchCriteria);

    return this.httpClient.get<Order[]>(`${this.orderSearchUrl}${searchParams}`).pipe(
      tap(orders => console.log('search orders', orders)),
      catchError(error => {
        console.log('error', error)
        this.messageService.sendErrorMessage(error);
        throw error;
      })
    )
  }

  private buildSearchParams(searchCriteria) {
    let searchParams = JSON.stringify({
      order_no: searchCriteria.order_no,
      phone: searchCriteria.phone,      
    });

    const params = `?searchCriteria=${searchParams}`
    console.log('search params', params)
    return params;
  }
}
