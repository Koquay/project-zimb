import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MessageService } from '../shared/message/message/message.service';
import { Menu } from '../shared/models/data-model';
import {map, catchError} from 'rxjs/operators';
import { of } from 'rxjs';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class FoodProductService {
  private menuUrl = '/api/menu/';
  private menu:Menu[];
  private sides;
  private drinks;
  
  constructor(
    private httpClient: HttpClient,
    private messageService:MessageService
  ) { }

  public getMenu(business) {
    return this.httpClient.get<Menu[]>(`${this.menuUrl}${business}`).pipe(
      map(menu => {
        console.log('menu', menu)
        menu = this.addQuantities(menu);        
        this.menu = menu;
        console.log('Food Service Menu', this.menu)
        return menu;
      }),
      catchError(error => {
        this.messageService.sendErrorMessage(error);
        throw error;
      })
    )
  } 

  private addQuantities(menu) {
    for(let m of menu) {
      m.quantity = 1;      
    }

    console.log('menu', menu)
    return menu;
  }

  public getSides() {
    if(this.sides) {
      return of(this.sides);
    }

    let sideMenu = [];
    let sides = this.menu.filter(menu => menu.type == 'sides');

    for(let side of sides) {
      let name = side.name.substr(0, side.name.indexOf(','));
      sideMenu.push(name)
    }

    sideMenu = _.uniq(sideMenu.sort());
    this.sides = sideMenu
    return of(this.sides);
  }

  public getDrinks() {
    if(this.drinks) {
      return of(this.drinks);
    }

    let drinkMenu = [];
    let drinks = this.menu.filter(menu => menu.type == 'drinks');
    console.log('drinks', drinks)
    console.log('menu', this.menu)

    for(let drink of drinks) {
      // let name = drink.name.substr(0, drink.name.indexOf(','));
      drinkMenu.push(drink.name)
    }

    drinkMenu = _.uniq(drinkMenu.sort());
    this.drinks = drinkMenu
    return of(this.drinks);
  }
}

