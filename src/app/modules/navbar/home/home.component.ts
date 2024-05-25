import { Component} from '@angular/core';
import { FirebaseStorageService } from 'src/app/services/firebase-storage.service';

export interface Tile {
  color?: string;
  imageURL? : string;
  cols: number;
  rows: number;
  text: string;
}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  
})
export class HomeComponent{
  constructor(public firebaseStorageService: FirebaseStorageService) {
    this.auxiliar();
    
  } 
  selectedValue: string = "selecciona";
  tiles: Tile[] = [
    {text: 'One', cols: 2, rows: 3, imageURL: '../../../../assets/banner.jpg', color: "lightpink"},
    {text: 'Two', cols: 1, rows: 2, imageURL: '../../../../assets/banner.jpg',  color: "lightpink"},
    {text: 'Three', cols: 2, rows: 2,imageURL: '../../../../assets/banner.jpg' ,  color: "lightpink"},
    {text: 'Four', cols: 1, rows: 2,imageURL: '../../../../assets/banner.jpg' ,  color: "lightpink"},
    {text: 'Five', cols: 1, rows: 3, imageURL: '../../../../assets/banner.jpg',  color: "lightpink"},
    {text: 'Six', cols: 3, rows: 3, imageURL: '../../../../assets/banner.jpg',  color: "lightpink"},
    {text: 'Seven', cols: 2, rows: 2,imageURL: '../../../../assets/banner.jpg' ,  color: "lightpink"},
    
  ];

  async auxiliar(): Promise<void> {
    await this.firebaseStorageService.initStorageUrls();
  }
  
}
