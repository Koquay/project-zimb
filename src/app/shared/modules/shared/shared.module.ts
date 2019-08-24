import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { HeaderComponent } from '../../../header/header.component';
import { FooterComponent } from '../../../footer/footer.component';
import { TabPaneComponent } from '../../components/tab-pane/tab-pane.component';
import {FormsModule} from '@angular/forms';
import { PageHeaderComponent } from '../../components/page-header/page-header.component';
import { MessageComponent } from '../../message/message/message.component';
import { BannerComponent } from '../../components/banner/banner.component';
import { CountryCitySelectorComponent } from '../../components/country-city-selector/country-city-selector.component';
import { CountryCitySelectedComponent } from '../../components/country-city-selected/country-city-selected.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    TabPaneComponent,
    PageHeaderComponent,
    MessageComponent, 
    BannerComponent,
    CountryCitySelectorComponent,
    CountryCitySelectedComponent
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    TabPaneComponent,
    PageHeaderComponent,
    MessageComponent, 
    BannerComponent,
    CountryCitySelectorComponent,
    CountryCitySelectedComponent
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    FormsModule
  ]
})
export class SharedModule { }
