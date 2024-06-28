import { Component } from '@angular/core';
import { CarouselAlignMode, CarouselConfig, CarouselWidthMode } from 'ng-carousel-cdk';


@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})

export class CarouselComponent {
  imageUrls: string[] = [
    "../../../assets/cabra3.png",
    "../../../assets/goat.png",
    "../../../assets/goat2.png"
  ];
  config: CarouselConfig = {
    items: this.imageUrls,
    widthMode: CarouselWidthMode.PX,
    alignMode: CarouselAlignMode.CENTER,
    autoplayEnabled: true,
    autoplayDelay: 6000,
    dragEnabled: true,
    slideWidth: 633,
    transitionDuration: 280,
    shouldRecalculateOnResize: true,
    allowKeyboardNavigation: true,
    shouldLoop: true,   
  }



}
