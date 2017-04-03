import { Component } from '@angular/core';
import { NavController, AlertController, Loading } from 'ionic-angular';

import { AuthService } from '../../providers/auth-service';
import { UserService } from '../../providers/data/user-service';

import { RegisterPage } from '../register/register';
import { HomePage } from '../home/home';
import { AccueilPage } from '../accueil/accueil';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [UserService]
})
export class LoginPage {
  private registerCredentials = {email: '', password: ''};
  private homePage = HomePage;

  constructor(
    private navCtrl: NavController,
    private auth: AuthService,
    private alertCtrl: AlertController) {

    let imagePath: String = "/img/" ;
  }

  public login() {
    let authUser = new UserService();

    authUser.auth.signInWithEmailAndPassword(this.registerCredentials.email, this.registerCredentials.password)
      .then((value) => {
        console.log(value.uid);

        firebase.auth().onAuthStateChanged((user) => {
          if (user) {
            console.log(user.uid);
          }
        });
        this.navCtrl.push(AccueilPage);
      })
      .catch((error) => {
        let errorCode = error.code;
        let errorMessage;

        switch(errorCode){
          case "auth/invalid-email":
            errorMessage = "Le format de l'adresse mail est invalide";
            this.showPopup("Erreur", errorMessage);
            break;
          case "auth/wrong-password":
            errorMessage = "Cette combinaison login / password n'existe pas";
            this.showPopup("Erreur", errorMessage);
            break;
          case "auth/user-not-found":
            errorMessage = "Cet utilisateur n'existe pas";
            this.showPopup("Erreur", errorMessage);
            break;
          default:
            this.navCtrl.push(AccueilPage);
            break;
        }
        console.log(errorCode + " " + errorMessage);
    })
  }

  public registerPage() {
    this.navCtrl.push(RegisterPage);
  }

  showPopup(title, text) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: text,
      buttons: ["OK"]
    });
    alert.present();
  }
}
