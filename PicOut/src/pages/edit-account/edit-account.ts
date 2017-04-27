import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { Http} from '@angular/http';
import { AccueilPage } from '../accueil/accueil';
import firebase from 'firebase';
import { CurrentUserService } from '../../providers/data/currentuser-service';

/*
  Generated class for the EditAccount page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/

@Component({
  selector: 'page-edit-account',
  templateUrl: 'edit-account.html'
})
export class EditAccountPage {


  //Récupération de l'objet user actuel de firebase
  public currentUser = firebase.auth().currentUser;

  public thisUser: any;
  public currentUserEmail = "";
  public currentUserUsername = "Choisir un pseudo";
  public currentUserFirstName;
  public currentUserLastName;


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
      if(this.thisUser.username != null){
        this.currentUserUsername = this.thisUser.username;
      }
      this.currentUserFirstName = this.thisUser.firstname == null ? "Votre prénom" : this.thisUser.firstname;
      this.currentUserLastName = this.thisUser.lastname == null ? "Votre nom" : this.thisUser.lastname;
    });
  }

  public accountUpdateUsername(newUsername){
    this.currentUserService.currentUserUpdateUsername(newUsername)
  }

  public accountUpdateEmail(newEmail){
    this.currentUserService.currentUserUpdateEmail(newEmail)
  }

  public accountUpdateFirstName(newFirstname) {
    this.currentUserService.currentUserUpdateFirstName(newFirstname);
  }

  public accountUpdateLastName(newLastname) {
    this.currentUserService.currentUserUpdateLastName(newLastname);
  }

  public moveToMyHome() {
    this.nav.push(AccueilPage);
  }

}
