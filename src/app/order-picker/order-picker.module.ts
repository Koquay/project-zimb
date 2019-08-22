import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { OrderPickerRoutingModule } from './order-picker-routing.module';
import { OrderPickerComponent } from './order-picker.component';
import { SharedModule } from '../shared/modules/shared/shared.module';

import {NgxMaskModule, IConfig} from 'ngx-mask'
export let options: Partial<IConfig> | (() => Partial<IConfig>);  


@NgModule({
  declarations: [OrderPickerComponent],
  imports: [
    CommonModule,
    FormsModule,
    OrderPickerRoutingModule,
    NgxMaskModule.forRoot(options),
    SharedModule
  ]
})
export class OrderPickerModule { }
