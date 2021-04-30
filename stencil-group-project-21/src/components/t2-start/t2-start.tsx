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
      return <img src={imgUrl} style={{ width: '6rem', height: '6rem', verticalAlign: 'middle', margin: '-0.5rem' }}></img>;
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
        if (this.pageYOffset == 0 || this.pageYOffset < 20) {
          //Original-Bild von https://pixabay.com/de/photos/blitz-gewitter-superzelle-wetter-2568381/
          return <img src="assets/img/thunderstorm.jpg" id="weatherBackground"></img>;
        } else {
          return <img src="assets/img/thunderstorm.jpg" id="weatherBackground" style={{ display: 'none' }}></img>;
        }
      } else if (this.weatherData.weather[0].main == drizzle || this.weatherData.weather[0].main == rain) {
        if (this.pageYOffset == 0 || this.pageYOffset < 20) {
          //Original-Bild von https://www.freepik.com/free-vector/condensation-water-drops-black-window-background-rain-droplets-with-light-reflection-dark-glass-surface-realistic-3d-vector-illustration_11420883.htm#page=1&query=raindrops&position=0
          return <img src="assets/img/raindrops.jpg" id="weatherBackground"></img>;
        } else {
          return <img src="assets/img/raindrops.jpg" id="weatherBackground" style={{ height: '112px', animationName: 'dontShowBackground', animationDuration: '1.2s' }}></img>;
        }
      } else if (this.weatherData.weather[0].main == snow) {
        if (this.pageYOffset == 0 || this.pageYOffset < 20) {
          //Original-Bild von https://pixabay.com/de/photos/schneefall-winter-schnee-201496/
          return <img src="assets/img/snow.jpg" id="weatherBackground"></img>;
        } else {
          return <img src="assets/img/snow.jpg" id="weatherBackground" style={{ height: '112px', animationName: 'dontShowBackground', animationDuration: '1.2s' }}></img>;
        }
      } else if (this.weatherData.weather[0].main == clouds) {
        if (this.pageYOffset == 0 || this.pageYOffset < 20) {
          //Original-Bild von https://pixabay.com/de/photos/wolken-himmel-hell-tageslicht-1282314/
          return <img src="assets/img/clouds.jpg" id="weatherBackground"></img>;
        } else {
          return <img src="assets/img/clouds.jpg" id="weatherBackground" style={{ height: '112px', animationName: 'dontShowBackground', animationDuration: '1.2s' }}></img>;
        }
      } else if (this.weatherData.weather[0].main == clear) {
        if (this.pageYOffset == 0 || this.pageYOffset < 20) {
          //selbsterstellt
          return <img src="assets/img/clear.jpg" id="weatherBackground"></img>;
        } else {
          return <img src="assets/img/clear.jpg" id="weatherBackground" style={{ height: '112px', animationName: 'dontShowBackground', animationDuration: '1.2s' }}></img>;
        }
      } else {
        if (this.pageYOffset == 0 || this.pageYOffset < 20) {
          //Original-Bild von https://pixabay.com/de/photos/strand-trocken-kruste-wild-wellen-768587/
          return <img src="assets/img/wind.jpg" id="weatherBackground"></img>;
        } else {
          return <img src="assets/img/wind.jpg" id="weatherBackground" style={{ height: '112px', animationName: 'dontShowBackground', animationDuration: '1.2s' }}></img>;
        }
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
            <p>scroll</p>
          </div>
        </div>
      );
    } else if (this.pageYOffset >= 20) {
      return (
        <div class="parentDiv" style={{ height: '112px', top: '0', left: '0', paddingBottom: '19px', animationName: 'changeParentDiv', animationDuration: '1.2s' }}>
          {this.changeBackground()}
          <div
            class="wrapper"
            style={{
              width: 'inherit',
              padding: '0 0 2rem 0',
              position: 'fixed',
              top: '0',
              left: '0',
              height: '80px',
              margin: '0 0 0 8px',
              borderRadius: '0 0 1rem 1rem',
              animationName: 'changeWrapper',
              animationDuration: '1.5s',
            }}
          >
            <div style={{ margin: '1rem', width: '343px' }}>
              <p
                id="date"
                style={{
                  display: 'inline-block',
                  verticalAlign: 'middle',
                  marginTop: '0',
                  marginRight: '0.5rem',
                }}
              >
                {this.date()}
              </p>
              {this.displayWeather()}
            </div>
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
          <div style={{ display: 'inline-block', margin: '0 auto' }}>
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
