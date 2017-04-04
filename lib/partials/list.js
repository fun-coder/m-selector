"use strict";

import SelectorPartial from './partial';
import Option from './option';

export default class SelectorList extends SelectorPartial {

  dom;
  options = [];

  height = 150;
  lineHeight = 50;
  startIndex = 0;
  ops = [];
  prevIndex = -1;


  constructor() {
    super();
    this.dom = document.createElement('div');
    this.dom.classList.add('m-selector--list');

    this.container = document.createElement('div');
    this.container.classList.add('m-selector--list-container');
    this.dom.appendChild(this.container);
  }

  get children() {

    this.count = Math.floor(this.height / this.lineHeight) + 2;

    let i = 0;

    while (i++ < this.count) this.ops.push(new Option());

    return this.ops;
    // return this.options.map(op => {
    //   let option = new Option();
    //   option.setOption(op);
    //   return option;
    // });
  }

  getContainer(dom) {
    return dom.querySelector('.m-selector--list-container');
  }

  onRender({options}) {
    this.options = options;
    this.container.style.height = this.lineHeight * options.length + 'px';

    this.updateChildren();
    return this.dom;
  }

  addEventListener(dom) {
    this.show();

    this.eventEmitter.on('scroll', index => {
      console.log('set index', index);
      try {
        index > this.prevIndex ? this.next(index) : this.prev(index);
      } catch (e) {
        console.log(index, this.dom.scrollTop);
      }

      this.prevIndex = index;
    });

    dom.addEventListener('scroll', () => {
      let index = Math.floor(this.dom.scrollTop / this.lineHeight) - 1;
      if (index != this.prevIndex) this.eventEmitter.emit('scroll', index);
    });
  }

  show() {
    let base = Math.floor(this.dom.scrollTop / this.lineHeight);

    for (let i = 0; i < this.count; i++) {
      let opIdx = (base + i) % this.count;
      this.ops[opIdx].dom.style.top = (i + base) * this.lineHeight + 'px';
      this.ops[opIdx].dom.textContent = this.options[i + base].label;
    }
  }

  prev(index) {
    let nextLine = index;
    let current = nextLine % this.count;
    this.ops[current].dom.style.top = index * this.lineHeight + 'px';
    this.ops[current].dom.textContent = this.options[nextLine].label;
    setTimeout(() => this.show(), 100);
  }

  next(index) {
    let nextLine = index + this.count - 1;
    let current = nextLine % this.count;
    this.ops[current].dom.style.top = nextLine * this.lineHeight + 'px';
    this.ops[current].dom.textContent = this.options[nextLine].label;
    setTimeout(() => this.show(), 100);
  }
};