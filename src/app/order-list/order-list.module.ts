import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderListRoutingModule } from './order-list-routing.module';
import { OrderListComponent } from './order-list.component';
import { SharedModule } from '../shared/modules/shared/shared.module';

import {NgxMaskModule, IConfig} from 'ngx-mask'
import { FormsModule } from '@angular/forms';
export let options: Partial<IConfig> | (() => Partial<IConfig>);  


@NgModule({
  declarations: [OrderListComponent],
  imports: [
    CommonModule,
    OrderListRoutingModule,
    NgxMaskModule.forRoot(options),
    SharedModule,
    FormsModule
  ]
})
export class OrderListModule { }
