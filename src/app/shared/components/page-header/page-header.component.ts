import { Component, OnInit, Input } from '@angular/core';
import { PageHeaderService } from './page-header.service';

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss']
})
export class PageHeaderComponent implements OnInit {
  @Input() businessTitle: String;
  
  constructor() { }

  ngOnInit() {
  
  }
}
