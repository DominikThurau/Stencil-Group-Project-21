import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 't2-random',
  styleUrl: 't2-random.css',
  shadow: true,
})
export class T2Random {
  nameInput:HTMLTextAreaElement;
  nameList;
  groupBuilder: HTMLInputElement;
  personBuilder: HTMLInputElement;

  groupCount: HTMLInputElement;
  personCount: HTMLInputElement;

  constructor(){
    this.buildGroups = this.buildGroups.bind(this);
    this.groupBuilderFunction = this.groupBuilderFunction.bind(this);
  }

  componentDidRender() {
    //this.nameList = this.nameInput.value;
    console.log(this.nameInput.value);

    //this.nameInput = this.canvas.getContext('2d');
  }

  buildGroups(){
    //this.nameList = this.nameInput.value;
    //console.log(this.nameList);
    this.nameList = this.nameInput.value.split(' ');
    console.log(this.groupBuilder.checked);
    if(this.groupBuilder.checked){
      this.groupBuilderFunction();
    } else{

    }
    
  }

  groupBuilderFunction(){
    let groups: String = "";
    let shuffledList = this.nameList.sort(() => Math.random() - 0.5);
    //console.log(pPGroup);
    let index = 0;
    for(let i = 0; i < parseInt(this.groupCount.value); i++){
      groups += "Gruppe " + (i + 1) + "\n";
      //Calc Persons per Group
      let pPGroup
      if((shuffledList.length - index) % (parseInt(this.groupCount.value) - i)!=0){
        pPGroup = (shuffledList.length - index) / (parseInt(this.groupCount.value) - i);
      } else{
        pPGroup = Math.round(shuffledList.length - index) / (parseInt(this.groupCount.value) - i);
      }
      //let pPGroup = Math.round((shuffledList.length / parseInt(this.groupCount.value)));
      for(let x = 0; x < pPGroup; x++){
        if((x+1) == (pPGroup)){
          groups += shuffledList[index];
        } else{
          groups += shuffledList[index] + ", ";
        }
        index++;
      }
      groups += "\n";
    }
    alert(groups);
  }

  render() {
    return (
      <Host>
        <div>
          <h1>Zufallsgenerator Gruppen</h1>
          <div class="platzhalter">leer</div>
          <div class="backgroundcolor-random">
            <h2>Alle Namen:</h2>
              <div>
                <textarea class="textfeld-namen" placeholder="Laura, Linda, Dominik, Tobi, Tabea, Jonas" ref={el => (this.nameInput = el as HTMLTextAreaElement)}></textarea>
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
                <div id="auswahl" class="anzahl-gruppen"><input type="radio" name="modi" ref={el => (this.groupBuilder = el as HTMLInputElement)}/>Bilde <input type="text" maxlength="3"  class="textfeld-anzahl" ref={el => (this.groupCount = el as HTMLInputElement)}/> Gruppen</div>
                <div id="auswahl" class="anzahl-personen"><input type="radio" name="modi" ref={el => (this.personBuilder = el as HTMLInputElement)}/>Bilde Gruppen mit je <input type="text" maxlength="3" class="textfeld-anzahl"/> Personen</div>
              </div>
              <button type="button" class="zufallsbutton" onClick={this.buildGroups}>Lass den Zufall entscheiden</button>
              <div class="kreis">A</div>
              <div class="pfeil-footer">ᐱ</div>          
          </div>
        </div>
      </Host>
    );
  }
}
