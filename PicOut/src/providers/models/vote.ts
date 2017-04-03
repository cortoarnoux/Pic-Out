import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class Vote {
  private title;
  private expiration_date;
  private mail_invite;

  constructor(title, expiration_date, mail_invite?){
    this.title = title;
    this.expiration_date = expiration_date;
    this.mail_invite = mail_invite;
  }
}
