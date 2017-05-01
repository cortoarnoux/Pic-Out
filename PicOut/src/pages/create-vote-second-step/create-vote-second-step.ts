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

  public options;
  public vote;
  // tabbar links
  public tab1Root = CreateVotePage;
  public tab2Root = CreateVoteSecondStepPage;
  public choix = [0, 1, 2, 3, 4, 5];

  constructor(public nav: NavController, public navParams: NavParams) {
    this.vote = navParams.get('registered_vote_state');
  }

  ionViewDidLoad() {
    console.log(this.vote);
    console.log('ionViewDidLoad CreateVoteSecondStepPage');
  }

  /*public addImage(){
    let options = {
    destinationType   : Camera.DestinationType.DATA_URL,
    sourceType        : Camera.PictureSourceType.PHOTOLIBRARY
    };

    this.nav.camera.getPicture(
        (data)  => {
          let image = "data:image/jpeg;base64," + data;
        },
        (error) => {  },
        options
    );
  }*/

  public moveToFirstStepPage() {
    this.nav.push(CreateVotePage, {}, {animate: true, direction: 'back'});
  }
  public moveToThirdStepPage() {
    this.nav.push(CreateVoteThirdStepPage);
  }
  public moveToHome() {
    this.nav.push(AccueilPage);
  }

}
