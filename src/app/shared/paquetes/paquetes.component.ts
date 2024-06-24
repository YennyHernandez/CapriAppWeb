import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-paquetes',
  templateUrl: './paquetes.component.html',
  styleUrls: ['./paquetes.component.scss']
})
export class PaquetesComponent {
  @Input() name_package: string = "nombre paquete"
  @Input() description_package: string = "descripción"
  @Input() price_package: number = 0
  constructor(public dialog: MatDialog) {}


  openModal(): void {
    this.dialog.open(ModalComponent);
  }
}
