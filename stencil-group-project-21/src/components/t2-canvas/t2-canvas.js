var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Component, Host, h } from '@stencil/core';
let T2Canvas = class T2Canvas {
    getMousePosition(event) {
        let rect = this.canvas.getBoundingClientRect();
        let x = event.clientX - rect.left;
        let y = event.clientY - rect.top;
        console.log("Coordinate x: " + x, "Coordinate y: " + y);
        this.draw(x, y);
    }
    draw(mouseX, mouseY) {
        console.log("Touched");
        this.context.beginPath();
        this.context.arc(mouseX, mouseY, 5, 0, 2 * Math.PI);
        this.context.stroke();
    }
    componentDidRender() {
        console.log(this.canvas);
        this.context = this.canvas.getContext("2d");
        let that = this;
        this.canvas.addEventListener("mousedown", function (e) {
            that.getMousePosition(e);
        });
        //this.el.addEventListener("mousedown", this.draw, false);
    }
    render() {
        //el.addEventListener("touchend", handleEnd, false);
        return (h(Host, null,
            h("slot", null),
            h("div", { id: "canvas-wrapper" },
                h("h2", null, "Canvas"),
                h("canvas", { width: "350", height: "500", ref: (el) => this.canvas = el }))));
    }
};
T2Canvas = __decorate([
    Component({
        tag: 't2-canvas',
        styleUrl: 't2-canvas.css',
        shadow: true,
    })
], T2Canvas);
export { T2Canvas };
