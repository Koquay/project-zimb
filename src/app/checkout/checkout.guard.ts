import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { OrderService } from '../order/order.service';
import { MessageService } from '../shared/message/message/message.service';


@Injectable({
  providedIn: 'root'
})
export class CheckoutGuard implements CanActivate {

  constructor(
    private orderService: OrderService,
    private messageService:MessageService,
  ) { }

  canActivate(): Observable<boolean> | boolean {
    if (this.orderService.order && this.orderService.order.menuItems.length) {
      return true;
    }

    const error = { error: 'You have not selected any item for your order yet.', status: 500 };
    this.messageService.sendErrorMessage(new HttpErrorResponse(error));
  }
}
