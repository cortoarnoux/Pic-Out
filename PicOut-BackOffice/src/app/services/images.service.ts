import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import * as firebase from 'firebase';
//import { Image } from '../models/image';

export class Image {
  id: string;
  title: string;
  url: string;

  constructor(id: string, title: string, url: string) {
    this.id = id;
    this.title = title;
    this.url = url;
  }
}

@Injectable()
export class ImagesService {
  private storageRef = firebase.storage().ref();
  imagesAF: FirebaseListObservable<any[]>;

  // FOR SNAPSHOT
  images: FirebaseListObservable<any[]>;
  imageList: Image[];

  constructor(public _af: AngularFire) {
    this.imagesAF = _af.database.list('/assets');
    this.images = _af.database.list('/assets', { preserveSnapshot: true });
    this.imageList = [];
  }

  readImages() {
    this.images
      .subscribe(snapshot => {
        snapshot.forEach(snapshot => {
          let img = new Image(snapshot.key, snapshot.val().name, snapshot.val().URL);
          this.imageList.push(img);
        });
      })
  }

  uploadImages() { }

  deleteImages(image_title: string): boolean {
    console.log(image_title);

    let imgToDelete = this.storageRef.child(`images/${image_title}`);
    imgToDelete.delete()
      .then(_ => {
        return true;
      })
      .catch(error => {
        console.log(error);
        return false;
      });

    return false;
  }

}
