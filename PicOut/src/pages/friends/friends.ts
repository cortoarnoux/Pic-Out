import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AccueilPage } from '../accueil/accueil';
import { PopoverController } from 'ionic-angular';
import { MyPopOverPage } from './my-pop-over';
import { PopOverAddFriendPage } from '../pop-over-add-friend/pop-over-add-friend';
import firebase from 'firebase';
import { FriendsService } from '../../providers/data/friends-service';

/*
  Generated class for the Friends page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-friends',
  templateUrl: 'friends.html'
})

export class FriendsPage {

  public friendList: any;

  constructor(
    public nav: NavController,
    public navParams: NavParams, 
    public popoverCtrl: PopoverController,
    public friendsData: FriendsService) {
  }

  ionViewDidLoad() {
    // Chargement de la liste des amis courants
    this.friendsData.getFriendList().on('value', snapshot => {
      let rawList = [];
      snapshot.forEach( snap => {
        rawList.push({
          id: snap.key,
          name: snap.val().name,
          age: snap.val().age,
        });
      return false
      });
      this.friendList = rawList;
    });
  }

  public moveToHome() {
    this.nav.push(AccueilPage, {}, {animate: true, direction: 'back'});
  }

  public pushAddFriendPopOver(){
    this.presentPopover();
  }

  presentPopover() {
    let popover = this.popoverCtrl.create(PopOverAddFriendPage);
    popover.present();
  }
}
