import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AccueilPage } from '../accueil/accueil';
import { VotesService } from '../../providers/data/votes-service';
import { MyCreatedVotePage } from '../my-created-vote/my-created-vote';
import { VoteGuestedPage } from '../vote-guested/vote-guested';
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
  public voteListInvitedData = [];
  public voteListCreatedData = [];


  constructor(
    public nav: NavController,
    public navParams: NavParams,
    private votesData: VotesService
  ) {}

  ionViewDidLoad() {

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
    // Récupération des datas de chaque vote
    for(let voteKey in this.voteListCreated) {
      this.votesData.getVoteData(this.voteListCreated[voteKey]).on('value', (data) => {
        this.voteListCreatedData.push([this.voteListCreated[voteKey], data.val().title]);
      });
    }
    console.log("Liste des votes de cet user : ", this.voteListCreatedData);

    // Pour récupérer les clefs d'objet dans un taleau d'objets
    // On crée un tampon pour stocker le premier tableau d'objets
    let stampInvitedData = [];
    // On récupère le tableau brut depuis firebase
    this.votesData.getVoteListInvited().on('value', (data) => {
      stampInvitedData.push(data.val());
    });
    // On récupère simplment les clefs comme on le ferait pour l'index d'un tableau ordinaire
    for(let key in stampInvitedData[0]) {
      this.voteListInvited.push(key);
    }
    // Récupération des datas de chaque vote
    for(let voteKey in this.voteListInvited) {
      this.votesData.getVoteData(this.voteListInvited[voteKey]).on('value', (data) => {
        this.voteListInvitedData.push([this.voteListInvited[voteKey], data.val().title]);
      });
    }
    console.log("Liste des votes de cet user : ", this.voteListInvitedData);
  }


  public moveToMyCreatedVote(id) {
    this.nav.push(MyCreatedVotePage, {
      vote_id: id
    });
  }

  public moveToMyInvitedVote(id) {
    this.nav.push(VoteGuestedPage, {
      vote_id: id
    });
  }


  public moveToHome() {
    this.nav.push(AccueilPage, {}, {animate: true, direction: 'back'});
  }
}
