import { Component, OnInit, Input } from '@angular/core';
import { GoogleEventService } from 'src/app/services/google-events.service';
@Component({
  selector: 'app-google-calendar',
  templateUrl: './google-calendar.component.html',
  styleUrls: ['./google-calendar.component.scss']
})
export class GoogleCalendarComponent implements OnInit {
  //@Input() formControlName!: string;  // formControl desde el componente padre
  reservedDates: Date[] = [];
  selectedDate: Date | null = null;

  constructor(private googleEventService: GoogleEventService) { }

  ngOnInit(): void {
    this.loadReservedDates();

  }

  loadReservedDates() {   
      this.googleEventService.loadGapi().then(() => {
        console.log("entrando al loadreserves")
        this.googleEventService.listGoogleEvents().then((events: any[]) => {
          console.log("haciendo peticion a listar")
          this.reservedDates = events.map(event => new Date(event.start.dateTime));
          console.log(this.reservedDates, " fechas reservadass")
        });
      })

  }

  disableReservedDates = (date: Date | null): boolean => {
    if (!date) return true;
    return !this.reservedDates.some(d => d.getTime() === date.getTime());
  }
  onDateChange(event: any): void {
    const selected = new Date(event.target.value);
    if (this.disableReservedDates(selected)) {
      console.warn("Esta fecha está reservada");
    } else {
      this.selectedDate = selected;
      console.log("Fecha seleccionada:", this.selectedDate);
    }
  }
}

