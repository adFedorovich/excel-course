import {DomListener} from '@core/DomListener'

export class ExcelComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners)
    this.name = options.name || ''
    this.emmiter = options.emmiter
    this.unsubscribers = []
    this.prepare()
  }

  prepare() {

  }

  toHTML() {
    return '';
  }

  $emit(event, ...args) {
    this.emmiter.emit(event, ...args)
  }

  $on(event, fn) {
    const unsub = this.emmiter.subscribe(event, fn)
    this.unsubscribers.push(unsub)
  }

  init() {
    this.initDomListeners()
  }

  destroy() {
    this.removeDomListeners()
    this.unsubscribers.forEach(unsub => unsub())
  }
}
