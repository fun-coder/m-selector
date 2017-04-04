"use strict";

export default class SelectorPartial {

  dom;
  eventEmitter;

  _children = null;

  setEventEmitter(value) {
    this.eventEmitter = value;
    this.startWatch(this.eventEmitter);
    return this;
  }

  initApi(fn, name, eventEmitter) {
    if (fn instanceof Function) eventEmitter.on(name, fn.bind(this));
  }

  startWatch(eventEmitter) {
    this.initApi(this.onOpen, 'open', eventEmitter);
    this.initApi(this._onRender, 'render', eventEmitter);
  }

  updateChildren() {
    if (!this._children) return;
    this._children.forEach(child => child.remove());
    this._children = null;
  }

  _onRender(...args) {
    var dom = this.onRender(...args);

    var children = this.children;

    if (!this._children && (children instanceof Array)) {
      this._children = children.map(child => child.setEventEmitter(this.eventEmitter));
    }

    if (this._children && this._children.length) {
      this._children.forEach(child => {
        let childDom = child._onRender(...args);
        this.getContainer(dom).appendChild(childDom);
        child.isMount = true;
      });
    }

    this.addEventListener(dom);

    return dom;
  }

  // API

  onOpen() {
  }


  onRender() {
  }

  addEventListener() {
  }

  getContainer(dom) {
    return dom;
  }

  remove() {
    this.dom.remove();
    this.isMount = false;
  }
}