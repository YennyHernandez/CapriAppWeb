import { Component, OnInit } from '@angular/core';
import { GoogleEventService } from 'src/app/services/google-events.service';

@Component({
  selector: 'app-google-calendar',
  templateUrl: './google-calendar.component.html',
  styleUrls: ['./google-calendar.component.scss']
})
export class GoogleCalendarComponent implements OnInit {
  reservedDates: Date[] = [];
  selectedDate: Date | null = null;

  constructor(private googleEventService: GoogleEventService) {}

  ngOnInit(): void {
    this.loadReservedDates();
  }

  loadReservedDates() {   
    this.googleEventService.loadGapi().then(() => {
      this.googleEventService.listGoogleEvents().then((events: any[]) => {
        this.reservedDates = events.map(event => new Date(event.start.dateTime));
        console.log(this.reservedDates, " fechas reservadas");
      });
    });
  }

  disableReservedDates = (date: Date | null): boolean => {
    if (!date) return true; // Si no hay fecha seleccionada, permite seleccionar
    // Verifica si la fecha está en la lista de fechas reservadas
    console.log(date, '🌱🌱🌱')
    return this.reservedDates.some(d => 
      d.getFullYear() === date.getFullYear() && 
      d.getMonth() === date.getMonth() && 
      d.getDate() === date.getDate()
    )? false: true ;
  }

  onDateChange(event: any): void {
    const selected = new Date(event.value);
    if (this.disableReservedDates(selected)) {
      console.warn("Esta fecha está reservada");
      this.selectedDate = null; // O cualquier lógica que necesites para manejar fechas reservadas
    } else {
      this.selectedDate = selected;
      console.log("Fecha seleccionada:", this.selectedDate);
    }
  }
}
