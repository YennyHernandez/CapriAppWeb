import { Component, Input } from '@angular/core';
import { CarouselAlignMode, CarouselConfig, CarouselWidthMode } from 'ng-carousel-cdk';
import { Subscription } from 'rxjs';
import { FirebaseStorageService } from 'src/app/services/firebase-storage.service';


@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})

export class CarouselComponent {
  @Input() idPackage = "";
  observerStoragePaquetes!: Subscription;
  config!: CarouselConfig<string>;
  imageUrls: string[] = [];
  constructor(private firebaseStorageService: FirebaseStorageService) { }
  ngOnInit(): void {
    this.observerStoragePaquetes = this.firebaseStorageService.storagePaquetesSubject.subscribe((data) => {
      const packageCreated = data.filter(item => this.idPackage === item.id);
      this.imageUrls = packageCreated[0].urlsCarousel;
      this.configureCarousel();
    })
  }
  ngOnDestroy(): void {
    if (this.observerStoragePaquetes) {
      this.observerStoragePaquetes.unsubscribe();
    }
  }
  configureCarousel(): void {
    this.config = {
      items: this.imageUrls,
      widthMode: CarouselWidthMode.PX,
      alignMode: CarouselAlignMode.CENTER,
      autoplayEnabled: true,
      autoplayDelay: 6000,
      dragEnabled: true,
      slideWidth: 630,
      transitionDuration: 280,
      shouldRecalculateOnResize: true,
      allowKeyboardNavigation: true,
      shouldLoop: true,
    };
  }
}
