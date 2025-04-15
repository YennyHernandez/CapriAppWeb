import { Component, OnInit, } from '@angular/core';
import { FirebaseStorageService } from 'src/app/services/firebase-storage.service';
import { GoogleEventService } from 'src/app/services/google-events.service';
import { textSolicitado, textConfirmado, textActualizado} from 'src/app/constants/paquetes'


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  reservasSolitadas: any[] = [];
  reservasConfirmadas: any[] = []; 
  allReservas: any[] = []; 
  activeTab: string = 'solicitadas';
  textSolicitado = textSolicitado;
  textConfirmado = textConfirmado;
  textActualizado = textActualizado;
 
  constructor(private firebaseStorageService: FirebaseStorageService, private googleEventService : GoogleEventService) {}
 
  ngOnInit() {
    this.loadReservas(); 
  }

  loadReservas() {
    this.firebaseStorageService.getReservas().then(reservas => {
      this.allReservas = reservas;
      this.filterReservas(); 
      console.log(this.allReservas,"🌱")
    });
  }

  filterReservas() {
    this.reservasSolitadas = this.allReservas.filter(reserva => reserva.stateBooking === this.textSolicitado);
    this.reservasConfirmadas = this.allReservas.filter(reserva => reserva.stateBooking === (this.textConfirmado || this.textActualizado));
  }

  selectTab(tab: string) {
    this.activeTab = tab; 
  }
  reservarToCalendar(booking: any){
    alert("¿Estas seguro de reservar en el calendario?")
    this.googleEventService.createGoogleEvent(booking);
    this.firebaseStorageService.updateStateBooking(booking.id,this.textConfirmado)
    this.loadReservas();  
  }
  
  deleteBookingFB(booking:any){
    alert("¿Estas seguro que deseas eliminar la reserva en base de datos")
    this.firebaseStorageService.deleteReserva(booking.id);
    this.loadReservas();
  }
  deleteBookingDB(booking:any){
    alert("¿Estas seguro que deseas eliminar la reserva en google calendar")
    this.googleEventService.deleteGoogleEventByDate(booking.appointmentDate);
    this.deleteBookingFB(booking);
  }
}
