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
        <slot></slot>
      </Host>
    );
  }

}
