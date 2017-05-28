import { Component,NgZone } from '@angular/core';
import { NavController, AlertController, NavParams } from 'ionic-angular';
import { FriendsPage } from '../friends/friends';
import { AddFriendVotePage } from '../add-friend-vote/add-friend-vote';
import { CreateVoteSecondStepPage } from '../create-vote-second-step/create-vote-second-step';
import { AccueilPage } from '../accueil/accueil';
import firebase from 'firebase';
import { PopoverController } from 'ionic-angular';
import { PopOverVoteAddFriendPage } from '../pop-over-vote-add-friend/pop-over-vote-add-friend';
import { Storage } from '@ionic/storage';
import { FriendsService } from '../../providers/data/friends-service';

// Corto : Ajout du vote, import de AngularFire et Firebase + import de l'objet vote pour stocker le vote
import {AngularFire, FirebaseListObservable} from 'angularfire2';

@Component({
  selector: 'page-create-vote',
  templateUrl: 'create-vote.html'
})
export class CreateVotePage {

  vote;

  constructor(
    public navCtrl: NavController,
    private alertCtrl: AlertController,
    private navParams: NavParams,
    public af: AngularFire,
    private _zone: NgZone,
    public popoverCtrl: PopoverController,
    public storage: Storage,
    private friendsService: FriendsService) {
  }

  public voteMasterID = firebase.auth().currentUser.uid;
  public friendAddedToVote = [];
  public friendsEmail = [];

  ionViewDidLoad() {
    this.storage.set('friendAddedToVote', this.friendAddedToVote);
  }

  //create vote object
  addVote(title, expiration_date, mail_invite){

    this.vote = [this.voteMasterID, title, expiration_date, this.friendAddedToVote, mail_invite];

    if(this.vote[1] == "" || this.vote[2] == null || this.friendAddedToVote.length < 1){
      if(this.vote[1] == ""){
        let errorMessage= "Vous n'avez pas renseigné de titre à votre sondage";
        this.showErrorMessage("Attention", errorMessage);
      } else if(this.vote[2] == null){
        let errorMessage= "Vous n'avez pas renseigné de date à votre sondage";
        this.showErrorMessage("Attention", errorMessage);
      } else if(this.friendAddedToVote.length < 1){
        let errorMessage= "Veuillez inviter au moins un ami au vote";
        this.showErrorMessage("Attention", errorMessage);
      }
    } else {
      // Sharing datas between pages
      this.navCtrl.push(CreateVoteSecondStepPage, {
        registered_vote_state: this.vote
      });
    }
   }

    // Corto : Ouverture PopOver ajout amis dans le vote
    public moveToFriends() {
      this.presentPopover();
    }

    // to page second step
    public moveToSecondStepPage() {
      this.navCtrl.push(CreateVoteSecondStepPage);
    }

    // to home page with pop up
    public moveToHome() {
      let errorMessage;
      errorMessage= "Etes vous sur de vouloir annuler votre vote ?";
      this.showPopup("Attention", errorMessage);
    }

    public actionOnFriend(id, email){
      let infoMessage;
      console.log(id);
      infoMessage = "Voulez-vous vraiment supprimer "+ email +" de ce vote ?";
      this.showDeleteFriendPopup("Attention", infoMessage, id);
    }

    presentPopover() {
      let popover = this.popoverCtrl.create(PopOverVoteAddFriendPage, {
        SelectedFriendID: this.friendAddedToVote
      });
      popover.present();
      popover.onDidDismiss(() => {
        this.storage.get('friendAddedToVote').then((val) => {
          this.friendAddedToVote = val;
        })
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
            // Corto : Petite technique pour sortir un objet du tableau d'objet si un cet objet a une propriété qu'on ne souhaite pas conserver
            for( let i = this.friendAddedToVote.length-1; i>=0; i--) {
              if( this.friendAddedToVote[i].friendUID == id) this.friendAddedToVote.splice(i,1);
            }
            this.storage.set('friendAddedToVote', this.friendAddedToVote);
          }
        }
      ]
      });
      alert.present();
    }

    showPopup(title, text) {
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
            this.vote = null;
            this.navCtrl.push(AccueilPage, {}, {animate: true, direction: 'back'});
          }
        }
      ]
      });
      alert.present();
    }

    showErrorMessage(title, text) {
      let alert = this.alertCtrl.create({
        title: title,
        subTitle: text,
        buttons: [
        {
          text: 'Ok',
          role: 'cancel',
        }
      ]
      });
      alert.present();
    }
}
