import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 't2-start',
  styleUrl: 't2-start.css',
  shadow: true,
})
export class T2Start {
  Weather(cityID) {
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

  render() {
    return (
      <Host>
        <slot>
          <div class="container">
            <div class="wrapper">
              <p id="time">{this.Time()}</p>
              <hr></hr>
              <p id="date">{this.Date()}</p>
              <p id="worldDay">internationaler Tag des Fülltextes</p>
              <img id="weatherIcon"></img>
              <p id="weather">{this.Weather}</p>
            </div>
            <div class="kreis button"></div>
          </div>
        </slot>
      </Host>
    );
  }
}

/*
let cityID: number = 2869117;

function getWeather(cityID: number): string {
  const apiKey: string = '501ed5e2d77d2c5c368e797804806020';
  fetch('api.openweathermap.org/data/2.5/weather?id=' + cityID + '&appid=' + apiKey).then(response => console.log(response));

  return 'toll';
}
*/
