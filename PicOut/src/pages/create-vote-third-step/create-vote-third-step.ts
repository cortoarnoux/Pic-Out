import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { CreateVoteSecondStepPage } from '../create-vote-second-step/create-vote-second-step';
import { FriendsPage } from '../friends/friends';


/*
  Generated class for the CreateVoteThirdStep page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-create-vote-third-step',
  templateUrl: 'create-vote-third-step.html'
})
export class CreateVoteThirdStepPage {

  constructor(public nav: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateVoteThirdStepPage');
  }

  public moveToSecondStep() {
    this.nav.push(CreateVoteSecondStepPage);
  }
  public moveToFriends() {
    this.nav.push(FriendsPage);
  }

}
