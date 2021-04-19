import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 't2-footer',
  styleUrls: ['t2-footer.css', '../../assets/fontawesome/css/all.css'],
  shadow: true,
})
export class T2Footer {

  render() {
    return (
      <Host>
        <div class="container">
          <div class="platzhalter">leer</div>
            <div class="backgroundcolor-footer">
              <div class="bg-footer">
                <div class="content-footer">
              <div class="line"><hr></hr></div>
                <div id="icon" class="icon-bar">
                <div class="icon-instagram">
                      <slot name="instagram"/>
                  </div>
                  <div class="icon-github">
                      <slot name="github"/>
                  </div>
                  <div class="icon-moodle">
                      <slot name="moodle"/>
                  </div>
                  <div class="icon-calendar">
                      <slot name="calendar"/>
                  </div>
                    <div class="icon-download">
                      <slot name="download"/>
                  </div>
                  <div class="icon-upload">
                      <slot name="upload"/>
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


