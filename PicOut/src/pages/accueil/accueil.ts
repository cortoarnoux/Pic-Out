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

  // Corto : Récupération de l'objet user actuel de firebase
  public currentUser = firebase.auth().currentUser;
  // Corto : Récupération du chemin vers la liste des users (notre user, pas celui de l'auth) dans firebase
  public userProfile = firebase.database().ref('/users');


  public constructor(
    public nav: NavController,
    private platform: Platform,
    private http: Http
  ) {}

  // Corto : Au chargement de la page
  ionViewDidLoad() {
    // Corto : Appel de la fonction writeUserData avec en paramètre les infos de l'objet User
    this.writeUserData(this.currentUser.uid, this.currentUser.email);

    // Corto : Lecture de l'objet user pour vérification de son existance dans l'optique d'update. EN COURS
    /*let user = this.readUserProfile();
    console.log(user);*/
  }

  // Corto : Fonction qui permet d'ajouter des infos à l'utilisateur dans notre bdd
  writeUserData(userId, email) {
    firebase.database().ref('users/' + userId).set({
      email: email
    });
  }

  // Corto : Lecture de l'objet user pour vérification de son existance dans l'optique d'update. EN COURS
  /*readUserProfile(): firebase.database.Reference {
    return this.userProfile.child(this.currentUser.uid);
  }*/

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
      console.error('Erreur lors de la deconnecxion', error);
    });
  }
}
