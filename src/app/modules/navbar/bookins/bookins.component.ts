import { Component } from '@angular/core';
import {typePackages} from "../../../constants/paquetes";

@Component({
  selector: 'app-bookins',
  templateUrl: './bookins.component.html',
  styleUrls: ['./bookins.component.scss']
})

export class BookinsComponent {
  constructor(){}
  typePackages = typePackages;
}
