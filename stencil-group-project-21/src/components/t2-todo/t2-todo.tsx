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
          <h1>Meine To-Do's</h1>
          <div class="platzhalter">leer</div>
          <div class="backgroundcolor-todo">
            <div id="kategorie" class="box-studium">Studium</div>
            <div id="kategorie" class="box-arbeit">Arbeit</div>
            <div id="kategorie" class="box-privat">Privat</div>
            <div id="kategorie" class="box-notizen">Notizen</div>
            <textarea class="hinzufuegen" ></textarea>
            <div class="kategorien-auswahl">
                  <input type="radio" name="studium"/>
                  <label>Studium</label>
                  <input type="radio" name="arbeit"/>
                  <label>Arbeit</label>
                  <input type="radio" name="privat"/>
                  <label>Privat</label>
                  <input type="radio" name="notizen"/>
                  <label>Notizen</label>
                </div>
            <div class="kreis">A</div>
            <div class="pfeil-footer">ᐱ</div>
          </div>
        <slot></slot>
        </div>
      </Host>
    );
  }

}
