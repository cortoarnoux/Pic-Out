import { Component, OnInit } from '@angular/core';
import { FirebaseListObservable } from 'angularfire2';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  users : FirebaseListObservable<any[]>;

  constructor(public us: UsersService) {
    this.users = us.users;
  }

  ngOnInit() {
  }

  onEnable(uid: string): void {
    this.us.updateUserParams(uid, { enable: true });
  }

  onDisable(uid: string): void {
    this.us.updateUserParams(uid, { enable: false });
  }

  onDelete(uid: string): void {
    this.us.updateUserParams(uid, { delete: true });
  }

}
