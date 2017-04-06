import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { UserService } from '../../providers/data/user-service';

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

  public users: any;

  constructor(
  	public navCtrl: NavController,
    public navParams: NavParams,
    public userData: UserService) {}

    ionViewDidLoad() {
    // Chargement de la liste des amis courants
    this.userData.getUserList().on('value', snapshot => {
      let rawList = [];
      snapshot.forEach( snap => {
        rawList.push({
          id: snap.key,
          email: snap.val().email,
        });
      return false
      });
      this.users = rawList;
    });
  }

  public selectFriend(id){
    console.log("Utilisateur cliqué : " + id);
  }
}
