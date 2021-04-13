import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 't2-calendar',
  styleUrl: 't2-calendar.css',
  shadow: true,
})



export class T2Calendar {

  render() {
    return (
      <Host>

        <h1>Kalender</h1>
        <div id="calender-wrapper">
         <div id="calender-background">
           <div id="calender-display"></div>
         </div>
        </div>
        <slot></slot>

      </Host>
    );
  }

}

