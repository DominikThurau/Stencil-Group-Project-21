import { Component, Host, h, Listen } from '@stencil/core';

@Component({
  tag: 't2-canvas',
  styleUrls: ['t2-canvas.css', '../../assets/fontawesome/css/all.css'],
  shadow: true,
})
export class T2Canvas {
  canvas!: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  paint: boolean = false;
  coord: { x: number; y: number };
  pencilColors;
  pencilIndex: number;
  brushSize: number;
  modeView: HTMLParagraphElement;
  colorView: HTMLParagraphElement;
  widthView: HTMLParagraphElement;

  constructor() {
    //Fuck this
    this.setPencil = this.setPencil.bind(this);
    this.setEraser = this.setEraser.bind(this);
    this.startPainting = this.startPainting.bind(this);
    this.stopPainting = this.stopPainting.bind(this);
    this.changeBrushSize = this.changeBrushSize.bind(this);
    this.changeColor = this.changeColor.bind(this);
    this.clearCanvas = this.clearCanvas.bind(this);

    this.coord = { x: 0, y: 0 };
    this.pencilColors = ['black', '#FFAEBC', '#A0E7E5', '#B4F8C8', '#FBE7C6'];
    switch (localStorage.getItem('color')) {
      case 'pink': {
        this.pencilIndex = 1;
        break;
      }
      case 'blue': {
        this.pencilIndex = 2;
        break;
      }
      case 'mint': {
        this.pencilIndex = 3;
        break;
      }
      case 'yellow': {
        this.pencilIndex = 4;
        break;
      }
      default: {
        this.pencilIndex = 0;
        break;
      }
    }
    if (localStorage.getItem('mode') == 'Eraser') {
      this.context.strokeStyle = 'white';
    } else {
      this.context.strokeStyle = this.pencilColors[this.pencilIndex];
    }

    this.context.lineWidth = parseInt(localStorage.getItem('width'));
    this.brushSize = parseInt(localStorage.getItem('width'));
  }

  saveCanvas() {
    //console.log("saved");
    localStorage.setItem('canvas', this.canvas.toDataURL());
  }

  loadCanvas() {
    let dataURL = localStorage.getItem('canvas');
    let img = new Image();
    img.src = dataURL;
    this.setEraser = this.setEraser.bind(this);
    let that = this;
    img.onload = function () {
      //console.log(that);
      that.context.drawImage(img, 0, 0);
    };
    switch (localStorage.getItem('color')) {
      case 'pink': {
        this.pencilIndex = 1;
        break;
      }
      case 'blue': {
        this.pencilIndex = 2;
        break;
      }
      case 'mint': {
        this.pencilIndex = 3;
        break;
      }
      case 'yellow': {
        this.pencilIndex = 4;
        break;
      }
      default: {
        this.pencilIndex = 0;
        break;
      }
    }
    if (localStorage.getItem('mode') == 'Eraser') {
      this.context.strokeStyle = 'white';
    } else {
      this.context.strokeStyle = this.pencilColors[this.pencilIndex];
    }
    this.context.lineWidth = parseInt(localStorage.getItem('width'));
    this.modeView.innerHTML = '<b>Mode: </b> ' + localStorage.getItem('mode');
    this.colorView.innerHTML = '<b>Color: </b> ' + localStorage.getItem('color');
    this.widthView.innerHTML = '<b>Width: </b> ' + parseInt(localStorage.getItem('width'));
  }

  setPencil() {
    this.context.strokeStyle = this.pencilColors[this.pencilIndex];
    localStorage.setItem('mode', 'Pencil');
    this.modeView.innerHTML = '<b>Mode: </b>' + localStorage.getItem('mode');
  }

  setEraser() {
    this.context.strokeStyle = 'white';
    localStorage.setItem('mode', 'Eraser');
    this.modeView.innerHTML = '<b>Mode: </b>' + localStorage.getItem('mode');
  }
  changeBrushSize() {
    if (this.brushSize < 20) {
      this.brushSize += 5;
    } else {
      this.brushSize = 5;
    }

    this.context.lineWidth = this.brushSize;
    localStorage.setItem('width', this.brushSize.toString());
    this.widthView.innerHTML = '<b>Width: </b> ' + parseInt(localStorage.getItem('width'));
  }

