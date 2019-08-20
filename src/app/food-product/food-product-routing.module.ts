import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FoodProductComponent } from './food-product.component';


const routes: Routes = [
  {
    path: ':business',
    component: FoodProductComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FoodProductRoutingModule { }
