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

  userAuth(email: string, password: string) {
    this.auth.signInWithEmailAndPassword(email, password)
      .catch(function(error) {
        let errorCode = error.code;
        let errorMessage = error.message;

        console.log(errorCode + " " + errorMessage);
      })
  }


}
