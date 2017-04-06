import { Injectable } from '@angular/core';
import firebase from 'firebase';

@Injectable()
export class CurrentUserService {

  public userProfile: firebase.database.Reference;
  public currentUser: firebase.User;

  constructor() {
  	// Corto : Récupération de l'UID utilisateur courant
    this.currentUser = firebase.auth().currentUser;
    this.userProfile = firebase.database().ref('/users');
  }

  getCurrentUser(id): firebase.database.Reference {
    return firebase.database().ref(`/users/${id}`);
  }

  // Corto : Fonction qui permet d'ajouter des infos à l'utilisateur dans notre bdd
  setCurrentUser(userId, email, userFriends) {
    firebase.database().ref('users/' + this.currentUser.uid).set({
      email: email,
      friends: userFriends
    });
  }
}