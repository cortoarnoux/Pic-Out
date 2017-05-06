import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { UserService } from '../../providers/data/user-service';
import { AccueilPage } from '../accueil/accueil';
import firebase from 'firebase';

@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {
  createSuccess = false;
  registerCredentials = {email: '', password: ''};

  constructor(
    private nav: NavController,
    private alertCtrl: AlertController)
  {}

  public register() {

    firebase.auth().signOut()
      .then(function() {
        console.log('Signed Out');
      }, function(error) {
        console.error('Sign Out Error', error);
     });

    let createUser = new UserService();

    createUser.auth.createUserWithEmailAndPassword(this.registerCredentials.email, this.registerCredentials.password)
      .then((val) => {
        this.showValidPopup("Success", "Compte créé avec succès");
      })
      .catch((error) =>{
        let errorCode = error.code;
        let errorMessage;

        switch(errorCode){
          case "auth/invalid-email":
            errorMessage = "Le format de l'adresse mail est invalide";
            break;
          case "auth/weak-password":
            errorMessage = "Mot de passe trop faible, en choisir un de 6 caractères minimum";
            break;
        }

        this.showErrorPopup("Erreur", errorMessage);
        console.log(errorCode + " " + errorMessage);
      })
  }

  showValidPopup(title, text) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: text,
      buttons: [
       {
         text: 'OK',
         handler: data => {
           this.nav.push(AccueilPage);
         }
       }
     ]
    });
    alert.present();
  }

  showErrorPopup(title, text) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: text,
      buttons: ["OK"]
    });
    alert.present();
  }
}
