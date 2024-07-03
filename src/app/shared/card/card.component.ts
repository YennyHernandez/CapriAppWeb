import { Component, Input } from '@angular/core';
import {  PackageUrl } from 'src/app/interfaces/media-storage.interface';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  @Input() packageCard :PackageUrl = {
    id: "",
    namePackage:"", 
    slogan: "",
    description:"",
    price: 0,
    menu:[],
    mediaType: "",
    urlDescarga:"",
    itemsUrlDescarga: [],
    url: "",
    urlsCarousel:[],
  };
}
