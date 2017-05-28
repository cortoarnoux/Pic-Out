import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AccueilPage } from '../accueil/accueil';
import { VotesService } from '../../providers/data/votes-service';
import firebase from 'firebase';

/*
  Generated class for the MyVotes page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-my-votes',
  templateUrl: 'my-votes.html'
})
export class MyVotesPage {

  public currentUser = firebase.auth().currentUser.uid;
  public voteListCreated = [];
  public voteListInvited = [];

  constructor(
    public nav: NavController,
    public navParams: NavParams,
    private votesData: VotesService
  ) {}

  ionViewDidLoad() {

    this.votesData.getVoteListCreated().on('value', (data) => {
      this.voteListCreated.push(data.val());
    });

    console.log("Liste des votes de cet user : ", this.voteListCreated);

    // Votes invités
    // /!\ Ne fonctionne pas encore
    let j = 0;
    this.votesData.getVoteListInvited(this.currentUser).on("child_added", (snapshot) => {
      // Remplit la liste avec les ID
      this.voteListInvited[j]=snapshot.val();
      j ++;
    });
  }

  public moveToHome() {
    this.nav.push(AccueilPage, {}, {animate: true, direction: 'back'});
  }
}
