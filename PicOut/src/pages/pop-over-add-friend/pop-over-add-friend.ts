import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { UserService } from '../../providers/data/user-service';
import firebase from 'firebase';
import { FriendsService } from '../../providers/data/friends-service';
import { CurrentUserService } from '../../providers/data/currentuser-service';

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
  public currentUser = firebase.auth().currentUser;
  public friendsObjectArray: any;
  public alreadyFriendUID = [];

  constructor(
  	public navCtrl: NavController,
    public navParams: NavParams,
    public userData: UserService,
    private alertCtrl: AlertController,
    public friendsData: FriendsService,
    private currentUserService: CurrentUserService) {}

    ionViewDidLoad() {

    this.friendsData.getFriendList().on('value', snapshot => {
      let rawList = [];
      snapshot.forEach( snap => {
        rawList.push({
          friendUID: snap.val().friendUID
        });
      return false
      });
      console.log("Liste d'amis");
      this.friendsObjectArray = rawList;
    });

    for(let friend in this.friendsObjectArray){
      this.alreadyFriendUID.push(this.friendsObjectArray[friend].friendUID);
    }

    this.alreadyFriendUID.push(this.currentUser.uid);

    console.log(this.alreadyFriendUID);

    // Chargement de la liste des amis courants
    this.userData.getUserList().on('value', snapshot => {
      let rawList = [];
      snapshot.forEach( snap => {
        if(this.alreadyFriendUID.indexOf(snap.key) == -1){
          rawList.push({
            id: snap.key,
            email: snap.val().email,
          });
        }
      return false
      });
      this.users = rawList;
    });
  }

  public selectFriend(friendUID, email){
    console.log("Utilisateur cliqué : " + friendUID);
    let infoMessage;
    infoMessage= "Voulez-vous vraiment ajouter "+ email +" à votre liste d'amis ?";
    this.showPopup("Vérification", infoMessage, friendUID, email);
  }

  showPopup(title, text, friendUID, email) {
      let alert = this.alertCtrl.create({
        title: title,
        subTitle: text,
        buttons: [
        {
          text: 'Annuler',
          role: 'cancel',
        },
        {
          text: 'Ok',
          handler: () => {
            this.currentUserService.addFriendForCurrentUser(friendUID, email)
          }
        }
      ]
      });
      alert.present();
    }
}
