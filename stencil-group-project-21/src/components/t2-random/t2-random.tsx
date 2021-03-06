// Das ist die Komponente des Zufalls-Gruppengenerators von Linda Schäfer
import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 't2-random',
  styleUrl: 't2-random.css',
  shadow: true,
})

export class T2Random {
  nameInput: HTMLTextAreaElement;
  nameList;
  groupBuilder: HTMLInputElement;
  personBuilder: HTMLInputElement;

  groupCount: HTMLInputElement;
  peopleCount: HTMLInputElement;
  newLineSeparate: HTMLInputElement;
  commaSeparate: HTMLInputElement;
  spaceSeparate: HTMLInputElement;

  constructor() {
    this.buildGroups = this.buildGroups.bind(this);
    this.groupBuilderFunction = this.groupBuilderFunction.bind(this);
    this.numberOfPeopleFunction = this.numberOfPeopleFunction.bind(this);

    this.changePlaceholderEmpty = this.changePlaceholderEmpty.bind(this);
    this.changePlaceholderComma = this.changePlaceholderComma.bind(this);
    this.changePlaceholderNewLine = this.changePlaceholderNewLine.bind(this);
  }

  // Platzhaltertext bei Trennmodus Leerzeichen
  changePlaceholderEmpty(){
    this.nameInput.placeholder = "Laura Jonas Domi Tobi Tabea Linda";
  }
  // Platzhaltertext bei Trennmodus neue Zeile
  changePlaceholderNewLine(){
    this.nameInput.placeholder = "Laura" + '\n' + "Jonas" + '\n' + "Domi" + '\n' + "Tobi" + '\n' + "Tabea" + '\n' + "Linda" ;
  }
  // Platzhaltertext bei Trennmodus Komma
  changePlaceholderComma(){
    this.nameInput.placeholder = "Laura, Jonas, Domi, Tobi, Tabea, Linda";
  }

  buildGroups() {
    // Abfrage welche Trennmethode ausgewählt wurde
    if (this.spaceSeparate.checked) {
      this.nameList = this.nameInput.value.split(' '); // Namen durch ein Leerzeichen getrennt
    } else if (this.commaSeparate.checked) {
      this.nameList = this.nameInput.value.split(', '); // Namen durch Komma und Leerzeichen getrennt
    } else if (this.newLineSeparate.checked) {
      this.nameList = this.nameInput.value.split('\n'); // Namen durch eine neue Zeile getrennt
    }

    // Abfrage welcher Modus ausgewählt wurde
    if (this.groupBuilder.checked) {
      this.groupBuilderFunction(); //Modus 1
    } else {
      this.numberOfPeopleFunction(); //Modus 2
    }
  }

  // Modus 1: Bilde ... Gruppen
  groupBuilderFunction() {
    let groups: String = '';
    let shuffledList = this.nameList.sort(() => Math.random() - 0.5); //zufälliges vermischen der Namensliste 
    let index = 0;
    for (let i = 0; i < parseInt(this.groupCount.value); i++) {
      groups += 'Gruppe ' + (i + 1) + ':' + '\n';

      // Rechnung Personen pro Gruppe
      let groupmembers;

      // Personenanzahl geht in den Gruppen nicht auf
      if ((shuffledList.length - index) % (parseInt(this.groupCount.value) - i) != 0) {
        groupmembers = (shuffledList.length - index) / (parseInt(this.groupCount.value) - i);

      // Personenanzahl geht in den Gruppen genau auf
      } else {
        groupmembers = Math.round(shuffledList.length - index) / (parseInt(this.groupCount.value) - i);
      }
      // Jeder Name sollte anschließend mit einem Komma ausgegeben werden, außer der letzte
      for (let x = 0; x < groupmembers; x++) {
        if (x + 1 == groupmembers) {
          groups += shuffledList[index];
  
        } else {
          groups += shuffledList[index] + ', ';
        }
        index++;
      }
      groups += '\n';
    }
    alert(groups); //Ausgabe der Gruppen
  }

  // Modus 2: Bilde Gruppen mit ... Personen
  numberOfPeopleFunction() {
    let people: String = '';
    let shuffledList = this.nameList.sort(() => Math.random() - 0.5);
    let index = 0;

    // Wie viele Gruppen müssen gebildet werden?
    let sumGroups = shuffledList.length / parseInt(this.peopleCount.value);
    for (let i = 0; i < sumGroups; i++) {
      people += 'Gruppe ' + (i + 1) + ':' + '\n';

      // Rechnung Personen pro Gruppe
      let peoplemembers;

      // Personenanzahl geht bei der Anzahl der eingegebenen Namen nicht auf
      if ((shuffledList.length - index) % (sumGroups - i) != 0) {
        peoplemembers = (shuffledList.length - index) / (sumGroups - i);

      // Personenanzahl geht bei der Anzahl der eingegebenen Namen auf
      } else {
        peoplemembers = Math.round(shuffledList.length - index) / (sumGroups - i);
      }

      // Jeder Name sollte anschließend mit einem Komma ausgegeben werden, außer der letzte
      // Zusatz weitere If Bedingung: Ausgabe der Gruppe ohne undefined
      for (let x = 0; x < peoplemembers; x++) {
        if (x + 1 == peoplemembers || index + 1 == shuffledList.length) {

          if (index + 1 <= shuffledList.length) {
            people += shuffledList[index];
          }
        } else {
          if (index + 1 <= shuffledList.length) {
            people += shuffledList[index] + ', ';
          }
        }
        index++;
      }
      people += '\n';
    }
    alert(people); //Ausgabe der Gruppen
  }

  render() {
    return (
      <Host>
        <div>
          <h1>Zufallsgenerator Gruppen</h1>
          <div class="backgroundcolor-random">
            <h2>Alle Namen:</h2>
            <div>
              <textarea class="textfeld-namen" placeholder="Laura Jonas Domi Tobi Tabea Linda" ref={el => (this.nameInput = el as HTMLTextAreaElement)}></textarea>
              <br></br>
              <h2>Namen werden getrennt durch:</h2>
              <div class="trennzeichen">
                <input type="radio" name="getrennt" checked ref={el => (this.spaceSeparate = el as HTMLInputElement)} onClick={this.changePlaceholderEmpty}/>
                <label>Leerzeichen</label>
                <input type="radio" name="getrennt" ref={el => (this.newLineSeparate = el as HTMLInputElement)} onClick={this.changePlaceholderNewLine}/>
                <label>neue Zeile</label>
                <input type="radio" name="getrennt" ref={el => (this.commaSeparate = el as HTMLInputElement)} onClick={this.changePlaceholderComma}/>
                <label>Komma</label>
              </div>
              <h2>Modus:</h2>
              <div id="auswahl" class="anzahl-gruppen">
                <input type="radio" name="modi" checked ref={el => (this.groupBuilder = el as HTMLInputElement)} />
                Bilde <input type="number" class="textfeld-anzahl" min="2" max="100" step="1" value="3" ref={el => (this.groupCount = el as HTMLInputElement)} />
                Gruppen
              </div>
              <div id="auswahl" class="anzahl-personen">
                <input type="radio" name="modi" ref={el => (this.personBuilder = el as HTMLInputElement)} />
                Bilde Gruppen mit je <input type="number" class="textfeld-anzahl" min="2" max="100" step="1" value="4" ref={el => (this.peopleCount = el as HTMLInputElement)} />
                Personen
              </div>
            </div>
            <button type="button" class="zufallsbutton" onClick={this.buildGroups}>
              Lass den Zufall entscheiden
            </button>
          </div>
        </div>
      </Host>
    );
  }
}
