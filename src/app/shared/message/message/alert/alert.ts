import { AlertType } from './alert-type.enum';

export class Alert {
    constructor(public text:string, public type=AlertType.SUCCESS) {
        console.log('Alert: ', text, type);
    }
}
