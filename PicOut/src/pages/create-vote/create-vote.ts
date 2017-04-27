import { Component } from '@angular/core';
import { NavController, AlertController, NavParams } from 'ionic-angular';
import { FriendsPage } from '../friends/friends';
import { AddFriendVotePage } from '../add-friend-vote/add-friend-vote';
import { CreateVoteSecondStepPage } from '../create-vote-second-step/create-vote-second-step';
import { AccueilPage } from '../accueil/accueil';
import firebase from 'firebase';

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


  // tabbar links
  tab1Root = CreateVotePage;
  tab2Root = CreateVoteSecondStepPage;

  constructor(
    public navCtrl: NavController,
    private alertCtrl: AlertController,
    private navParams: NavParams,
    public af: AngularFire) {
    this.voteList = af.database.list('/votes');
  }

  public currentUserID = firebase.auth().currentUser.uid;

  ionViewDidLoad() {
    console.log(this.currentUserID);
    console.log('ionViewDidLoad CreateVotePage');
    console.log(this.navParams.get('emails_added'));
  }

  //create vote object
  addVote(title, expiration_date, mail_invite){

    this.vote = new Vote(title, expiration_date, mail_invite);

    if(this.vote.title == "" || this.vote.expiration_date == null){
      if(this.vote.title == ""){
        let errorMessage= "Vous n'avez pas renseigné de titre à votre sondage";
        this.showErrorMessage("Attention", errorMessage);
      } else {
        let errorMessage= "Vous n'avez pas renseigné de date à votre sondage";
        this.showErrorMessage("Attention", errorMessage);
      }
    } else {
      this.voteList.push({
          voteMasterID: this.currentUserID,
          title: title,
          expiration_date: expiration_date,
          mail_invite: mail_invite || 0
      }).then( newContact => {

        // Sharing datas between pages
        this.navCtrl.push(CreateVoteSecondStepPage, {
          registered_vote_state: this.vote
        });

      }, error => {
        console.log(error);
      });
    }

   }


   // to page friends
    public moveToFriends() {
      this.navCtrl.push(AddFriendVotePage, {
        registered_vote_state: this.vote
      });
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
