import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrderListComponent } from './order-list.component';
import { LoggedInGuard } from '../shared/guards/logged-in.guard';


const routes: Routes = [
  {
    path: '',
    component: OrderListComponent,
    canActivate: [LoggedInGuard],
    data: { breadcrumb: 'Pending Orders'}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderListRoutingModule { }
