import { Injectable } from '@angular/core';
import firebase from 'firebase';

@Injectable()
export class VotesService {

  public votePath: any;

  constructor() {
    this.votePath = firebase.database().ref('/votes');
  }

  addFriendForCurrentVote(currentVoteID, friendUID){
    /*firebase.database().ref('users/' + this.currentVoteID + '/friends').push({
      friendUID: friendUID
    });*/
  }
}