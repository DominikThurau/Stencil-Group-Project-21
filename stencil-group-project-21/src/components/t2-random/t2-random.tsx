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
        <div>
          <h1>Zufallsgenerator Gruppen</h1>
          <div class="platzhalter">leer</div>
          <div class="backgroundcolor-random">
            <h2>Alle Namen:</h2>
              <div>
                <textarea class="textfeld-namen" placeholder="Laura, Linda, Dominik, Tobi, Tabea, Jonas"></textarea>
                <br></br>
                <h2>Namen werden getrennt durch:</h2>
                <div class="trennzeichen">
                  <input type="radio" name="getrennt"/>
                  <label>neue Zeile</label>
                  <input type="radio" name="getrennt"/>
                  <label>Komma</label>
                  <input type="radio" name="getrennt"/>
                  <label>Leerzeichen</label>
                </div>
                <h2>Modus:</h2>
                <div id="auswahl" class="anzahl-gruppen"><input type="radio" name="modi"/>Bilde <input type="text" maxlength="3"  class="textfeld-anzahl"/> Gruppen</div>
                <div id="auswahl" class="anzahl-personen"><input type="radio" name="modi"/>Bilde Gruppen mit je <input type="text" maxlength="3" class="textfeld-anzahl"/> Personen</div>
              </div>
              <button type="button" class="zufallsbutton">Lass den Zufall entscheiden</button>
              <div class="kreis">A</div>
              <div class="pfeil-footer">ᐱ</div>          
          </div>
        </div>
      </Host>
    );
  }
}
