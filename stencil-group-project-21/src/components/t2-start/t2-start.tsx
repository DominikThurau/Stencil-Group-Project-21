import { Component, Host, h, Listen, State, Prop } from '@stencil/core';

@Component({
  tag: 't2-start',
  styleUrl: 't2-start.css',
  shadow: true,
})
export class T2Start {
  content: WorldDay[];
  @Prop() weatherData: any;
  @State() pageYOffset = 0;

  componentWillRender() {
    return Promise.all([this.fetchWorldDays()]);
  }

  private fetchWorldDays() {
    return fetch('/assets/world-days.json')
      .then(response => response.json())
      .then((data: WorldDay[]) => (this.content = data));
  }

  componentShouldUpdate(updated, old) {
    return updated != old;
  }

  componentWillLoad() {
    this.getWeather();
  }

  getWeather() {
    const apiKey: string = '501ed5e2d77d2c5c368e797804806020';
    const cityID = 2869117;
    const apiUrl = 'http://api.openweathermap.org/data/2.5/weather?id=' + cityID + '&appid=' + apiKey + '&units=metric';

    fetch(apiUrl)
      .then(response => response.json())
      .then(data => (this.weatherData = data));
    setInterval(() => {
      const apiKey: string = '501ed5e2d77d2c5c368e797804806020';
      const cityID = 2869117;
      const apiUrl = 'http://api.openweathermap.org/data/2.5/weather?id=' + cityID + '&appid=' + apiKey + '&units=metric';

      return fetch(apiUrl)
        .then(response => response.json())
        .then(data => (this.weatherData = data));
    }, 900000);
  }

  tempInC() {
    let celsius = Number.parseFloat(this.weatherData.main.temp).toFixed(1);
    return celsius + '°C';
  }
  weatherIcon() {
    const imgUrl = 'http://openweathermap.org/img/wn/' + this.weatherData.weather[0].icon + '@2x.png';
    if (this.pageYOffset == 0 || this.pageYOffset < 20) {
      return <img src={imgUrl}></img>;
    } else {
      return <img src={imgUrl} style={{ width: '6rem', height: '6rem', verticalAlign: 'middle', marginRight: '-0.5rem' }}></img>;
    }
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
    let result = this.content.filter(welttag => welttag.day == this.day() && welttag.month == this.month());
    if (result[0]) {
      return <p id="worldDay">{result[0].title}</p>;
    } else {
      return '';
    }
  }

  changeBackground() {
    if (this.weatherData) {
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
  }

  @Listen('scroll', { target: 'window' })
  handleScroll(ev) {
    this.pageYOffset = ev.currentTarget.pageYOffset;
  }

  showEverything() {
    if (this.pageYOffset == 0 || this.pageYOffset < 20) {
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
    } else if (this.pageYOffset >= 20) {
      return (
        <div class="parentDiv" style={{ width: 'inherit', paddingLeft: '2rem', height: '10rem', top: '0', left: '0' }}>
          <div class="wrapper" style={{ width: 'inherit', paddingLeft: '2rem', position: 'fixed', top: '0', left: '0', height: '5rem', marginLeft: '8px' }}>
            <p id="date" style={{ display: 'inline-block', verticalAlign: 'middle', marginTop: '0', marginRight: '0.5rem' }}>
              {this.date()}
            </p>
            {this.displayWeather()}
          </div>
        </div>
      );
    }
  }

  displayWeather() {
    if (this.weatherData) {
      if (this.pageYOffset == 0 || this.pageYOffset < 20) {
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
        return (
          <div style={{ display: 'inline-block' }}>
            <p id="weatherIcon">{this.weatherIcon()}</p>
            <p id="temperature" style={{ display: 'inline-block', margin: '0', verticalAlign: 'middle' }}>
              {this.tempInC()}
            </p>
          </div>
        );
      }
    }
  }

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
