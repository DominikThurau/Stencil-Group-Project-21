import { Component, Host, h } from '@stencil/core';

@Component({
tag: 't2-footer',
styleUrls: ['t2-footer.css', '../../assets/fontawesome/css/all.css'],
shadow: true,
})
export class T2Footer {

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
      <div class="icon-up" id="icon-up" onClick={this.topFunction} >
        <div class="up"></div>
              <slot name="up"/>
            </div>
        <div id="kategorie" class="box-studium">Erbe</div>
        <div id="kategorie" class="box-arbeit">Kontaktdaten Dozenten</div>
        <div id="kategorie" class="box-privat">StadtLandFluss Geschichten</div>
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