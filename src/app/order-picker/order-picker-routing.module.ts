import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrderPickerComponent } from './order-picker.component';
import { LoggedInGuard } from '../shared/guards/logged-in.guard';


const routes: Routes = [
  {
    path: ':id',
    component: OrderPickerComponent,
    canActivate: [LoggedInGuard],
    data: { breadcrumb: 'Order Picker'}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderPickerRoutingModule { }
