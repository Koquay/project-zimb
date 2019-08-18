import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Alert } from './alert';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  public alertSubject:Subject<Alert> = new Subject();

  constructor() { }

  public sendAlert(alert:Alert) {
    this.alertSubject.next(alert);
  }
}
