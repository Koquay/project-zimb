import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit {
  private breadcrumbsArr = [];
  private backslash = "/";

  constructor(
    private activatedRoute:ActivatedRoute,
    private router:Router
  ) { 
  }

  ngOnInit() {
    this.configureBreadcrumb();
  }

  private configureBreadcrumb() {
    let url = this.router.routerState.snapshot.url;
    
    let breadcrumb:string = this.activatedRoute.routeConfig.data.breadcrumb;
    let breadcrumbs = JSON.parse(localStorage.getItem('breadcrumbs'))
    let existingBreadcrumb = breadcrumbs.find(bc => bc.breadcrumb == breadcrumb)

    if(!existingBreadcrumb) {
      breadcrumbs.push({breadcrumb:breadcrumb, url: url});    
    }

    breadcrumbs = this.buildNewBreadcrumbs(breadcrumbs, breadcrumb);
    
    localStorage.setItem('breadcrumbs', JSON.stringify(breadcrumbs))
    this.breadcrumbsArr = breadcrumbs;
    
  }

  private buildNewBreadcrumbs(breadcrumbs, breadcrumb) {
    let newBreadcrumbs = [];

    for(let bc of breadcrumbs) {
      if(bc.breadcrumb == breadcrumb) {
        newBreadcrumbs.push(bc);
        break;
      }
      newBreadcrumbs.push(bc);
    }
    return newBreadcrumbs;
  }
}
