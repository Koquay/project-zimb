import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MessageService } from '../shared/message/message/message.service';
import { Menu } from '../shared/models/data-model';
import {map, catchError} from 'rxjs/operators';
import { forkJoin, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  private categories;
  private businessTitle;
  
  constructor(
    private httpClient: HttpClient,
    private messageService:MessageService
  ) { 
    this.createBusinessCards();
  }

  public setBusinessTitle(businessTitle) {
    this.businessTitle = businessTitle;
    return of();
  }

  public getBusinessTitle() {
    return of(this.businessTitle);
  }

  public getHomeStaticData() {
    return forkJoin([
      of(this.categories)
    ])
  }

  private createBusinessCards() {
    this.categories = {
      cards: [
        {title: "NANDOS", img: 'nandos.jpg', business:'nandos'},
        {title: "CHICKEN INN", img: 'chicken-inn.jpg', business:'chicken-inn'},
        {title: "KFC", img: 'kfc.jpg', business:'kfc'},
        
        {title: "BUSINESS 4", img: 'chicken-inn.jpg', business:'chicken-inn'},
        {title: "BUSINESS 5", img: 'kfc.jpg', business:'kfc'},
        {title: "BUSINESS 6", img: 'nandos.jpg', business:'nandos'},
        
        
        
      ]
    }
  }
}

