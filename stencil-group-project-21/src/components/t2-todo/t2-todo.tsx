import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 't2-todo',
  styleUrl: 't2-todo.css',
  shadow: true,
})
export class T2Todo {
  taskInputField: HTMLTextAreaElement;

  studiumContent: HTMLDivElement;
  arbeitContent: HTMLDivElement;
  privatContent: HTMLDivElement;
  notizenContent: HTMLDivElement;

  studiumCheckBox: HTMLInputElement;
  arbeitCheckBox: HTMLInputElement;
  privatCheckBox: HTMLInputElement;
  notizenCheckBox: HTMLInputElement;


  constructor() {
    this.addTask = this.addTask.bind(this);
  }

  addTask(){
    let task: String;
    //Input
    task = this.taskInputField.value;
    if(this.studiumCheckBox.checked){
      this.studiumContent.innerText += "- " + task + "\n";
    }else if(this.arbeitCheckBox.checked) {
      this.arbeitContent.innerText += "- " + task + "\n";
    }else if(this.privatCheckBox.checked) {
      this.privatContent.innerText += "- " + task + "\n";
    }else{
      this.notizenContent.innerText += "- " + task + "\n";
    }
  }

  render() {
    return (
      <Host>
        <div class="container">
          <h1>Meine To-Do's</h1>
          <div class="platzhalter">leer</div>
          <div class="backgroundcolor-todo">
            <div id="kategorie" class="box-studium look">
              Studium
              <div class="card-content" ref={el => (this.studiumContent = el as HTMLDivElement)}>
              </div>
            </div>
            <div id="kategorie" class="box-arbeit look">
              Arbeit
              <div class="card-content" ref={el => (this.arbeitContent = el as HTMLDivElement)}>
              </div>
            </div>
            <div id="kategorie" class="box-privat look">
              Privat
              <div class="card-content" ref={el => (this.privatContent = el as HTMLDivElement)}>
              </div>
            </div>
            <div id="kategorie" class="box-notizen look">
              Notizen
              <div class="card-content" ref={el => (this.notizenContent = el as HTMLDivElement)}>
              </div>
            </div>
            <textarea class="hinzufuegen" ref={el => (this.taskInputField = el as HTMLTextAreaElement)} />
            <div class="kategorien-auswahl">
              <input type="radio" name="mode" checked ref={el => (this.studiumCheckBox = el as HTMLInputElement)}/>
              <label>Studium</label>
              <input type="radio" name="mode" ref={el => (this.arbeitCheckBox = el as HTMLInputElement)}/>
              <label>Arbeit</label>
              <input type="radio" name="mode" ref={el => (this.privatCheckBox = el as HTMLInputElement)}/>
              <label>Privat</label>
              <input type="radio" name="mode" ref={el => (this.notizenCheckBox = el as HTMLInputElement)}/>
              <label>Notizen</label>
            </div>
            <button type="button" class="button-hinzu" onClick={this.addTask}>
              Hinzufügen
            </button>
            <div class="kreis">A</div>
            <div class="pfeil-footer">ᐱ</div>
          </div>
          <slot></slot>
        </div>
      </Host>
    );
  }
}
