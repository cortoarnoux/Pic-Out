import { Injectable } from '@angular/core';
import {AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2';
import { User } from '../models/user';

@Injectable()
export class UsersService {
  users : FirebaseListObservable<any[]>;

  constructor(public db: AngularFireDatabase) {
    this.users = db.list('/users');
  }

  updateUserParams(uid: string, params: object): boolean {
    let user = this.db.object(`/users/${uid}/params`);

    user.update(params)
      .then(_ => { return true })
      .catch(error => { console.log(error); return false});

    return false;
  }

}
