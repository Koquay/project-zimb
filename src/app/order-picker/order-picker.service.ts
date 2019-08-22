import { Injectable } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { MessageService } from '../shared/message/message/message.service';

@Injectable({
  providedIn: 'root'
})
export class OrderPickerService {
  private orderUrl = '/api/order/';
  
  constructor(
    private httpClient:HttpClient,
    private messageService:MessageService
  ) { }
  
  public setOrderStatus(id, status) {    
    let url = `${this.orderUrl}${id}/${status}`;
    console.log('url', url);
    return this.httpClient.post(url, {}).pipe(
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
