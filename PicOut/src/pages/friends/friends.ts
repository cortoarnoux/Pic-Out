import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { AccueilPage } from '../accueil/accueil';
import { PopoverController } from 'ionic-angular';
import { PopOverAddFriendPage } from '../pop-over-add-friend/pop-over-add-friend';
import firebase from 'firebase';
import { FriendsService } from '../../providers/data/friends-service';
import { CurrentUserService } from '../../providers/data/currentuser-service';

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

  public friendList = [];
  public userFriendRecupere = [];

  constructor(
    public nav: NavController,
    public navParams: NavParams,
    public popoverCtrl: PopoverController,
    public friendsData: FriendsService,
    private alertCtrl: AlertController,
    private userData: CurrentUserService,) {
  }

  ionViewDidLoad() {
   this.refreshFriendList();
  }

  public refreshFriendList(){
    this.friendList = [];
    this.userFriendRecupere = [];

    // Corto : Chargement de la liste des amis courants
    this.friendsData.getFriendList().on('value', snapshot => {
      let rawList = [];
      snapshot.forEach( snap => {
        rawList.push({
          id: snap.key,
          friendUID: snap.val().friendUID
        });
      return false
      });
      this.friendList = rawList;
      console.log(this.friendList);
      // Corto : Récupère les amis par leur id et stocke leurs informations pour avoir les infos en temps réel
      for(let user in this.friendList){

        let thisFriendID = this.friendList[user].friendUID;

        this.userData.getCurrentUser(thisFriendID).on('value', data => {
          let thisUser = data.val();
          // Corto : Ajout d'une key value dans un tableau Json
          thisUser.friendID = this.friendList[user].id
          this.userFriendRecupere.push(thisUser);
        });
      }
    });
  }

  public actionOnFriend(id, email){
    let infoMessage;
    console.log(id);
    infoMessage = "Voulez-vous vraiment supprimer "+ email +" de votre liste d'amis ?";
    this.showDeleteFriendPopup("Attention", infoMessage, id);
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
    popover.onWillDismiss(() => {
      this.refreshFriendList();
   });
  }

  showDeleteFriendPopup(title, text, id) {
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
          this.friendsData.removeFriend(id);
          this.refreshFriendList();
        }
      }
    ]
    });
    alert.present();
  }
}
