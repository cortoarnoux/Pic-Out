import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AccueilPage } from '../accueil/accueil';
import { VotesService } from '../../providers/data/votes-service';
import { MyCreatedVotePage } from '../my-created-vote/my-created-vote';
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

    // ** POUR HUGO ** //
      // Pour récupérer les clefs d'objet dans un taleau d'objets
      // On crée un tampon pour stocker le premier tableau d'objets
      let stampCreatedData = [];
      // On récupère le tableau brut depuis firebase
      this.votesData.getVoteListCreated().on('value', (data) => {
        stampCreatedData.push(data.val());
      });
      // On récupère simplment les clefs comme on le ferait pour l'index d'un tableau ordinaire
      for(let key in stampCreatedData[0]) {
        this.voteListCreated.push(key);
      }
      // Et voilà =)
      console.log("Liste des votes de cet user : ", this.voteListCreated);
      // Hello @github

    // Votes invités
    // let j = 0;
    // this.votesData.getVoteListInvited(this.currentUser).on("child_added", (snapshot) => {
    //   // Remplit la liste avec les ID
    //   this.voteListInvited[j]=snapshot.val();
    //   j ++;
    // });
  }


  public moveToMyCreatedVote(id) {
    this.nav.push(MyCreatedVotePage, {
      vote_id: id
    });
  }


  public moveToHome() {
    this.nav.push(AccueilPage, {}, {animate: true, direction: 'back'});
  }
}
