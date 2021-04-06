import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 't2-random',
  styleUrl: 't2-random.css',
  shadow: true,
})
export class T2Random {

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }

}
