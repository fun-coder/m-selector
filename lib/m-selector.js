"use strict";

require('../styles/index.scss');

import Title from './partials/title';
import List from './partials/list';
import EventEmitter from 'eventemitter3';
import Partial from './partials/partial';

class MSelector extends Partial {

  dom;
  defaultValue;
  options = [];
  rendered = false;
  open = false;
  title;

  constructor(dom) {
    super();
    this.dom = dom;
    this.setEventEmitter(new EventEmitter());
  }

  setOptions(options) {
    this.options = options;
  }

  onClick(e) {
    this.open = !this.open;
    if (this.open) {
      this.dom.classList.add('open');
    } else {
      this.dom.classList.remove('open');
    }
    this.eventEmitter.emit('open', {data: this.open});
  }

  get defaultLabel() {
    const defaultOption = this.options.find(op => op.value == this.defaultValue);
    return defaultOption ? defaultOption.label : this.defaultValue;
  }

  get children() {
    return [new Title(), new List()];
  }

  onRender() {
    return this.dom;
  }

  start() {
    if (!this.rendered) {
      this.initEvents(this.dom);
      this.rendered = true;
    }

    this.eventEmitter.emit('render', {
      title: this.defaultLabel,
      options: this.options
    });
  }

  // Init Events
  initEvents(dom) {
    dom.addEventListener('click', this.onClick.bind(this));
  }

  // Events
  on(name, fn) {
    this.eventEmitter.on(`selector:${name}`, fn);
  }
}

export default MSelector;
