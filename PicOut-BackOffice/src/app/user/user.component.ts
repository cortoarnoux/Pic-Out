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

  constructor(public usrs: UsersService) {
    this.users = usrs.users;
  }

  ngOnInit() {
  }

  onEnable(uid: string): void {
    this.usrs.updateUserParams(uid, { enable: true });
  }

  onDisable(uid: string): void {
    this.usrs.updateUserParams(uid, { enable: false });
  }

  onDelete(uid: string): void {
    this.usrs.updateUserParams(uid, { delete: true });
  }

}
