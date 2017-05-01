import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AccueilPage } from '../accueil/accueil';
import { VotesService } from '../../providers/data/votes-service';
import firebase from 'firebase';
import {Vote} from '../../providers/models/vote';

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
  public voteList = [];
  public voteListDisp = [];

  constructor(
    public nav: NavController,
    public navParams: NavParams,
    private votesData: VotesService
  ) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyVotesPage');

  }

    public moveToHome() {
      //this.nav.push(AccueilPage, {}, {animate: true, direction: 'back'});
      this.getVotesForUser(this.currentUser);
    }

    public getVotesForUser(userID){
        // Trouver tous les votes ou l'ID du createur est l'ID courant
        var ref = firebase.database().ref("/votes");
        ref.orderByChild("voteMasterID").equalTo(this.currentUser).on("child_added", function(snapshot) {

          // affiche bien les votes ou le voteMasterID est celui de l'user courant
          console.log(snapshot.key);

          // remplir la liste avec les resultats
          /* Donne l'erreur
          snapshot.forEach( snap => {
            this.voteList.push({
              id: snap.key
            });
          return false
          });
          console.log(this.voteList);
          */

        });


        
/*
        for(let vote in this.voteList){
          let thisVoteID = this.voteList[vote].id;
            ref.equalTo(thisVoteID).on("child_added", function(snapshot) {
              this.voteListDisp.push(snapshot.key);
            });
        }
*/

    }




}
