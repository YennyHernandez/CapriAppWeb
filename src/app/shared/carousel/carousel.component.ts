import { Component } from '@angular/core';
import { CarouselAlignMode, CarouselConfig, CarouselWidthMode } from 'ng-carousel-cdk';

interface CarouselItem {
  image: string;
}

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})

export class CarouselComponent {
   
  config: CarouselConfig<CarouselItem> = {
    items: [
        {image: "../../../assets/cabra3.png"},
        {image: "../../../assets/goat.png"},
        {image: "../../../assets/goat2.png"},
    ],
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
