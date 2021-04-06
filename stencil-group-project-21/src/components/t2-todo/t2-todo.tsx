import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 't2-todo',
  styleUrl: 't2-todo.css',
  shadow: true,
})
export class T2Todo {

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }

}
