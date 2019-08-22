import { Component, OnInit } from '@angular/core';
import { User } from '../shared/models/data-model';
import { Router } from '@angular/router';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  private user:User;
  
  constructor(
    private userService:UserService,
    private router:Router
  ) {
    this.user = new User();
   }

  ngOnInit() {
  }

  private logIn() {
    this.userService.login(this.user).subscribe(user => {
      this.router.navigate(['/order-list'])
    });
  }

}
