import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FoodProductRoutingModule } from './food-product-routing.module';
import { FoodProductComponent } from './food-product.component';
import { SharedModule } from '../shared/modules/shared/shared.module';


@NgModule({
  declarations: [FoodProductComponent],
  imports: [
    CommonModule,
    FoodProductRoutingModule,
    SharedModule
  ]
})
export class FoodProductModule { }
