"use strict";

import SelectorPartial from './partial';

export default class SelectorTitle extends SelectorPartial {

  dom;
  options;

  constructor() {
    super();
    this.dom = document.createElement('div');
    this.dom.classList.add('m-selector--title');
  }

  onRender({title, options}) {
    this.dom.textContent = title;
    this.options = options;
    return this.dom;
  }

  addEventListener(dom) {
    this.eventEmitter.on('selector:select', value => {
      let op = this.options.find(op => op.value == value);
      this.dom.textContent = op.label;
    });
  }
};