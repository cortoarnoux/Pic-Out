import { Injectable } from '@angular/core';
import {AngularFire, FirebaseListObservable, } from 'angularfire2';
import { User } from '../models/user';

@Injectable()
export class UsersService {
  users : FirebaseListObservable<any[]>;

  constructor(public af: AngularFire) {
    this.users = af.database.list('/users');
  }

  updateUserParams(uid: string, params: object): boolean {
    let user = this.af.database.object(`/users/${uid}/params`);

    user.update(params)
      .then(_ => { return true })
      .catch(error => { console.log(error); return false});

    return false;
  }

}
