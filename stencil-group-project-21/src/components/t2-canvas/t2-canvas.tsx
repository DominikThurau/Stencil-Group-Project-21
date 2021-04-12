import { Component, Host, h, Listen } from '@stencil/core';

@Component({
  tag: 't2-canvas',
  styleUrl: 't2-canvas.css',
  shadow: true,
  
})
export class T2Canvas {
  canvas!: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  paint:boolean = false;
  coord: {x:number , y:number};
  pencilColors;
  pencilIndex: number;
  brushSize: number;

  
  constructor() {
    //Fuck this
    this.startPainting = this.startPainting.bind(this);
    this.changeBrushSize = this.changeBrushSize.bind(this);
    this.changeColor = this.changeColor.bind(this);
    this.clearCanvas = this.clearCanvas.bind(this);

    this.coord = {x:0 , y:0}; 
    this.pencilColors =["green", "red", "blue"];
    this.pencilIndex = 0;
    this.brushSize = 2;
  }
  
  changeBrushSize(){
    console.log(this.brushSize);
    if(this.brushSize<8){
      this.brushSize += 2;
    } else {
      this.brushSize = 2;
    }
    this.context.lineWidth = this.brushSize;
  }

  changeColor(){
    if(this.pencilIndex<this.pencilColors.length -1){
      this.pencilIndex ++;
    } else {
      this.pencilIndex = 0;
    }
    this.context.strokeStyle = this.pencilColors[this.pencilIndex];
  }

  clearCanvas(){
    this.context.clearRect(0,0,this.canvas.width,this.canvas.height);
  }

  componentDidRender(){
    this.context = this.canvas.getContext("2d");

    this.resize(); // Resizes the canvas once the window loads
    document.addEventListener('mousedown', this.startPainting);
    document.addEventListener('mouseup', this.stopPainting);
    document.addEventListener('mousemove', this.sketch);
    document.addEventListener('resize', this.resize);

    //this.el.addEventListener("mousedown", this.draw, false);
  }

  public getMousePos(event) {
    let rect = this.canvas.getBoundingClientRect();
    this.coord.x = (event.clientX - rect.left);
    this.coord.y = event.clientY - rect.top;
    console.log(this.coord);
    //console.log("Coordinate x: " + x, "Coordinate y: " + y);
  }

  @Listen("mousedown")
  startPainting(event) {
    console.log(this.pencilColors[0])
    this.paint = true;
    this.getMousePos(event);
  }

  @Listen("mouseup")
  stopPainting(){
    this.paint = false;
  }

  @Listen("mousemove")
  sketch(event){

    if (!this.paint) return;
    console.log("Move");
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
    this.context.lineTo(this.coord.x , this.coord.y);
      
    // Draws the line.
    this.context.stroke();
  }

  resize(){
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
          <canvas id="canvas" width="300" height="500" class="shadow" ref={(el) => this.canvas = el as HTMLCanvasElement}></canvas>
          <div class="button-bar">
            <div class="icon-button shadow" onClick={this.changeColor}><p>C</p></div>
            <div class="icon-button shadow" onClick={this.changeBrushSize}><p>W</p></div>
            <div class="icon-button shadow"><p></p></div>
            <div class="icon-button shadow"><p></p></div>
            <div class="icon-button shadow" onClick={this.clearCanvas}><p>X</p></div>
          </div>
        </div>
        
      </Host>
    );
  }

}
