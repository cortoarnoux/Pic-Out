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
    console.log(this.vote);

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

    presentPopover() {
      let popover = this.popoverCtrl.create(PopOverVoteAddFriendPage, {
        SelectedFriendID: this.friendAddedToVote
      });
      popover.present();
      popover.onDidDismiss(() => {
        this.storage.get('friendAddedToVote').then((val) => {
          this.friendAddedToVote = val;
        })
        for(let friend in this.friendAddedToVote) {
          let id = this.friendsService.getFriendEmail(this.friendAddedToVote[friend]);
          console.log(id);
          this.friendsEmail.push(id);
        }
        console.log(this.friendAddedToVote);
        console.log(this.friendsEmail);
      });
    }

    // cancel or ok with clear vote object
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

    // cancel or ok with clear vote object without redirection
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
