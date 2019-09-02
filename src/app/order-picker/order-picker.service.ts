import { Injectable } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { MessageService } from '../shared/message/message/message.service';

@Injectable({
  providedIn: 'root'
})
export class OrderPickerService {
  private orderUrl = '/api/order/';
  private orderStatusUrl = '/api/order/status/';
  
  constructor(
    private httpClient:HttpClient,
    private messageService:MessageService
  ) { }
  
  // public setOrderStatus(id, status) {    
    public setOrderStatus(order) {  
    // let url = `${this.orderUrl}${id}/${status}`;
    // console.log('url', url);
    return this.httpClient.post(this.orderStatusUrl, {order:order}).pipe(
      tap(order => {
        console.log('updated order', order);
      }),
      catchError(error => {
        this.messageService.sendErrorMessage(error);
        throw error;
      })
    )
  }
}
