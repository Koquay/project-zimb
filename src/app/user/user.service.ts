import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { tap, map, catchError } from 'rxjs/operators';
import { User } from '../shared/models/data-model';
import { MessageService } from '../shared/message/message/message.service';
import { timer } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userUrl = '/api/user/';
  public isLoggedIn = false;

  constructor(
    private httpClient:HttpClient,
    private messageService:MessageService,
    private router:Router
  ) { }

  public login(user:User) {
    console.log('user', user)
    return this.httpClient.post<User>(this.userUrl, {user:user})
    .pipe(
      map(user => {
        console.log('user', user)
        localStorage.setItem('user', JSON.stringify(user));
        this.isLoggedIn = true;
        this.startLogInTimer();
        return user;
      }),
      catchError(error => {
        console.log('error', error)
        this.messageService.sendErrorMessage(error);
        throw error;
      })
    )
  }

  private startLogInTimer() {
    const source = timer(14400000);
    // const source = timer(5000);

    const subscribe = source.subscribe(val => {
      localStorage.removeItem('user');
      this.isLoggedIn = false;
      this.router.navigate(['/home'])
    });
  }
}
