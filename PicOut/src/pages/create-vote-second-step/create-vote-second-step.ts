import { Component, NgZone } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { CreateVotePage } from '../create-vote/create-vote';
import { CreateVoteThirdStepPage } from '../create-vote-third-step/create-vote-third-step';
import { AccueilPage } from '../accueil/accueil';
import { Camera, Device } from 'ionic-native';
import { ChangeDetectorRef } from '@angular/core';
import { BehaviorSubject } from 'rxjs/Rx';
import firebase from 'firebase';
import * as $ from 'jquery'

declare var window: any;

@Component({
  selector: 'page-create-vote-second-step',
  templateUrl: 'create-vote-second-step.html'
})
export class CreateVoteSecondStepPage {

  public options;
  public vote;
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

  constructor(public nav: NavController, public navParams: NavParams, private _zone: NgZone) {
    this.vote = navParams.get('registered_vote_state');
  }

  ionViewDidLoad() {
    $('h4').css('color', 'red');
    console.log(this.vote);
    console.log('ionViewDidLoad CreateVoteSecondStepPage');
  }

  public moveToFirstStepPage() {
    this.nav.push(CreateVotePage, {}, {animate: true, direction: 'back'});
  }
  public moveToThirdStepPage() {
    this.nav.push(CreateVoteThirdStepPage);
  }
  public moveToHome() {
    this.nav.push(AccueilPage);
  }

  public addAChoice(){
   this.doGetPicture(this.choixIndex);
   this.choix.push(this.choixIndex);
   this.choixTemp = this.choix;
   this.choixIndex++;
   this._zone.run(() => this.choix = this.choixTemp);
  }

 /*ngOnInit() {
  // Let's load our data here
  this.loadData();
 }

 loadData() {
   firebase.database().ref('assets').on('value', (snapshot: any) => {
 // We need to create this array first to store our local data
 let rawList = [];
 // Iterate to every value
     snapshot.forEach((childSnapshot) => {
       var element = childSnapshot.val();
       element.id = childSnapshot.key;

       rawList.push(element);
     });

     this.picturesArray = rawList;
   });
 }*/

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

 uploadToFirebase(imageBlob) {
// Let's use a simple name
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

     //this.choixPhoto.push(dataToSave.URL);

     ref.push(dataToSave, (response) => {
       resolve(response);
     }).catch((error) => {
       reject(error);
     });

     //this.vote.push(dataToSave.URL);
     var tempCurrentChoice = this.currentChoice + 1;
     $('.jq-choice-list .choice:nth-child('+tempCurrentChoice+')').css({'backgroundImage': 'url('+dataToSave.URL+')', 'background-size': 'cover'});

   });
 }

 doGetPicture(eachChoix) {

   /*this.choixPhoto.push(this.picturesArray[eachChoix]);
   this.choixPhotoTemp =  this.choixPhoto;
   this._zone.run(() => this.choixPhoto = this.choixPhotoTemp);*/

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
     //alert('file saved to asset catalog successfully  ');
   }, (error) => {
     alert('Error ' + (error.message || error));
   });
 }
}
