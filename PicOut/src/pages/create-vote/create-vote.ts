import { Component } from '@angular/core';
import { NavController, AlertController, NavParams } from 'ionic-angular';
import { FriendsPage } from '../friends/friends';
import { CreateVoteSecondStepPage } from '../create-vote-second-step/create-vote-second-step';
import { AccueilPage } from '../accueil/accueil';

// Corto : Ajout du vote, import de AngularFire et Firebase + import de l'objet vote pour stocker le vote
import {AngularFire, FirebaseListObservable} from 'angularfire2';
import {Vote} from '../../providers/models/vote';


/*
  Generated class for the CreateVote page.
  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/

@Component({
  selector: 'page-create-vote',
  templateUrl: 'create-vote.html'
})
export class CreateVotePage {

  voteList: FirebaseListObservable<any>;
  vote;

  constructor(
    public navCtrl: NavController,
    private alertCtrl: AlertController,
    public af: AngularFire) {
    this.voteList = af.database.list('/votes');
  }



  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateVotePage');
  }

  //create vote object
  addVote(title, expiration_date, mail_invite){
    this.vote = new Vote(title, expiration_date, mail_invite);
    console.log(this.vote);
    this.voteList.push({
        title: title,
        expiration_date: expiration_date,
        mail_invite: mail_invite
    }).then( newContact => {
      this.navCtrl.push(CreateVoteSecondStepPage);
    }, error => {
      console.log(error);
    });
 }


 // to page friends
  public moveToFriends() {
    this.navCtrl.push(FriendsPage);
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


}
