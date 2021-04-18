import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 't2-start',
  styleUrl: 't2-start.css',
  shadow: true,
})
export class T2Start {
  content: WorldDay[];
  weatherData: any;

  componentWillRender() {
    return Promise.all([this.fetchWorldDays(), this.getWeather()]);
  }

  private fetchWorldDays() {
    return fetch('/assets/world-days.json')
      .then(response => response.json())
      .then((data: WorldDay[]) => (this.content = data));
  }

  /*
  Abrufen der API-Daten orientiert an URL: https://www.youtube.com/watch?v=uxf0--uiX0I&t=692s
  */
  getWeather() {
    const apiKey: string = '501ed5e2d77d2c5c368e797804806020';
    const cityID = 2869117;
    const apiUrl = 'http://api.openweathermap.org/data/2.5/weather?id=' + cityID + '&appid=' + apiKey + '&units=metric';

    return fetch(apiUrl)
      .then(response => response.json())
      .then(data => (this.weatherData = data));

    /*const response = await fetch(apiUrl);
    const data = await response.json();
    const { name, weather, main } = data;
    console.log(name);
    
    console.log(main.temp);*/
  }

  tempInC() {
    let celsius = Number.parseFloat(this.weatherData.main.temp).toFixed(1);
    return celsius + '°';
  }
  weatherIcon() {
    const imgUrl = 'http://openweathermap.org/img/wn/' + this.weatherData.weather[0].icon + '@2x.png';
    return <img src={imgUrl}></img>;
  }

  /*
  Zeit orientiert an URL: https://gist.github.com/Konstantinos-infogeek/8f89e07139bc3dacea371e3cf2bc556c
  */
  time() {
    let date = new Date();
    return [date.getHours(), date.getMinutes()].map(current => (current >= 10 ? current : '0' + current)).join(':');
  }

  /*
  Datum orientiert an URL: https://stackoverflow.com/questions/1531093/how-do-i-get-the-current-date-in-javascript
  */
  date() {
    var options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };

    let today = new Date().toLocaleDateString('de-DE', options);
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
    //console.log(this.day() + '; ' + this.month() + '; ' + JSON.stringify(this.content));
    let result = this.content.filter(welttag => welttag.day == this.day() && welttag.month == this.month());
    if (result[0]) {
      return <p>{result[0].title}</p>;
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
              <p id="time">{this.time()}</p>
              <hr></hr>
              <p id="date">{this.date()}</p>
              {this.worldDay()}
              <img id="weatherIcon"></img>
              <p id="weather">
                {this.weatherIcon()}
                {this.tempInC()}
              </p>
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
class Weather {
  weather: [any];
  main: object;
  name: string;
}
*/
