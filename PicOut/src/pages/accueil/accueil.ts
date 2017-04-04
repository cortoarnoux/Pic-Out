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

declare var window: any;

@Component({
    templateUrl: 'accueil.html',
    selector: 'page-accueil'
})

export class AccueilPage {

  public showSurname = "Bonjour !";

  public constructor(
    public nav: NavController,
    private platform: Platform,
    private http: Http
  ) {}

  ionViewDidLoad() {
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
      }
    });
  }

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
    firebase.auth().signOut()
    .then(function() {
      console.log('Signed Out');
    }, function(error) {
      console.error('Sign Out Error', error);
    });
    this.nav.push(LoginPage);
  }
}
