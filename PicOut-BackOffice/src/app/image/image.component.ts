import { Component, OnInit} from '@angular/core';
import { ImagesService } from '../services/images.service';
import { FirebaseListObservable } from "angularfire2";
import { DomSanitizer, SafeStyle } from "@angular/platform-browser";
import { default as swal } from 'sweetalert2';

export class Image {
  constructor(
    public URL: string,
    public name: string,
    public owner: string
  ) {}
}

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css']
})
export class ImageComponent implements OnInit {
  images: FirebaseListObservable<any[]>;

  constructor(public imgs: ImagesService,
              private _sanitize: DomSanitizer) {
    this.images = imgs.images;
  }

  ngOnInit() {
  }

  sanitizeUrlImage(url): SafeStyle {
    return this._sanitize.bypassSecurityTrustStyle(`url(${url})`)
  }

  onUpload() {
    var files_input = (<HTMLInputElement>document.getElementById('image_uploader')).files;
    if(files_input.length > 0) {
      this.imgs.uploadImages(files_input);
    } else {
      swal({
        title: 'Erreur d\'envoi',
        text: 'Aucune photo n\'as été sélectionnées',
        type: 'error'
      });
    }

  }

  onDelete(image_title: string) {
    this.imgs.deleteStoragedImage(image_title);
    this.imgs.deleteDatabaseImage(image_title);
  }

}
