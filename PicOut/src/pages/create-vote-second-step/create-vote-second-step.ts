import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { CreateVotePage } from '../create-vote/create-vote';
import { CreateVoteThirdStepPage } from '../create-vote-third-step/create-vote-third-step';
import { AccueilPage } from '../accueil/accueil';

/*
  Generated class for the CreateVoteSecondStep page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-create-vote-second-step',
  templateUrl: 'create-vote-second-step.html'
})
export class CreateVoteSecondStepPage {

  constructor(public nav: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateVoteSecondStepPage');
  }

  public moveToFirstStepPage() {
    this.nav.push(CreateVotePage);
  }
  public moveToThirdStepPage() {
    this.nav.push(CreateVoteThirdStepPage);
  }
  public moveToHome() {
    this.nav.push(AccueilPage);
  }

}
