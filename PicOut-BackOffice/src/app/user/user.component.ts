import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  users : FirebaseListObservable<any[]>;

  constructor(af: AngularFire) {
    this.users = af.database.list('/users');
  }

  ngOnInit() {
  }

}
