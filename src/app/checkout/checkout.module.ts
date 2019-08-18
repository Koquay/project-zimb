import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CheckoutRoutingModule } from './checkout-routing.module';
import { CheckoutComponent } from './checkout.component';

import { FormsModule } from '@angular/forms';

import {NgxMaskModule, IConfig} from 'ngx-mask';
import { SharedModule } from '../shared/modules/shared/shared.module';
export let options: Partial<IConfig> | (() => Partial<IConfig>);  

@NgModule({
  declarations: [CheckoutComponent],
  imports: [
    CommonModule,
    CheckoutRoutingModule,
    NgxMaskModule.forRoot(options),
    SharedModule,
    FormsModule
  ]
})
export class CheckoutModule { }
