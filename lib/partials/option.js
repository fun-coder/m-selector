"use strict";

import SelectorPartial from './partial';

export default class SelectorOption extends SelectorPartial {

  dom;
  option = {};

  constructor() {
    super();
    this.dom = document.createElement('div');
    this.dom.classList.add('m-selector--option');
  }

  setOption(value) {
    this.option = value;
  }

  onRender() {
    this.dom = document.createElement('div');
    this.dom.className = 'm-selector--option';
    this.dom.textContent = this.option.label;
    return this.dom;
  }

  addEventListener(dom) {
    dom.addEventListener('click', this.onClick.bind(this), false);
  }

  onClick() {
    console.log('select', this.option.value);
    this.eventEmitter.emit('selector:select', this.option.value);
  }
};