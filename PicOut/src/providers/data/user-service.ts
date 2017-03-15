import { Injectable } from '@angular/core';
import firebase from 'firebase';

@Injectable()
export class UserService {
  public auth: any;
  public users: any;

  constructor() {
    this.users = firebase.database().ref('/users');
    this.auth = firebase.auth();
  }

}
