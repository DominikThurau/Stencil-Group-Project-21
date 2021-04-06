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
        <slot></slot>
      </Host>
    );
  }

}
