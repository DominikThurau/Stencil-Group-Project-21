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
        <div class="container">
          <h1>Meine To-Do's</h1><button type="button" class="button-hinzu">+ Kategorie hinzufügen</button>
          <div class="platzhalter">leer</div>
          <div class="backgroundcolor-todo">
            <div class="box-studium">Studium</div>
            <div class="box-arbeit">Arbeit</div>
            <div class="box-privat">Privat</div>
            <div class="box-notizen">Notizen</div>
            <div class="kreis">A</div>
            <div class="pfeil-footer">ᐱ</div>
          </div>
        <slot></slot>
        </div>
      </Host>
    );
  }

}
