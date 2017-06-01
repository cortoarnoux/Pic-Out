import { Injectable } from '@angular/core';
import firebase from 'firebase';
import { Facebook } from '@ionic-native/facebook';
import { User } from '../models/user';
import {isBlank} from "ionic-angular/util/util";

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

  getUserInfos(uid): firebase.database.Reference {
    return firebase.database().ref(`/users/${uid}`);
  }

  // Nico : insertion des infos de l'utilisateur en base de données.
  public setUserInfos(user: User, userId: any) {
    let email: string = user.getEmail();
    let rangeMin: number = user.getRangeMin();
    let rangeMax: number = user.getRangeMax();

    firebase.database().ref('/users/' + userId).update({
      lastname: user.getLastName(),
      firstname: user.getFirstName(),
      username: user.getName(),
      email: isBlank(email) ? "" : email,
      rangemin: rangeMin ? rangeMin : 0,
      rangemax: rangeMax ? rangeMax : 0,
      params: {
        enable: true,
        status: 'user',
        delete: false,
        uid: user.getUid()
      }
    });
  }
}
