import { Injectable } from '@angular/core';
import firebase from 'firebase';

@Injectable()
export class VotesService {

  public votePath: any;
  public votes: any;
  public voteMasterID: any;
  public currentID = firebase.auth().currentUser.uid;


  constructor() {
    this.votePath = firebase.database().ref('/votes');
  }

  getUserList(): firebase.database.Reference {
    return this.votes;
  }

  getVoteListCreated(): firebase.database.Reference {
    return firebase.database().ref(`users/${this.currentID}/voteMasterList`);
  }

  getVoteListInvited(): firebase.database.Reference {
    return firebase.database().ref(`users/${this.currentID}/votesinvitedat`);
  }

  getVoteData(id): firebase.database.Reference {
    return firebase.database().ref(`votes/${id}`);
  }

  getCurrentUserMasterVotes(): firebase.database.Reference {
    return firebase.database().ref(`votes/${this.currentID}`);
  }

  pushThisVoteAsMaster(voteID) {
    firebase.database().ref(`users/${this.currentID}/voteMasterList/${voteID}`).set({
      verifUser: this.currentID
    });
  }

  addvoteForCurrentFriend(friendUID, voteID){
    firebase.database().ref('users/' + friendUID + '/votesinvitedat').push({
      voteID: voteID
    });
  }

  userHasChoosenThisResponse(url, voteID) {
    firebase.database().ref(`users/${this.currentID}/votesinvitedat/${voteID}`).set({
      responseChoosen: url,
      voteID: voteID
    });
  }

  getClickedVoteInvitedAt(voteID): firebase.database.Reference {
    return firebase.database().ref(`users/${this.currentID}/votesinvitedat/${voteID}`);
  }

  addScoreToChoosenIndex(voteID, index, score) {
    firebase.database().ref(`votes/${voteID}/voteScore/${index}`).set(score);
  }

  getScoreOfChoosenIndex(voteID, index) {
    return firebase.database().ref(`votes/${voteID}/voteScore/${index}`);
  }

// modification du titre du vote
  thisVoteUpdateTitle(newTitle, voteID){
    firebase.database().ref('votes/' + voteID).update({
      title: newTitle
    });
  }

//modification de la date du vote
  thisVoteUpdateDate(newDate, voteID){
    firebase.database().ref('votes/' + voteID).update({
      expiration_date: newDate
    });
  }

//terminer vote
  shutDownVote(voteID){
    firebase.database().ref('votes/' + voteID).update({
      state: "closed"
    });
  }


//suppression du vote
deleteThisVote(voteID) {
  let stampCreatedData = [];

  firebase.database().ref('users').on('value', (data) => {
    stampCreatedData.push(data.val());
  });
  console.log(stampCreatedData);
  for(let key in stampCreatedData[0]) {
    console.log(key);
    firebase.database().ref(`users/${key}/voteMasterList/${voteID}`).remove();
    firebase.database().ref(`users/${key}/votesinvitedat/${voteID}`).remove();
  }
  // suppression
  firebase.database().ref(`votes/${voteID}`).remove();
  // firebase.database().ref('users').child(`voteMasterList/${voteID}`).remove();
  // firebase.database().ref('users').child(`votesinvitedat/${voteID}`).remove();
  }
}
