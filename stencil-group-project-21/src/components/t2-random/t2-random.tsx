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
    this.numberOfPeopleFunction = this.numberOfPeopleFunction.bind(this);
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
    console.log(this.personBuilder.checked);
    if(this.groupBuilder.checked){
      this.groupBuilderFunction();
      //alert("Modus1")
    } else{
      this.numberOfPeopleFunction();
      //alert("Modus2")
    }
  }
//Modus 1: Bilde ... Gruppen
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
//Modus 2: Bilde Gruppen mit ... Personen
  numberOfPeopleFunction(){
    let persons: String = "";
    let shuffledList = this.nameList.sort(() => Math.random() - 0.5);
    //console.log(pPGroup);
    let index = 0;
    for(let i = 0; i < parseInt(this.personCount.value); i++){
      persons += "Gruppe " + (i + 1) + "\n";
      //Calc Groups per Persons
      let pPPersons
      if((shuffledList.length - index) % (parseInt(this.personCount.value) - i)!=0){
        pPPersons = (shuffledList.length - index) / (parseInt(this.personCount.value) - i);
      } else{
        pPPersons = Math.round(shuffledList.length - index) / (parseInt(this.personCount.value) - i);
      }
      //let pPGroup = Math.round((shuffledList.length / parseInt(this.groupCount.value)));
      for(let x = 0; x < pPPersons; x++){
        if((x+1) == (pPPersons)){
          persons += shuffledList[index];
        } else{
          persons += shuffledList[index] + ", ";
        }
        index++;
      }
      persons += "\n";
    }
    alert(persons);
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
                  <input type="radio" name="getrennt" checked/>
                  <label>neue Zeile</label>
                  <input type="radio" name="getrennt"/>
                  <label>Komma</label>
                  <input type="radio" name="getrennt"/>
                  <label>Leerzeichen</label>
                </div>
                <h2>Modus:</h2>
                <div id="auswahl" class="anzahl-gruppen">
                  <input type="radio" name="modi" checked
                  ref={el => (this.groupBuilder = el as HTMLInputElement)}/>
                  Bilde <input type="number" class="textfeld-anzahl" min="2" max="100" step="1" value="3" 
                  ref={el => (this.groupCount = el as HTMLInputElement)}/> 
                  Gruppen</div>
                  <div id="auswahl" class="anzahl-personen">
                  <input type="radio" name="modi" 
                  ref={el => (this.personBuilder = el as HTMLInputElement)}/>
                  Bilde Gruppen mit je <input type="number" class="textfeld-anzahl" min="2" max="100" step="1" value="4"
                  ref={el => (this.personCount = el as HTMLInputElement)}/> 
                  Personen</div>      
              </div>
              <button type="button" class="zufallsbutton" 
              onClick={this.buildGroups}>Lass den Zufall entscheiden</button>
              <div class="kreis">A</div>
              <div class="pfeil-footer">ᐱ</div>          
          </div>
        </div>
      </Host>
    );
  }
}
