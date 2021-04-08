import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 't2-start',
  styleUrl: 't2-start.css',
  shadow: true,
})
export class T2Start {
  render() {
    return (
      <Host>
        <slot>
          <div>
            <img></img>
            <div>
              <p id="time">45:68</p>
              <hr></hr>
              <p id="date">40.15.88</p>
              <p id="worldDay">internationaler Tag des Fülltextes</p>
              <img id="weatherIcon"></img>
              <p id="weather">80 °C</p>
            </div>
            <img id="scrollButton"></img>
          </div>
        </slot>
      </Host>
    );
  }
}
