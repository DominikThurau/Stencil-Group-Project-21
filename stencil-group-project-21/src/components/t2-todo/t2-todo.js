var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Component, Host, h } from '@stencil/core';
let T2Todo = class T2Todo {
    render() {
        return (h(Host, null,
            h("slot", null)));
    }
};
T2Todo = __decorate([
    Component({
        tag: 't2-todo',
        styleUrl: 't2-todo.css',
        shadow: true,
    })
], T2Todo);
export { T2Todo };
