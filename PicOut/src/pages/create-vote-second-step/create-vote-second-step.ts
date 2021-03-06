import { Component, NgZone } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { CreateVotePage } from '../create-vote/create-vote';
import { CreateVoteThirdStepPage } from '../create-vote-third-step/create-vote-third-step';
import { AccueilPage } from '../accueil/accueil';
import { Camera, Device } from 'ionic-native';
import { ChangeDetectorRef } from '@angular/core';
import { BehaviorSubject } from 'rxjs/Rx';
import firebase from 'firebase';
import { Vote } from '../../providers/models/vote';
import { VotesService } from '../../providers/data/votes-service';
import { CurrentUserService } from '../../providers/data/currentuser-service';
import { ChooseImageFromPicOutPage } from '../choose-image-from-pic-out/choose-image-from-pic-out';
import { PopoverController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import * as $ from 'jquery';

declare var window: any;

@Component({
  selector: 'page-create-vote-second-step',
  templateUrl: 'create-vote-second-step.html'
})
export class CreateVoteSecondStepPage {

  public options;
  public vote;
  public objectVote: Vote;
  // tabbar links
  public tab1Root = CreateVotePage;
  public tab2Root = CreateVoteSecondStepPage;
  public choix = [];
  public choixIndex = 0;
  public choixPhoto = [];
  public picturesArray = [];
  public choixTemp = [];
  public choixPhotoTemp = [];
  public currentChoice: any;
  public responsesUrl = [];
  public scoreArray = [];
  public myChoice = null;
  public choosenPicOutUrl = null;

  constructor(
    public nav: NavController, 
    public navParams: NavParams, 
    private _zone: NgZone, 
    private alertCtrl: AlertController, 
    private currentUserService: CurrentUserService,
    private voteService: VotesService,
    public popoverCtrl: PopoverController,
    public storage: Storage,) {
    this.vote = navParams.get('registered_vote_state');
  }

  ionViewDidLoad() {

  }

  public moveToFirstStepPage() {
    this.nav.push(CreateVotePage, {}, {animate: true, direction: 'back'});
  }

  // Ajouter un choix via camera
  public addAChoiceCamera(){
   // Prendre une photo
   this.doGetPicture(this.choixIndex);
  }

  // Ajouter un choix via Galerie photo
  public addAChoiceGallery(){
   // Prendre une photo
   this.doGetPictureGallery(this.choixIndex);
  }

  // Enlever un des choix effecté
  public actionOnThisChoice(i) {
    let infoMessage = "Quelle action voulez-vous effectuer sur l'élement ?";
    this.chooseActionOnChoicePopUp("Choix", infoMessage, i);
  }

  chooseActionOnChoicePopUp(title, text, i) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: text,
      buttons: [
      {
        text: 'Choisir',
        handler: () => {
          // Définition d'un index grâce à l'élement clické
          let index = this.choix.indexOf(i);
          console.log("Choix numero :", i);
          this.myChoice = i;
        }
      },
      {
        text: 'Effacer',
        handler: () => {
          // Définition d'un index grâce à l'élement clické
          let index = this.choix.indexOf(i);
          // On enlève cet index dans le tableau des choix
          this.choix.splice(index, 1);
          // On l'enlève également dans le tableau des URls si celui-ci n'est pas vide, vérification pour débug
          if(this.responsesUrl != []) {
            this.responsesUrl.splice(index, 1);
          }
        }
      },
      {
        text: 'Annuler',
        role: 'cancel',
      }      
    ]
    });
    alert.present();
  }

  // Confirmation avant envoi du vote
  public confirmVote(){
   let validateMessage = "Est-ce que c'est tout bon ?"
   this.showPopup("Attention", validateMessage);
  }

 // Conversion de l'image en format blob
 convertIntoBlob(imagePath) {
   return new Promise((resolve, reject) => {
     window.resolveLocalFileSystemURL(imagePath, (fileEntry) => {

       fileEntry.file((resFile) => {

         var reader = new FileReader();
         reader.onloadend = (evt: any) => {
           var imgBlob: any = new Blob([evt.target.result], { type: 'image/jpeg' });
           imgBlob.name = 'image.jpg';
           resolve(imgBlob);
         };

         reader.onerror = (e) => {
           console.log('Failed file read: ' + e.toString());
           reject(e);
         };

         reader.readAsArrayBuffer(resFile);
       });
     });
   });
 }

 // Upload de l'image prise en photo dans Firebase
 uploadToFirebase(imageBlob) {
   var fileName = 'image-' + new Date().getTime() + '.jpg';

   return new Promise((resolve, reject) => {
     var fileRef = firebase.storage().ref('images/' + fileName);

     var uploadTask = fileRef.put(imageBlob);

     uploadTask.on('state_changed', (snapshot) => {
       console.log('snapshot progess ' + snapshot);
     }, (error) => {
       reject(error);
     }, () => {
       resolve(uploadTask.snapshot);
     });
   });
 }

 // Ajout de l'image de l'utilisateur dans les assets de la base
 saveToDatabaseAssetList(uploadSnapshot) {
   var ref = firebase.database().ref('assets');

   return new Promise((resolve, reject) => {
     var dataToSave = {
       'URL': uploadSnapshot.downloadURL,
       'name': uploadSnapshot.metadata.name,
       'owner': firebase.auth().currentUser.uid,
       'email': firebase.auth().currentUser.email,
       'lastUpdated': new Date().getTime(),
     };

     ref.push(dataToSave, (response) => {
       resolve(response);
     }).catch((error) => {
       reject(error);
     });

     // Ajouter le choix dans le tableau des choix pour le faire apparaitre dans le visuel
     this.choix.push(this.choixIndex);
     this.choixTemp = this.choix;
     this.choixIndex++;
     // Hack pour ne pas avoir à recharger la page
     this._zone.run(() => this.choix = this.choixTemp);
     setTimeout(function (){
        $('.jq-choice-list .choice:last-child').css({'backgroundImage': 'url('+dataToSave.URL+')', 'background-size': 'cover'});
      }, 1000);
     this.responsesUrl.push(dataToSave.URL);

   });
 }

 // Fonction permettant de faire fonctionne le plugin cordova pour la prise de photo
 doGetPicture(eachChoix) {

   this.currentChoice = eachChoix;

   let imageSource = (Device.isVirtual ? Camera.PictureSourceType.PHOTOLIBRARY : Camera.PictureSourceType.CAMERA);

   Camera.getPicture({
     destinationType: Camera.DestinationType.FILE_URI,
     sourceType: imageSource,
     targetHeight: 640,
     correctOrientation: true
   }).then((imagePath) => {
     return this.convertIntoBlob(imagePath);
   }).then((imageBlob) => {
     return this.uploadToFirebase(imageBlob);
   }).then((uploadSnapshot: any) => {
     return this.saveToDatabaseAssetList(uploadSnapshot);
   }).then((uploadSnapshot: any) => {
   }, (error) => {
     alert('Error ' + (error.message || error));
   });
 }

 // Fonction permettant de faire fonctionne le plugin cordova pour la récupération de photo directement dans le mobile
 doGetPictureGallery(eachChoix) {

   this.currentChoice = eachChoix;

   Camera.getPicture({
     destinationType: Camera.DestinationType.FILE_URI,
     sourceType:  Camera.PictureSourceType.SAVEDPHOTOALBUM,
     targetHeight: 640,
     correctOrientation: true
   }).then((imagePath) => {
     return this.convertIntoBlob(imagePath);
   }).then((imageBlob) => {
     return this.uploadToFirebase(imageBlob);
   }).then((uploadSnapshot: any) => {
     return this.saveToDatabaseAssetList(uploadSnapshot);
   }).then((uploadSnapshot: any) => {
   }, (error) => {
     alert('Error ' + (error.message || error));
   });
 }

 // Ouvre la page images de PicOut
 addAPicOutPicture() {
   this.presentPopover();
 }

 // Vérification du vote et envoi dans la BDD
 showPopup(title, text) {
      let alert = this.alertCtrl.create({
        title: title,
        subTitle: text,
        buttons: [
        {
          text: 'Annuler',
          role: 'cancel',
        },
        {
          text: 'Valider le vote',
          handler: () => {

            for(let reponseIndex in this.responsesUrl) {
              console.log(reponseIndex);
              if(reponseIndex == this.myChoice) {
                this.scoreArray.push(1);
              } else {
                this.scoreArray.push(0);
              }
            }

            if(typeof this.vote[4] === 'undefined') {
              this.objectVote = new Vote(this.vote[0], this.vote[1], this.vote[2], this.vote[3], this.responsesUrl, "opened", this.scoreArray);
            } else {
              this.objectVote = new Vote(this.vote[0], this.vote[1], this.vote[2], this.vote[3], this.responsesUrl, "opened", this.scoreArray, this.vote[4]);
            }

            var ref = firebase.database().ref('votes');
            var key: any;

            ref.push(this.objectVote)
            .then((snap) => {
              key = snap.key;

              for(let friend in this.vote[3]){
                console.log(this.vote[3][friend]);
                this.currentUserService.addvoteForCurrentFriend(this.vote[3][friend].friendUID, key);
              }

              // Ajouter à l'utilisateur ses votes MasterID
              this.voteService.pushThisVoteAsMaster(key);
              
            });

            console.log(this.objectVote);
            this.nav.push(AccueilPage, {}, {animate: true, direction: 'back'});
          }
        }
      ]
      });
      alert.present();
    }

  presentPopover() {
    let popover = this.popoverCtrl.create(ChooseImageFromPicOutPage);
    popover.present();
    popover.onWillDismiss(() => {
      let urlStamp = this.storage.get('choosenPicOutUrl');
      let url: any;
      urlStamp.then(data => {
        url = data;
        this.choix.push(this.choixIndex);
        this.choixIndex++;

        setTimeout(function (){
          $('.jq-choice-list .choice:last-child').css({'backgroundImage': 'url('+url+')', 'background-size': 'cover'});
        }, 1000);

        this.responsesUrl.push(url);
      });
      
   });
  }
}
