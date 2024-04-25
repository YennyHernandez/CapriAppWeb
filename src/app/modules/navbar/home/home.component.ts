import { Component } from '@angular/core';
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
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  tiles: Tile[] = [
    {text: 'One', cols: 2, rows: 3, imageURL: '../../../../assets/banner.jpg'},
    {text: 'Two', cols: 1, rows: 2, imageURL: '../../../../assets/banner.jpg'},
    {text: 'Three', cols: 2, rows: 2,imageURL: '../../../../assets/banner.jpg' },
    {text: 'Four', cols: 1, rows: 2,imageURL: '../../../../assets/banner.jpg' },
    {text: 'Five', cols: 1, rows: 3, imageURL: '../../../../assets/banner.jpg'},
    {text: 'Six', cols: 3, rows: 3, imageURL: '../../../../assets/banner.jpg'},
    {text: 'Seven', cols: 2, rows: 2,imageURL: '../../../../assets/banner.jpg' },
    
  ];
}
