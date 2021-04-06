import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 't2-canvas',
  styleUrl: 't2-canvas.css',
  shadow: true,
})
export class T2Canvas {

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }

}
