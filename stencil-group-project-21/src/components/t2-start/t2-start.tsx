import { Component, Host, h, Listen, State } from '@stencil/core';

@Component({
  tag: 't2-start',
  styleUrl: 't2-start.css',
  shadow: true,
})
export class T2Start {
  content: WorldDay[];
  weatherData: any;
  @State() pageYOffset = 0;

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
      return <p id="worldDay">{result[0].title}</p>;
    } else {
      return '';
    }
  }

  changeBackground() {
    this.weatherData.weather[0].icon;
    const thunderstorm = 'Thunderstorm';
    const drizzle = 'Drizzle';
    const rain = 'Rain';
    const snow = 'Snow';
    const clear = 'Clear';
    const clouds = 'Clouds';
    if (this.weatherData.weather[0].main == thunderstorm) {
      return <img src="assets/img/thunderstorm.jpg" id="weatherBackground"></img>;
    } else if (this.weatherData.weather[0].main == drizzle || this.weatherData.weather[0].main == rain) {
      return <img src="assets/img/raindrops.jpg" id="weatherBackground"></img>;
    } else if (this.weatherData.weather[0].main == snow) {
      return <img src="assets/img/snow.jpg" id="weatherBackground"></img>;
    } else if (this.weatherData.weather[0].main == clouds) {
      return <img src="assets/img/clouds.jpg" id="weatherBackground"></img>;
    } else if (this.weatherData.weather[0].main == clear) {
      return <img src="assets/img/clear.jpg" id="weatherBackground"></img>;
    } else {
      return <img src="assets/img/wind.jpg" id="weatherBackground"></img>;
    }
  }

  @Listen('scroll', { target: 'window' })
  handleScroll(ev) {
    console.log('the body was scrolled', ev);
    this.pageYOffset = ev.currentTarget.pageYOffset;
  }

  showEverything() {
    if (this.pageYOffset == 0) {
      return (
        <div class="parentDiv">
          {this.changeBackground()}
          <div class="container">
            <div class="wrapper">
              <p id="time">{this.time()}</p>
              <hr id="seperator"></hr>
              <p id="date">{this.date()}</p>
              {this.worldDay()}
              {this.displayWeather()}
            </div>
          </div>
          <div class="scrollKreis">
            <div class="dreieck"></div>
          </div>
        </div>
      );
    } else if (this.pageYOffset > 0) {
      return (
        <div class="wrapper" style={{ width: 'inherit', paddingLeft: '2rem' }}>
          <p id="date" style={{ display: 'inline-block', verticalAlign: 'middle', marginTop: '0', marginRight: '1.5rem' }}>
            {this.date()}
          </p>
          <p id="weatherIcon" style={{ display: 'inline-block', verticalAlign: 'middle' }}>
            {this.weatherIcon()}
          </p>
        </div>
      );
    }
  }

  displayWeather() {
    if (this.pageYOffset < 200) {
      return (
        <div id="weatherInfo">
          <p id="weatherIcon">{this.weatherIcon()}</p>
          <div id="weatherText">
            <p id="location">Mosbach:</p>
            <p id="temperature">{this.tempInC()}</p>
          </div>
        </div>
      );
    } else {
      return <p id="weatherIcon">{this.weatherIcon()}</p>;
    }
  }

  /*
  shrinkArea() {
    this.element.getElementsByTagName('time').
    this.element.getElementById('time').style.display = 'none';
    this.element.getElementById('weatherText').style.display = 'none';
    this.element.getElementById('seperator').style.display = 'none';
  }*/

  render() {
    return (
      <Host>
        <slot>{this.showEverything()}</slot>
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
