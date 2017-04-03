import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { Http} from '@angular/http';
import { CreateVotePage } from '../create-vote/create-vote';
import { FriendsPage } from '../friends/friends';
import { MyVotesPage } from '../my-votes/my-votes';
import { LoginPage } from '../login/login';
import { MyAccountPage } from '../my-account/my-account';
import firebase from 'firebase';

declare var window: any;

@Component({
    templateUrl: 'accueil.html',
    selector: 'page-accueil'
})

export class AccueilPage {

  public constructor(
    public nav: NavController,
    private platform: Platform,
    private http: Http
  ) {}

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
    let testDisconnect = false;
    firebase.auth().signOut().then(function() {
      console.log('Signed Out');
      testDisconnect = true;
    }, function(error) {
      console.error('Sign Out Error', error);
    });
    if(testDisconnect = true){
      this.nav.push(LoginPage);
    }
  }
}
