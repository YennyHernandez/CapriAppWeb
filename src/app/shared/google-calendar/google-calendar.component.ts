import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { GoogleEventService } from '../../services/google-events.service';
import { Subscription } from 'rxjs';

interface ReservedSlot {
  date: Date; 
  start: Date; 
  end: Date;
}

interface TimeSlot {
  start: Date;
  end: Date;
  isReserved?: boolean;
}

@Component({
  selector: 'app-google-calendar',
  templateUrl: './google-calendar.component.html',
  styleUrls: ['./google-calendar.component.scss']
})
export class GoogleCalendarComponent implements OnInit {

  @Output() dateSelected = new EventEmitter<{ startTime: Date; endTime: Date }>();
  reservedSlots: ReservedSlot[] = [];
  days: { date: Date, timeSlots: TimeSlot[] }[] = [];
  selectedSlot: { date: Date; start: Date; end: Date } | null = null;
  private stateUpdatedSubscription!: Subscription;
  constructor(private googleEventService: GoogleEventService) { }

  ngOnInit(): void {
    this.loadReservedSlots();
    this.stateUpdatedSubscription = this.googleEventService.stateUpdated$.subscribe((updated) => {
      if (updated) {
        console.log("escuchando suscripcion")
        this.loadReservedSlots(); 
      }
    });
  }

  ngOnDestroy(): void {
    if (this.stateUpdatedSubscription) {
      this.stateUpdatedSubscription.unsubscribe();
    }
  }

  // Cargar horarios reservados desde Google Calendar
  loadReservedSlots() {
    this.googleEventService.loadGapi().then(() => {
      this.googleEventService.listGoogleEvents().then((events: any[]) => {
        this.reservedSlots = events.map(event => ({
          date: new Date(event.start.dateTime),
          start: new Date(event.start.dateTime),
          end: new Date(event.end.dateTime)
        }));
        this.days = [];
        this.initializeDays();
        console.log(this.reservedSlots, "horarios reservados");      
      });
    });
  }

  // Inicializa los días a mostrar en el calendario (15 días)
  initializeDays() {
    const today = new Date();
    today.setDate(today.getDate() + 1); // Inicia desde el día siguiente
    const newDays = [];
    for (let i = 0; i < 15; i++) {
      const nextDay = new Date(today);
      nextDay.setDate(today.getDate() + i);
      const timeSlots = this.initializeTimeSlots(nextDay); // Inicializa franjas horarias para cada día
      timeSlots.forEach(slot => {
        slot.isReserved = this.isSlotReserved(nextDay, slot.start, slot.end); //Marca solo las franjas reservadas
      });
      newDays.push({ date: nextDay, timeSlots }); 
    }
    this.days = newDays;
    console.log("days totales", this.days)
  }

  // Inicializa las franjas de horario para un día específico
  initializeTimeSlots(day: Date): TimeSlot[] {
    const baseDate = new Date(day); // Usa el día como base para las franjas
    return [
      { start: new Date(baseDate.setHours(15, 0, 0)), end: new Date(baseDate.setHours(18, 0, 0)) }, // 3:00 PM - 6:00 PM
      { start: new Date(baseDate.setHours(19, 0, 0)), end: new Date(baseDate.setHours(21, 0, 0)) }  // 7:00 PM - 9:00 PM
    ];
  }

  // Verifica si un horario específico está reservado
  isSlotReserved(date: Date, start: Date, end: Date): boolean {
    return this.reservedSlots.some(slot =>
      slot.date.toDateString() === date.toDateString() && // Comparar solo las fechas
      start < slot.end &&  
      end > slot.start   
    );
  }

  isSelectedSlot(date: Date, start: Date, end: Date): boolean {
    // Verifica si selectedSlot es nulo o indefinido y devuelve false en ese caso
    if (!this.selectedSlot) {
      return false;
    }
  
    return (
      this.selectedSlot.date.getTime() === date.getTime() &&
      this.selectedSlot.start.getTime() === start.getTime() &&
      this.selectedSlot.end.getTime() === end.getTime()
    );
  }
  // Define un horario y fecha para reservar
  reserveSlot(date: Date, start: Date, end: Date) {
    this.selectedSlot = { date, start, end };
    const startTime = new Date(date);
    startTime.setHours(start.getHours(), start.getMinutes(), 0, 0);

    const endTime = new Date(date);
    endTime.setHours(end.getHours(), end.getMinutes(), 0, 0);

    // Convertir a formato ISO para Google Calendar
    const eventDetails = {
        start: {
            dateTime: startTime.toISOString().replace('Z', '-05:00'), // Ajusta UTC-5 
            timeZone: 'America/Bogota'
        },
        end: {
            dateTime: endTime.toISOString().replace('Z', '-05:00'), // Ajusta UTC-5 
            timeZone: 'America/Bogota'
        }
    };

    this.dateSelected.emit({ startTime, endTime });
    console.log(`Evento: ${eventDetails.start.dateTime} - ${eventDetails.end.dateTime}`);
  }

  // Obtener el mes y año actuales
  getCurrentMonthYear(): string {
    const today = new Date();
    return `${today.toLocaleString('default', { month: 'long' })} ${today.getFullYear()}`;
  }
}

