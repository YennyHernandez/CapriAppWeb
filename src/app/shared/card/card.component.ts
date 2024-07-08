import { Component, Input } from '@angular/core';
import {  PackageUrl } from 'src/app/interfaces/media-storage.interface';
import { Router, ActivatedRoute } from '@angular/router';

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
    pricePersonExtra: 0,
    menu:[],
    mediaType: "",
    urlDescarga:"",
    itemsUrlDescarga: [],
    url: "",
    urlsCarousel:[],
  };
  constructor(private router: Router, private route: ActivatedRoute){}
  irASeccion(id: string) {
    this.router.navigate(["/booking"], { fragment: id });
    console.log("enviando a seccion", id)
  }
}
