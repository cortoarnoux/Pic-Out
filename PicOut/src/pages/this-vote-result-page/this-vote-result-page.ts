import { Component } from '@angular/core';
import { NavController, NavParams, PopoverController, AlertController } from 'ionic-angular';
import { VotesService } from '../../providers/data/votes-service';
import { CurrentUserService } from '../../providers/data/currentuser-service';
import { PopOverZoomChoicePage } from '../pop-over-zoom-choice/pop-over-zoom-choice';
import { MyFinishedVotesPage } from '../my-finished-votes/my-finished-votes';
import { MyVotesPage } from '../my-votes/my-votes';
import { AccueilPage } from '../accueil/accueil';
import { Storage } from '@ionic/storage';
import * as $ from 'jquery';

/*
  Generated class for the ThisVoteResultPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-this-vote-result-page',
  templateUrl: 'this-vote-result-page.html'
})
export class ThisVoteResultPage {
  
  public voteID = this.navParams.get('vote_id');
  public voteTitle = "";
  public voteExpDate = "";
  public voteMasterID = 0;
  public voteMasterName = "";
  public voteResponsesArray: any;
  public invitedPeopleUserIDs: any;
  public choosenUrl = "";
  public alreadyChoosenUrl = "";
  public scoreOriginalArray: any;
  public urlAndScores: any;
  public compactScoreArray = [];

  constructor(public navCtrl: NavController, 
  	public navParams: NavParams,
  	private votesData: VotesService,
  	private currentUserData: CurrentUserService,
    public popoverCtrl: PopoverController,
    public storage: Storage,
    public alertCtrl: AlertController,) {}

  ionViewDidLoad() {

    // Récupération des Datas du vote courant
    this.votesData.getVoteData(this.voteID).on('value', (data) => {
      	console.log(data.val());
      	this.voteTitle = data.val().title;
      	this.voteExpDate = data.val().expiration_date;
      	this.voteMasterID = data.val().voteMasterID;
      	this.invitedPeopleUserIDs = data.val().friendAddedToVote;
      	this.voteResponsesArray = data.val().responsesUrl;
      	this.scoreOriginalArray = data.val().voteScore;
    });

    // Récupération des datas du voteMaster
    this.currentUserData.getCurrentUser(this.voteMasterID).on('value', (data) => {
    	console.log("VoteMaster Datas : ", data.val());
    	this.voteMasterName = data.val().email;
    });

    // Enlever le -1 du tableau des scores
    for(let i in this.scoreOriginalArray) {
    	this.compactScoreArray.push(this.scoreOriginalArray[i]);
    }
    let index = this.compactScoreArray.indexOf(-1);
	this.compactScoreArray.splice(index, 1);
    console.log(this.compactScoreArray);
  }

  public moveToMyFinishedVotes() {
    this.navCtrl.push(MyFinishedVotesPage);
  }

  public moveToHome() {
  	this.navCtrl.push(AccueilPage);
  }
}
