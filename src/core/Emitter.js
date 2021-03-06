export class Emitter {
  constructor() {
    this.listeners = {}
  }

  subscribe(event, fn) {
    this.listeners[event] = this.listeners[event] || []
    this.listeners[event].push(fn)
    return () => {
      this.listeners[event] = this.listeners[event]
          .filter(listener => listener != fn)
    }
  }

  emit(event, ...args) {
    if (!Array.isArray(this.listeners[event])) return

    this.listeners[event].forEach(listener => {
      listener(...args)
    })
  }
}

// EXAMPLE:

// const emitter = new Emitter()

// const unsubscribe =
// emitter.subscribe('koko', (param) => console.log('koko: ', param))
// emitter.emit('koko', 0)
// setTimeout(() => emitter.emit('koko', 1), 1000)
// console.log('listeners: ', emitter.listeners);

// setTimeout(()=> unsubscribe(), 2000)
// setTimeout(() => emitter.emit('koko', 2), 3000)


