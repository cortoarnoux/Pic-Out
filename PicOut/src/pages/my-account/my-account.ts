import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { Http} from '@angular/http';
import { CreateVotePage } from '../create-vote/create-vote';
import { FriendsPage } from '../friends/friends';
import { MyVotesPage } from '../my-votes/my-votes';
import { LoginPage } from '../login/login';
import { AccueilPage } from '../accueil/accueil';
import firebase from 'firebase';
import { Storage } from '@ionic/storage';
import { CurrentUserService } from '../../providers/data/currentuser-service';

/*
  Generated class for the MyAccount page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-my-account',
  templateUrl: 'my-account.html'
})
export class MyAccountPage {

  //Récupération de l'objet user actuel de firebase
  public currentUser = firebase.auth().currentUser;

  public thisUser: any;
  public currentUserEmail = "";
  public currentUserUsername = "";

  public constructor(
    public nav: NavController,
    private platform: Platform,
    private http: Http,
    private currentUserService: CurrentUserService
  ) {}

  // Corto : Au chargement de la page
  ionViewDidLoad() {
    // Corto : Récupération des données de l'objet user de l'utilisateur actuel
    this.currentUserService.getCurrentUser(this.currentUser.uid).on('value', (data) => {
      this.thisUser = data.val();
      this.currentUserEmail = this.thisUser.email;
      console.log("Username : ",this.thisUser.username);
      
      if(this.thisUser.username != null){
        this.currentUserUsername = this.thisUser.username;
      }

    });
  }

  public accountUpdateUsername(newUsername){
    this.currentUserService.currentUserUpdateUsername(newUsername)
  }

  public accountUpdateEmail(newEmail){
    this.currentUserService.currentUserUpdateEmail(newEmail)
  }

  public moveToMyHome() {
    this.nav.push(AccueilPage);
  }

}
