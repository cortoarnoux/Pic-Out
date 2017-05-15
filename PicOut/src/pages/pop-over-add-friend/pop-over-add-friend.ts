import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { UserService } from '../../providers/data/user-service';
import firebase from 'firebase';
import { FriendsService } from '../../providers/data/friends-service';
import { CurrentUserService } from '../../providers/data/currentuser-service';

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

    // Corto : Récupère la liste des UID des amis de l'utilisateur courant
    this.friendsData.getFriendList().on('value', snapshot => {
      let rawList = [];
      snapshot.forEach( snap => {
        rawList.push({
          keyID: snap.key,
          friendUID: snap.val().friendUID
        });
      return false
      });
      this.friendsObjectArray = rawList;
    });

    // Corto : Ajoute tous les UID des utilisateurs déjà amis à la liste de vérification
    for(let friend in this.friendsObjectArray){
      this.alreadyFriendUID.push(this.friendsObjectArray[friend].friendUID);
    }

    // Corto : Ajoute l'utilisateur actuel à la liste de ses propres amis (pour ne pas qu'il puisse s'ajouter en amis)
    this.alreadyFriendUID.push(this.currentUser.uid);

    // Corto : Chargement de la liste des amis courants
    this.userData.getUserList().on('value', snapshot => {
      let rawList = [];
      snapshot.forEach( snap => {
        // Corto : Vérifie que les utilisateurs à lister ne soient pas dans liste des utilisateurs à ne pas lister
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
    let infoMessage;
    infoMessage= "Voulez-vous vraiment ajouter "+ email +" à votre liste d'amis ?";
    this.showAddFriendPopup("Vérification", infoMessage, friendUID);
  }

  showAddFriendPopup(title, text, friendUID) {
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
            this.currentUserService.addFriendForCurrentUser(friendUID);
            alert.dismiss();
          }
        }
      ]
      });
      alert.present();
    }
}
