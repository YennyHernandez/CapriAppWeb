
import { Component, ViewChild} from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatAccordion } from '@angular/material/expansion';


@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],

})
export class ModalComponent {
  constructor(public dialogRef: MatDialogRef<ModalComponent>) {}
  @ViewChild(MatAccordion) accordion!: MatAccordion;
  close(): void {
    this.dialogRef.close();
  }
}
