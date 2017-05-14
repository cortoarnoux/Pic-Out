import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class Vote {
  private title;
  private expiration_date;
  private voteMasterID;
  private mail_invite;
  private friendAddedToVote;
  private responsesUrl;

  constructor(voteMasterID, title, expiration_date, friendAddedToVote, responsesUrl, mail_invite?){
  	this.voteMasterID = voteMasterID;
    this.title = title;
    this.expiration_date = expiration_date;
    this.friendAddedToVote = friendAddedToVote;
    this.responsesUrl = responsesUrl;
    if(mail_invite){
      this.mail_invite = mail_invite;
    }
    
  }
}
