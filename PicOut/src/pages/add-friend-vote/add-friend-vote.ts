import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { AccueilPage } from '../accueil/accueil';
import { PopoverController } from 'ionic-angular';
import { MyPopOverPage } from './my-pop-over';
import { CreateVotePage } from '../create-vote/create-vote';
import { PopOverAddFriendPage } from '../pop-over-add-friend/pop-over-add-friend';
import firebase from 'firebase';
import { FriendsService } from '../../providers/data/friends-service';


// Corto : Ajout du vote, import de AngularFire et Firebase + import de l'objet vote pour stocker le vote
import {AngularFire, FirebaseListObservable} from 'angularfire2';
import {Vote} from '../../providers/models/vote';

/*
  Generated class for the Friends page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-add-friend-vote',
  templateUrl: 'add-friend-vote.html'
})

export class AddFriendVotePage {

  public friendList: any;
  voteList: FirebaseListObservable<any>;
  vote;
  public emailsAdded: Array<any>;

  constructor(
    public nav: NavController,
    public navParams: NavParams,
    public popoverCtrl: PopoverController,
    public friendsData: FriendsService,
    public af: AngularFire,
    private alertCtrl: AlertController,) {
      this.voteList = af.database.list('/votes');
  }

  ionViewDidLoad() {
    // Chargement de la liste des amis courants
    this.friendsData.getFriendList().on('value', snapshot => {
      let rawList = [];
      snapshot.forEach( snap => {
        rawList.push({
          id: snap.key,
          friendUID: snap.val().friendUID,
          email: snap.val().email,
        });
      return false
      });
      this.friendList = rawList;
    });
  }

  public actionOnFriend(id, email){
    console.log(id);
    let infoMessage;
    infoMessage= "Voulez-vous ajouter "+ email +" a votre sondage ?";
    this.showAddFriendPopup("Attention", infoMessage, id);
  }

  public backToCreateVote() {
    this.nav.push(CreateVotePage, {
      emails_added: this.emailsAdded
    }, {animate: true, direction: 'back'});
  }

  public pushAddFriendPopOver(){
    this.presentPopover();
  }

  presentPopover() {
    let popover = this.popoverCtrl.create(PopOverAddFriendPage);
    popover.present();
  }

  showAddFriendPopup(title, text, email) {
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
            //this.emailsAdded.push({
                //email: "lol@lol.lol"
            //})
          }
        }
      ]
      });
      alert.present();
    }
}
