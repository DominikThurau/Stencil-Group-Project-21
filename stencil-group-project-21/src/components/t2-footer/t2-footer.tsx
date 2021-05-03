import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 't2-footer',
  styleUrls: ['t2-footer.css', '../../assets/fontawesome/css/all.css'],
  shadow: true,
})

export class T2Footer {
  constructor() {
    this.toggleContent = this.toggleContent.bind(this);
  }

hiddenContent:HTMLDivElement;

toggleContent(){
this.hiddenContent.classList.toggle("hiddenContent");
}

linkfunctionErbe(){
  window.location.href="https://vorlesung.dhbw.slezak-it.de/vorlesung/"
}

linkfunctionYoutube(){
  window.location.href="https://www.youtube.com/user/slfgeschichten"
}
linkfunctionUseless(){
  window.location.href="https://ffffidget.com/"
}

  topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

render() {
return (
<Host>
  <div class="container">
    <div class="platzhalter">leer</div>
    <div class="backgroundcolor-footer">
      <div class="bg-footer">
        <div class="icon-up" id="icon-up" onClick={this.toggleContent}>
          <div class="up"></div>
          <slot name="up" />
        </div>
        <div class="visibleContent" ref={el=> (this.hiddenContent = el as HTMLDivElement)}>
          <div id="kategorie" class="box-js" onClick={this.linkfunctionErbe}>JavaSript-Basics</div>
          <div id="kategorie" class="box-youtube" onClick={this.linkfunctionYoutube}>StadtLandFluss Geschichten</div>
          <div id="kategorie" class="box-useless" onClick={this.linkfunctionUseless}>Zeitvertreib</div>
        </div>
        <div class="content-footer">
          <div class="line">
            <hr>
            </hr>
          </div>
          <div id="icon" class="icon-bar">
            <div class="icon-instagram">
              <slot name="instagram" />
            </div>
            <div class="icon-github">
              <slot name="github" />
            </div>
            <div class="icon-moodle">
              <slot name="moodle" />
            </div>
            <div class="icon-calendar">
              <slot name="calendar" />
            </div>
            <div class="icon-download">
              <slot name="download" />
            </div>
          </div>
        </div>
        </div>
        </div>
        </div>
      </Host>
    );
  }
}
