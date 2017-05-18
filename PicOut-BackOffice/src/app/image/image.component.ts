import { Component, OnInit} from '@angular/core';
import { ImagesService } from '../services/images.service';
import { FirebaseListObservable } from "angularfire2";
import { DomSanitizer, SafeStyle } from "@angular/platform-browser";

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

  onUpload() {}

  onDelete(image_title: string) {
    this.imgs.deleteStoragedImage(image_title);
    this.imgs.deleteDatabaseImage(image_title);
  }

}
