import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 't2-start',
  styleUrl: 't2-start.css',
  shadow: true,
})
export class T2Start {
  content: WorldDay[];

  componentWillRender() {
    return fetch('/assets/world-days.json')
      .then(response => response.json())
      .then((data: WorldDay[]) => (this.content = data));
  }

  async getWeather() {
    const apiKey: string = '501ed5e2d77d2c5c368e797804806020';
    const cityID = 2869117;
    const apiUrl = 'api.openweathermap.org/data/2.5/weather?id=' + cityID + '&appid=' + apiKey;
  }

  weather(cityID) {
    const apiKey: string = '501ed5e2d77d2c5c368e797804806020';
    fetch('api.openweathermap.org/data/2.5/weather?id=' + cityID + '&appid=' + apiKey);
  }

  /*
  Zeit orientiert an URL: https://gist.github.com/Konstantinos-infogeek/8f89e07139bc3dacea371e3cf2bc556c
  */
  Time() {
    let date = new Date();
    return [date.getHours(), date.getMinutes()].map(current => (current >= 10 ? current : '0' + current)).join(':');
  }

  /*
  Datum orientiert an URL: https://stackoverflow.com/questions/1531093/how-do-i-get-the-current-date-in-javascript
  */
  Date() {
    let today = new Date().toLocaleDateString();
    return today;
  }

  day(): number {
    let day = new Date();
    return day.getDate();
  }

  month() {
    let month = new Date();
    return month.getMonth() + 1;
  }

  worldDay() {
    console.log(this.day() + '; ' + this.month() + '; ' + JSON.stringify(this.content));
    let result = this.content.filter(welttag => welttag.day == this.day() && welttag.month == this.month());
    if (result[0]) {
      return result[0].title;
    } else {
      return '';
    }
  }

  render() {
    return (
      <Host>
        <slot>
          <div class="container">
            <div class="wrapper">
              <p id="time">{this.Time()}</p>
              <hr></hr>
              <p id="date">{this.Date()}</p>
              <p id="worldDay">{this.worldDay()}</p>
              <img id="weatherIcon"></img>
              <p id="weather">{this.weather(2869117)}</p>
            </div>
            <div class="kreis button"></div>
          </div>
        </slot>
      </Host>
    );
  }
}
class WorldDay {
  day: number;
  month: number;
  title: string;
}

/*
let cityID: number = 2869117;

function getWeather(cityID: number): string {
  const apiKey: string = '501ed5e2d77d2c5c368e797804806020';
  fetch('api.openweathermap.org/data/2.5/weather?id=' + cityID + '&appid=' + apiKey).then(response => console.log(response));

  return 'toll';
}
*/
