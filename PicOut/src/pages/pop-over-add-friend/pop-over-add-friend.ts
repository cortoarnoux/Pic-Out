import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the PopOverAddFriend page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-pop-over-add-friend',
  templateUrl: 'pop-over-add-friend.html'
})
export class PopOverAddFriendPage {

  constructor(
  	public navCtrl: NavController,
    public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad PopOverAddFriendPage');
  }
}
