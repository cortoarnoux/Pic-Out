import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import { UserService } from '../../providers/data/user-service';
import { RegisterPage } from '../register/register';
import { AccueilPage } from '../accueil/accueil';
import { Facebook } from '@ionic-native/facebook';
import { User } from '../../providers/models/user';
import firebase from 'firebase';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [UserService, Facebook]
})
export class LoginPage {

  private registerCredentials = {email: '', password: ''};

  constructor(
    private navCtrl: NavController,
    private auth: AuthService,
    private alertCtrl: AlertController,
    private facebook: Facebook) {
  }

  public login() {
    let authUser = new UserService();

    // Corto : Deconnecte l'utilisateur si celui-ci est connecté, vérification pour éviter les conflits
    firebase.auth().signOut()
      .then(function() {
        console.log('Signed Out');
      }, function(error) {
        console.error('Sign Out Error', error);
     });

    authUser.auth.signInWithEmailAndPassword(this.registerCredentials.email, this.registerCredentials.password)
      .then((value) => {
        this.navCtrl.push(AccueilPage);
      })
      .catch((error) => {
        let errorCode = error.code;
        let errorMessage;

        switch(errorCode){
          case "auth/invalid-email":
            errorMessage = "Le format de l'adresse mail est invalide";
            break;
          case "auth/wrong-password":
            errorMessage = "Cette combinaison login / password n'existe pas";
            break;
          case "auth/user-not-found":
            errorMessage = "Cet utilisateur n'existe pas";
            break;
          case "auth/network-request-failed":
            errorMessage = "Impossible de contacter le serveur, merci de vérifier votre connexion à internet";
            break;
          default:
            errorMessage = "Erreur inconnue, merci de contacter le support";
            break;
        }
        this.showPopup("Erreur", errorMessage);
        console.log(errorCode + " " + errorMessage);
    })
  }

  public loginWithFacebook() {
    let authUser = new UserService();
    var authInfo: User;
    this.facebook.login(['public_profile', 'email'])
      .then((response) => {
        const facebookCredential = authUser.authFacebook
          .credential(response.authResponse.accessToken);

        this.facebook.api("/me?fields=first_name,last_name,name,age_range,gender,email",
          ['public_profile', 'email'])
          .then((response) => {
            authInfo = new User(response.name, response.last_name, response.first_name);
            if(response.email) authInfo.setEmail(response.email);
            if(response.age_range.min) authInfo.setRangeMin(response.age_range.min);
            if(response.age_range.max) authInfo.setRangeMax(response.age_range.max);
          })
          .catch((error) =>{
            this.showPopup("facebook api error", JSON.stringify(error));
          });

        authUser.auth.signInWithCredential(facebookCredential)
          .then((success) => {
            authUser.setUserInfos(authInfo, authUser.auth.currentUser.uid);
            this.navCtrl.push(AccueilPage);
          })
          .catch((error) => {
            this.showPopup("firebase error", JSON.stringify(error));
          });
      })
      .catch((error) => {
        this.showPopup("facebook error", JSON.stringify(error));
      });
  }

  public registerPage() {
    this.navCtrl.push(RegisterPage);
  }

  showPopup(title, text) {
    let alert = this.alertCtrl.create({
      title: title,
      message: text,
      buttons: ["OK"]
    });
    alert.present();
  }
}
