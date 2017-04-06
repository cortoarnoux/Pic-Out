import { Injectable } from '@angular/core';
import firebase from 'firebase';
import { Facebook } from '@ionic-native/facebook';

@Injectable()
export class UserService {
  public auth: any;
  public users: any;
  public authFacebook: any;
  public facebook: Facebook;

  constructor() {
    this.users = firebase.database().ref('/users');
    this.auth = firebase.auth();
    this.authFacebook = firebase.auth.FacebookAuthProvider;
  }

  getUserList(): firebase.database.Reference {
  	return this.users;
  }
}
