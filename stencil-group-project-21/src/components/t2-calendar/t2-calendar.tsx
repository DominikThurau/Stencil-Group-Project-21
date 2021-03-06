
import { Component, Prop, h, Watch, EventEmitter, State, Event } from '@stencil/core';
import { CalendarEntry } from '../../utils/calendar-entry';
import { Calendar } from '../../utils/calender';

@Component({
  tag: 't2-calendar',
  styleUrl: 't2-calendar.css',
  shadow: true,
})

export class MyComponent {
  //Properies definieren um später abzurufen
  @Prop() dayNames = [
    'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'
  ];
  @Prop() monthNames = [
    'Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'
  ];
  @Prop() showFillDays = true;

  //damit immer wieder entsprechend gerendert wird nach Änderung der Variablen
  @State() date = Calendar.getToday();
  @State() daysInMonth: number[];
  @State() selectedDate: CalendarEntry;
  @State() eventDates = [];

  //werden getriggert wenn sich Tag oder Monat ändern
  @Event({
    eventName: 'dayChanged',
    composed: true,
    cancelable: true,
    bubbles: true,
  }) dayChanged: EventEmitter<CalendarEntry>;
  @Event({
    eventName: 'monthChanged',
    composed: true,
    cancelable: true,
    bubbles: true,
  }) monthChanged: EventEmitter<CalendarEntry>;

  private fillStartCount: number;
  private fillEndCount: number;
  readonly today: CalendarEntry;
  loadEventField: HTMLElement;
  nameEventField: HTMLInputElement;

  constructor() {
    this.today = Calendar.getToday();
  }

  //für das Styling des ausgewählten Tages
  @Watch('date')
  watchDate(date: CalendarEntry): void {
    if ('month' in date && 'year' in date) {
      this.selectedDate = date;
    }
  }

  //Lifecycle methode: Rahmen für die Initialisierung des Kalenders
  componentWillLoad() {
    this.saveEvent = this.saveEvent.bind(this);
    this.setCalendarDetails();
  }

  //baut den Kalender
  setCalendarDetails(): void {
    const date = this.getValidDate();
    const calendar = new Calendar(date.year, date.month);
    this.daysInMonth = calendar.getCalendarDays();

    this.fillStartCount = calendar.getFillStartCount();
    this.fillEndCount = (calendar.daysInCalendar - calendar.getFillEndCount());
  }

  // sortiert die Monate entsprechend der Jahre
  getValidDate(): CalendarEntry {
    let date = this.date;
    if (!('month' in this.date && 'year' in this.date)) {
      date = this.today;
    }

    return date;
  }

  dayChangedHandler(calendarEntry: CalendarEntry): void {
    this.dayChanged.emit(calendarEntry);
  }

  daySelectedHandler = (day): void => {
    this.selectedDate = {
      day,
      month: this.date.month,
      year: this.date.year
    };
    this.dayChangedHandler(this.selectedDate);
  }

  monthChangedHandler(calendarEntry: CalendarEntry): void {
    this.monthChanged.emit(calendarEntry);
  }

  //ermöglicht das Wechseln zwischen den einzelnen Monaten (zurück bzw vor)
  switchToPreviousMonth = (): void => {
    if (this.date.month !== 1) {
      this.date.month -= 1;
    } else {
      this.date.month = 12;
      this.date.year -= 1;
    }

    if (typeof this.date !== 'undefined') {
      delete this.date.day;
    }

    this.setCalendarDetails();
    this.monthChangedHandler(this.date);
  }

  switchToNextMonth = (): void => {
    if (this.date.month !== 12) {
      this.date.month += 1;
    } else {
      this.date.month = 1;
      this.date.year += 1;
    }

    delete this.date.day;

    this.setCalendarDetails();
    this.monthChangedHandler(this.date);
  }

  //ruft entsprechende Stylings auf
  getDigitClassNames = (day: number, month: number, year: number, index: number): string => {
    let classNameDigit = [];
    if (day.toString().length === 1) {
      classNameDigit.push('padding-single-digit');
    }

    if (this.isToday(day, month, year, index)) {
      classNameDigit.push('active');
    }

    if (this.isSelectedDay(day, index)) {
      classNameDigit.push('selected');
    }

    if (this.eventDates.includes(day)) {
      classNameDigit.push('has-event');
    }

    return classNameDigit.join(' ');
  }

  // findet den aktuellen Tag & styled diesen
  isToday(day: number, month: number, year: number, index: number): boolean {
    return this.today.day === day
      && this.today.month === month
      && this.today.year === year
      && this.today.year === year
      && !(index < this.fillStartCount || index >= this.fillEndCount);
  }

  isSelectedDay(day: number, index: number) {

    return typeof this.selectedDate !== 'undefined'
      && this.selectedDate.day === day
      && this.selectedDate.month === this.date.month
      && this.selectedDate.year === this.date.year
      && !(index < this.fillStartCount || index >= this.fillEndCount);
  }

  // Funktion zur Speicherung eines Termins
  saveEvent() {

    let event = this.nameEventField.value;
    localStorage.setItem(this.selectedDate.day + "." + this.selectedDate.month + "." + this.selectedDate.year, event);
    this.nameEventField.value = "";
  }

  // Funktion die die entsprechenden eingetragenen Termine aus dem local storage läd und im Feld ausgibt
  loadEvent() {
    this.loadEventField.innerText = localStorage.getItem(this.selectedDate.day + "." + this.selectedDate.month + "." + this.selectedDate.year);
  }

  // HTML Struktur
  render() {
    const date = this.getValidDate();

    return (
      <div id="calender-wrapper">
        <h1>Kalender</h1>
      <div id="calender-background">
      <div id="calender-material">
      <div class="calendar material">
        <header>
          <span onClick={this.switchToPreviousMonth}>
            {'<'}
          </span>
          <span>{this.monthNames[date.month - 1]} {date.year}</span>
          <span onClick={this.switchToNextMonth}>
             {'>'}
          </span>
        </header>
        <div id="calender-display">
        <div class="day-names">
          {this.dayNames.map(dayName => <span>{dayName}</span>)}
        </div>
        <hr id="trennlinie-d-m"></hr>
        <div class="days-in-month">
          {this.daysInMonth.map((day, index) => {
            var classNameDigit = this.getDigitClassNames(day, date.month, date.year, index);
            if (index < this.fillStartCount || index >= this.fillEndCount) {
              return (
                <span class="disabled">{this.showFillDays ? day : ''}</span>
              );
            } else {
              let that = this;
              return (
                <span onClick={function(){
                  
                  that.daySelectedHandler(day); 
                  this.setAttribute("id","para-1");
                  that.loadEvent();


                }}>
                  <i class={classNameDigit}>
                    {day}
                  </i>
                </span>
              );
            }
          })}
        </div>
        </div>
      </div>
      </div>
      <div class= "inputKalenderWrapper">
        <input id="nameEventField" placeholder="Name des Events" ref={el => (this.nameEventField = el as HTMLInputElement)}></input>
        <button id="InputButton" onClick={this.saveEvent}>eintragen</button>
      </div>
      <div class= "scrollField" ref={el => (this.loadEventField = el as HTMLElement)}>
      </div>
      </div>
    </div>
    )};
}