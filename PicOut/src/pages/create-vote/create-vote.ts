import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
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

  constructor(public navCtrl: NavController, public af: AngularFire) {
    this.voteList = af.database.list('/votes');
  }



  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateVotePage');
  }

  addVote(title, expiration_date, mail_invite){
    this.vote = new Vote(title, expiration_date, mail_invite);
    //console.log(this.vote);
    this.voteList.push({
        title: title,
        expiration_date: expiration_date,
        mail_invite: mail_invite
    }).then( newContact => {

      // Sharing datas between pages
      this.navCtrl.push(CreateVoteSecondStepPage, {
        registered_vote_state: this.vote
      });

    }, error => {
      console.log(error);
    });
 }

  public moveToFriends() {
    this.navCtrl.push(FriendsPage);
  }
  public moveToSecondStepPage() {
    this.navCtrl.push(CreateVoteSecondStepPage);
  }
  public moveToHome() {
    this.navCtrl.push(AccueilPage);
  }

}
