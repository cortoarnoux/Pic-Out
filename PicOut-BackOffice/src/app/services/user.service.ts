import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

@Injectable()
export class UserService {
  users: FirebaseListObservable<any[]>;

  constructor(af: AngularFire) {
    this.users = af.database.list('/users');
  }

  ngOnInit() {

  }

}
