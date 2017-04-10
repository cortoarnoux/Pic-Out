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
      // Corto : Si l'objet n'existe pas dans la base de donnée et donc ne peut être récupéré, création de l'objet
      console.log(this.thisUser);
      if(this.thisUser == null){
        // Corto : Appel de la fonction writeUserData avec en paramètre les infos de l'objet User
        this.currentUserService.setCurrentUser(this.currentUser.uid, this.currentUser.email);
      }
    });
  }



  // récupération des infos de l'utilisateur
  user = firebase.auth().currentUser;
  surname = this.user.email.replace(/@.*$/,"");
  showSurname = this.surname;
  showEmail = this.user.email;




  //retour à l'accueil
  public moveToMyHome() {
    this.nav.push(AccueilPage);
  }

}
