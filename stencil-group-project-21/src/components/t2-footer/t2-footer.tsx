import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 't2-footer',
  styleUrl: 't2-footer.css',
  shadow: true,
})
export class T2Footer {

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }

}
