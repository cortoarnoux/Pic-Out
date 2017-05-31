import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { Http} from '@angular/http';
import { CreateVotePage } from '../create-vote/create-vote';
import { FriendsPage } from '../friends/friends';
import { MyVotesPage } from '../my-votes/my-votes';
import { LoginPage } from '../login/login';
import { MyAccountPage } from '../my-account/my-account';
import firebase from 'firebase';
import { Storage } from '@ionic/storage';
import { CurrentUserService } from '../../providers/data/currentuser-service';
import { MyFinishedVotesPage } from '../my-finished-votes/my-finished-votes';
import { VotesService } from '../../providers/data/votes-service';


declare var window: any;

@Component({
    templateUrl: 'accueil.html',
    selector: 'page-accueil'
})

export class AccueilPage {

  // Corto : Récupération de l'objet user actuel de firebase
  public currentUser = firebase.auth().currentUser;

  public thisUser: any;
  public voteListCreated = [];
  public voteListInvited = [];
  public numberOfNotif = 0;
  public voteListCreatedClosed = [];
  public voteListInvitedClosed = [];
  public numberOfNotifClosed = 0;

  public constructor(
    public nav: NavController,
    private platform: Platform,
    private http: Http,
    private currentUserService: CurrentUserService,
    private votesData: VotesService
  ) {}

  // Corto : Au chargement de la page
  ionViewDidLoad() {
    // Corto : Récupération des données de l'objet user de l'utilisateur actuel
    this.currentUserService.getCurrentUser(this.currentUser.uid).on('value', (data) => {
      this.thisUser = data.val();
      // Corto : Si l'objet n'existe pas dans la base de donnée et donc ne peut être récupéré, création de l'objet
      if(this.thisUser == null){
        // Corto : Appel de la fonction writeUserData avec en paramètre les infos de l'objet User
        this.currentUserService.setCurrentUser(this.currentUser.uid, this.currentUser.email);
      }
    });

    this.countNumberOfOpenedVotes();
    this.countNumberOfClosedVotes();
  }

  // Corto : Petit test pour dire bonjour à l'utilisateur en utilisant les caractères avant le @ de son pseudo s'il n'a pas renseigné son prénom
  user = firebase.auth().currentUser;
  surname = this.user.email.replace(/@.*$/,"");
  showSurname = "Bonjour " + this.surname + " !";

  public moveToCreateVote() {
    this.nav.push(CreateVotePage);
  }
  public moveToMyAccount() {
    this.nav.push(MyAccountPage);
  }
  public moveToFriends() {
    this.nav.push(FriendsPage);
  }
  public moveToMyVotes() {
    this.nav.push(MyVotesPage);
  }
  public moveToLogin() {
    this.nav.push(LoginPage);
    // Corto : Deconnexion
    firebase.auth().signOut()
    .then(function() {
      console.log('Deconnecté');
    }, function(error) {
      console.error('Erreur lors de la deconnexion', error);
    });
  }

  public moveToMyFinishedVotes() {
    this.nav.push(MyFinishedVotesPage);
  }

  public countNumberOfOpenedVotes() {
    let stampCreatedData = [];
    this.votesData.getVoteListCreated().on('value', (data) => {
      stampCreatedData.push(data.val());
    });
    for(let key in stampCreatedData[0]) {
      this.voteListCreated.push(key);
    }
    for(let voteKey in this.voteListCreated) {
      this.votesData.getVoteData(this.voteListCreated[voteKey]).on('value', (data) => {
        if(data.val().state != "closed") {
          this.numberOfNotif++;
        }
      });
    }

    let stampInvitedData = [];
    this.votesData.getVoteListInvited().on('value', (data) => {
      stampInvitedData.push(data.val());
    });
    for(let key in stampInvitedData[0]) {
      this.voteListInvited.push(key);
    }
    for(let voteKey in this.voteListInvited) {
      this.votesData.getVoteData(this.voteListInvited[voteKey]).on('value', (data) => {
        if(data.val().state != "closed") {
          this.numberOfNotif++;
        }
      });
    }
  }

  public countNumberOfClosedVotes() {
    let stampCreatedData = [];
    this.votesData.getVoteListCreated().on('value', (data) => {
      stampCreatedData.push(data.val());
    });
    for(let key in stampCreatedData[0]) {
      this.voteListCreatedClosed.push(key);
    }
    for(let voteKey in this.voteListCreatedClosed) {
      this.votesData.getVoteData(this.voteListCreatedClosed[voteKey]).on('value', (data) => {
        if(data.val().state == "closed") {
          this.numberOfNotifClosed++;
        }
      });
    }

    let stampInvitedData = [];
    this.votesData.getVoteListInvited().on('value', (data) => {
      stampInvitedData.push(data.val());
    });
    for(let key in stampInvitedData[0]) {
      this.voteListInvitedClosed.push(key);
    }
    for(let voteKey in this.voteListInvitedClosed) {
      this.votesData.getVoteData(this.voteListInvitedClosed[voteKey]).on('value', (data) => {
        if(data.val().state == "closed") {
          this.numberOfNotifClosed++;
        }
      });
    }
  }
}
