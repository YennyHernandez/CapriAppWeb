import { Component, OnInit } from '@angular/core';
import { Console } from 'console';
import { FirebaseStorageService } from 'src/app/services/firebase-storage.service';
import { GoogleEventService } from 'src/app/services/google-events.service';

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
    this.reservasSolitadas = this.allReservas.filter(reserva => reserva.stateBooking === 'Solicitado');
    this.reservasConfirmadas = this.allReservas.filter(reserva => reserva.stateBooking === 'Confirmado');
  }

  selectTab(tab: string) {
    this.activeTab = tab; 
  }
  reservarToCalendar(booking: any){
    alert("¿Estas seguro de reservar en el calendario?")
    this.googleEventService.createGoogleEvent(booking);
    
  }
}
