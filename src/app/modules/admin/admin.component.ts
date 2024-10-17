import { Component, OnInit } from '@angular/core';
import { Console } from 'console';
import { FirebaseStorageService } from 'src/app/services/firebase-storage.service';

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

  constructor(private firebaseStorage: FirebaseStorageService, public firebaseStorageService : FirebaseStorageService) {}

  ngOnInit() {
    this.loadReservas();
  }

  loadReservas() {
    this.firebaseStorage.getReservas().then(reservas => {
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
}
