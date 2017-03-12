import { Injectable } from '@angular/core';
import firebase from 'firebase';

@Injectable()
export class DataService {
  public db: any;
  constructor() {}

  init() {
    const firebaseConf = {
      apiKey: "AIzaSyDYlV5tQMwkE_gWbT3bET_O9fk_FcvieR4",
      authDomain: "picout-48fe3.firebaseapp.com",
      databaseURL: "https://picout-48fe3.firebaseio.com",
      storageBucket: "picout-48fe3.appspot.com",
      messagingSenderId: "474712704020"
    };

    firebase.initializeApp(firebaseConf);
    this.db = firebase.database().ref('/');
  }



}
