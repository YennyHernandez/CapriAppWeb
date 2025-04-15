import { Component, Input, Output, EventEmitter } from '@angular/core';
import { textSolicitado, textConfirmado, textActualizado} from 'src/app/constants/paquetes'

@Component({
  selector: 'app-card-booking',
  templateUrl: './card-booking.component.html',
  styleUrls: ['./card-booking.component.scss']
})
export class CardBookingComponent {
  @Input() booking: any;  
  @Output() confirm = new EventEmitter<any>();
  @Output() delete = new EventEmitter<any>();
  textSolicitado = textSolicitado;
  textConfirmado = textConfirmado;
  textActualizado = textActualizado;
  isEditing = false;
  selectedState = "";
  
  ngOnInit() {
    this.selectedState = this.booking?.stateBooking;
  }
  get description(): string {
    const trueProperties = Object.keys(this.booking).filter(key => typeof this.booking[key] === 'boolean' && this.booking[key]);
 
    return trueProperties.length > 0 ? trueProperties.join(', ') : 'Ninguna característica especial';
  }
  sendConfirm(booking: any){
    this.confirm.emit(this.booking)
  }

  sendDelete(booking: any){
    console.log("emitiendo");
    this.delete.emit(this.booking)
   
  }
  changeToEdit(){
    this.isEditing = true;
  }

  updateBooking(){

  }
  closeEdit(){
    this.isEditing = false;
  }
}
