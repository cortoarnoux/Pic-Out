import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import firebase from 'firebase';
import { CreateVoteSecondStepPage } from '../create-vote-second-step/create-vote-second-step';

@Component({
  selector: 'page-choose-image-from-pic-out',
  templateUrl: 'choose-image-from-pic-out.html'
})
export class ChooseImageFromPicOutPage {

  public imageList = [];

  constructor(
  	public navCtrl: NavController, 
  	public navParams: NavParams,
  	public storage: Storage,
  	public alertCtrl: AlertController,
  	) {}

  ionViewDidLoad() {

    this.getAllTheAssets().on('value', snapshot => {
      let rawList = [];
      snapshot.forEach( snap => {
        this.imageList.push(snap.val().URL);
      return false
      });
    });

    console.log(this.imageList);
  }

  getAllTheAssets(): firebase.database.Reference {
    return firebase.database().ref(`/assets/`);
  }

  actionOnThisChoice(url) {
  	let infoMessage;
    infoMessage = "Voulez-vous vraiment ajouter cette image à votre vote ?";
    this.showAddPicOutPicture("Vérification", infoMessage, url);
  }

  showAddPicOutPicture(title, text, url) {
	  let alert = this.alertCtrl.create({
	    title: title,
	    subTitle: text,
	    buttons: [
	    {
	      text: 'Annuler',
	      role: 'cancel',
	    },
	    {
	      text: 'Ok',
	      handler: () => {
	      	console.log(url);
	      	this.storage.set('choosenPicOutUrl', url);
	        alert.dismiss();
	      }
	    }
	  ]
	  });
	  alert.present();
	}
}
