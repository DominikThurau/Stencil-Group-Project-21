import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 't2-canvas',
  styleUrl: 't2-canvas.css',
  shadow: true,
  
})
export class T2Canvas {
  canvas!: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  isTouching!:boolean;


  getMousePosition(event) {
    let rect = this.canvas.getBoundingClientRect();
    let x = event.clientX - rect.left;
    let y = event.clientY - rect.top;
    console.log("Coordinate x: " + x, "Coordinate y: " + y);
    this.draw(x,y);
}
  
  draw(mouseX: number, mouseY: number) {
    console.log("Touched");
    this.context.beginPath();
    this.context.arc(mouseX, mouseY, 5, 0, 2*Math.PI);
    this.context.stroke();
  }

  componentDidRender(){
    console.log(this.canvas);
    this.context = this.canvas.getContext("2d");
    let that = this;
    this.canvas.addEventListener("mousedown", function(e)
    {
      
        that.getMousePosition(e);
    });
    
    //this.el.addEventListener("mousedown", this.draw, false);
  }

  render() {

    //el.addEventListener("touchend", handleEnd, false);
    return (
      <Host>
        
        <slot></slot>
        <div id="canvas-wrapper">
          <h2>Canvas</h2>
          <canvas width="350" height="500" ref={(el) => this.canvas = el as HTMLCanvasElement}></canvas>
        </div>
        
      </Host>
    );
  }

}
