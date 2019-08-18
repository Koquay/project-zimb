import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrderComponent } from './order.component';
import { OrderGuard } from './order.guard';


const routes: Routes = [
  {
    path: '',
    component: OrderComponent,
    canActivate: [OrderGuard],
    data: { breadcrumb: 'Order'}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderRoutingModule { }
