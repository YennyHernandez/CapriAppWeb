import { Component } from '@angular/core';
import { FirebaseStorageService } from 'src/app/services/firebase-storage.service';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent {
  constructor( public firebaseStorageService: FirebaseStorageService ){
    
  }
  
}
