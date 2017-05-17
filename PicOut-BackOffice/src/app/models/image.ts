import { DomSanitizer } from '@angular/platform-browser';
import {sanitizeUrl} from "@angular/platform-browser/src/security/url_sanitizer";

export class Image {
  private sanitizer: DomSanitizer;

  id: string;
  title: string;
  url: string;
  urlStyleSheet: any;

  constructor(id: string, title: string, url: string) {
    this.id = id;
    this.title = title;
    this.url = title;
    this.urlStyleSheet = this.sanitizer.bypassSecurityTrustStyle(`url(${url})`);
  }

}
