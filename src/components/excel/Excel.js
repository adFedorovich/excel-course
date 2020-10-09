import {$} from '@core/dom';
import {Emitter} from '@core/Emitter';

export class Excel {
  constructor(selector, options) {
    this.$el = $(selector)
    this.components = options.components || [];
    this.emmiter = new Emitter()
    this.store = options.store
  }

  // формирует содержимое
  getRoot() {
    const $root = $.create('div', 'excel')

    const componentOptions = {
      emmiter: this.emmiter,
      store: this.store
    }

    this.components = this.components.map(Component => {
      const $el = $.create('div', Component.className) // create $root
      const component = new Component($el, componentOptions);
      $el.html(component.toHTML())
      $root.append($el)
      return component
    })
    return $root
  }

  render() {
    this.$el.append(this.getRoot())
    this.components.forEach((component) => component.init());
  }

  destroy() {
    this.components.forEach(component => component.destroy())
  }
}
