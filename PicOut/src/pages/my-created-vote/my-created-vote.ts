import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { Http} from '@angular/http';
import { AccueilPage } from '../accueil/accueil';
import { MyVotesPage } from '../my-votes/my-votes';
import firebase from 'firebase';
import { CurrentUserService } from '../../providers/data/currentuser-service';
import { VotesService } from '../../providers/data/votes-service';

/*
  Generated class for the MyCreatedVote page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-my-created-vote',
  templateUrl: 'my-created-vote.html'
})
export class MyCreatedVotePage {

  public thisVote: any;
  public thisVoteTitle = "";
  public thisVoteDate = "";


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private alertCtrl: AlertController,
    private voteService: VotesService
  ) {}

  voteID = this.navParams.get('vote_id');

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyCreatedVotePage');
    console.log(this.voteID);

    this.voteService.getVoteData(this.voteID).on('value', (data) => {
      this.thisVote = data.val();
      this.thisVoteTitle = this.thisVote.title;
      this.thisVoteDate = this.thisVote.expiration_date;
    });

  }

  //Supprimer le vote
  public supprimerVote(){
    this.navCtrl.push(MyVotesPage);
    this.voteService.deleteThisVote(this.voteID);
  }

  //terminer vote
  public terminerVote(newTitle){
    let errorMessage;
    errorMessage= "Etes vous sur de vouloir terminer votre vote ?";
    this.showPopup("Attention", errorMessage);
  }

  //update new title
  public voteUpdateTitle(newTitle){
    this.voteService.thisVoteUpdateTitle(newTitle, this.voteID)
  }

  //update new date
  public voteUpdateDate(newDate){
    this.voteService.thisVoteUpdateDate(newDate, this.voteID)
  }

  //Retour à l'accueil
  public moveToMyVotesPage() {
    this.navCtrl.push(MyVotesPage);
  }


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
        text: 'Ok',
        handler: () => {
          this.voteService.shutDownVote(this.voteID);
          this.navCtrl.push(MyVotesPage, {}, {animate: true, direction: 'back'});
        }
      }
    ]
    });
    alert.present();
  }


}
