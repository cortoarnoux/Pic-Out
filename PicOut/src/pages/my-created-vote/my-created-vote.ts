import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Http} from '@angular/http';
import { AccueilPage } from '../accueil/accueil';
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


//   public supprimerVote(){
//     this.voteService.deleteThisVote(this.voteID)
//   }
//
// ///////////////////
//   deleteThisVote(voteID): firebase.database.Reference {
//     firebase.database().ref(`votes/${voteID}`).remove();
//   }
// ///////////////////


  public voteUpdateTitle(newTitle){
    this.voteService.thisVoteUpdateTitle(newTitle, this.voteID)
  }

  public voteUpdateDate(newDate){
    this.voteService.thisVoteUpdateDate(newDate, this.voteID)
  }


  public moveToMyHome() {
    this.navCtrl.push(AccueilPage);
  }

}
