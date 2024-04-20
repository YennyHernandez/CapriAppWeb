import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
  @Input() namePaquete: string = "paquete";
  @Input() rutaImagePaquete: string = "paquete";
  @Input() descriptionPaquete: string = "description";
  @Input() pricePaquete: number = 300.000;
}