  changeColor() {
    if (this.pencilIndex < this.pencilColors.length - 1) {
      this.pencilIndex++;
    } else {
      this.pencilIndex = 0;
    }

    this.context.strokeStyle = this.pencilColors[this.pencilIndex];

    switch (this.pencilIndex) {
      case 1: {
        localStorage.setItem('color', 'pink');
        break;
      }
      case 2: {
        localStorage.setItem('color', 'blue');
        break;
      }
      case 3: {
        localStorage.setItem('color', 'mint');
        break;
      }
      case 4: {
        localStorage.setItem('color', 'yellow');
        break;
      }
      default: {
        localStorage.setItem('color', 'black');
        break;
      }
    }
    this.colorView.innerHTML = '<b>Color: </b> ' + localStorage.getItem('color');
  }

  clearCanvas() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.saveCanvas();
  }

  componentDidRender() {
    this.context = this.canvas.getContext('2d');

    this.resize(); // Resizes the canvas once the window loads
    document.addEventListener('mousedown', this.startPainting);
    document.addEventListener('mouseup', this.stopPainting);
    document.addEventListener('mousemove', this.sketch);
    document.addEventListener('resize', this.resize);
    this.loadCanvas();
    //this.el.addEventListener("mousedown", this.draw, false);
  }

  public getMousePos(event) {
    let rect = this.canvas.getBoundingClientRect();
    this.coord.x = event.clientX - rect.left;
    this.coord.y = event.clientY - rect.top;
    //console.log(this.coord);
    //console.log("Coordinate x: " + x, "Coordinate y: " + y);
  }

  @Listen('mousedown')
  startPainting(event) {
    //console.log(this.pencilColors[0]);
    this.paint = true;
    this.getMousePos(event);
  }

  @Listen('mouseup')
  stopPainting() {
    this.paint = false;
    this.saveCanvas();
  }

  @Listen('mousemove')
  sketch(event) {
    if (!this.paint) return;
    //console.log('Move');
    this.context.beginPath();

    // Sets the end of the lines drawn
    // to a round shape.
    this.context.lineCap = 'round';

    // The cursor to start drawing
    // moves to this coordinate
    this.context.moveTo(this.coord.x, this.coord.y);

    // The position of the cursor
    // gets updated as we move the
    // mouse around.
    this.getMousePos(event);

    // A line is traced from start
    // coordinate to this coordinate
    this.context.lineTo(this.coord.x, this.coord.y);

    // Draws the line.
    this.context.stroke();
  }

  resize() {
    this.context.canvas.width = 300;
    this.context.canvas.height = 500;
  }

  render() {
    //el.addEventListener("touchend", handleEnd, false);
    return (
      <Host>
        <slot></slot>
        <div id="canvas-wrapper">
          <h2>Canvas</h2>
          <i class="fas fa-camera"></i>
          <div class="canvas-stats">
            <p ref={el => (this.modeView = el as HTMLParagraphElement)}>Mode: </p>
            <p ref={el => (this.colorView = el as HTMLParagraphElement)}>Color: </p>
            <p ref={el => (this.widthView = el as HTMLParagraphElement)}>Width: </p>
          </div>
          <canvas id="canvas" width="300" height="500" class="shadow" ref={el => (this.canvas = el as HTMLCanvasElement)}></canvas>
          <div class="button-bar">
            <div class="icon-button shadow" onClick={this.setPencil}>
              <div class="icon-class">
                <slot name="brush" />
              </div>
            </div>
            <div class="icon-button shadow" onClick={this.setEraser}>
              <div class="icon-class">
                <slot name="eraser" />
              </div>
            </div>
            <div class="icon-button shadow" onClick={this.changeColor}>
              <div class="icon-class">
                <slot name="color" />
              </div>
            </div>
            <div class="icon-button shadow" onClick={this.changeBrushSize}>
              <div class="icon-class">
                <slot name="size" />
              </div>
            </div>
            <div class="icon-button shadow" onClick={this.clearCanvas}>
              <div class="icon-class">
                <slot name="clear" />
              </div>
            </div>
          </div>
        </div>
      </Host>
    );
  }
}
