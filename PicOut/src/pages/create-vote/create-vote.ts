import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FriendsPage } from '../friends/friends';
import { CreateVoteSecondStepPage } from '../create-vote-second-step/create-vote-second-step';
import { AccueilPage } from '../accueil/accueil';

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

  constructor(public nav: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateVotePage');
  }

  public moveToFriends() {
    this.nav.push(FriendsPage);
  }
  public moveToSecondStepPage() {
    this.nav.push(CreateVoteSecondStepPage);
  }
  public moveToHome() {
    this.nav.push(AccueilPage);
  }

}
