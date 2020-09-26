class Dom {
  constructor(selector) {
    this.$el = typeof selector === 'string'
      ? document.querySelector(selector)
      : selector
  }

  html(html) {
    if (typeof html === 'string') {
      this.$el.innerHTML = html
      return this
    }
    return this.$el.outerHTML.trim()
  }

  clear() {
    this.html('')
    return this
  }

  append(node) {
    if (node instanceof Dom) {
      node = node.$el
    }
    if (Element.prototype.append) {
      this.$el.append(node)
      return this
    }
    this.$el.appendChild(node)
    return this
  }

  on(eventType, callbalck) {
    this.$el.addEventListener(eventType, callbalck)
  }

  off(eventType, callbalck) {
    this.$el.removeEventListener(eventType, callbalck)
  }

  closest(selector) {
    return $(this.$el.closest(selector))
  }

  getCoords() {
    return this.$el.getBoundingClientRect()
  }

  get data() {
    return this.$el.dataset
  }

  findAll(selector) {
    return this.$el.querySelectorAll(selector)
  }

  css(styles = {}) {
    for (const [key, value] of Object.entries(styles)) {
      this.$el.style[key] = value
    }
  }

  removeAttr(attribute) {
    this.$el.removeAttribute(attribute);
  }
}


export function $(selector) {
  return (
    new Dom(selector)
  )
}

$.create = (tagName, classes ='') => {
  const el = document.createElement(tagName)
  if (classes) {
    el.classList.add(classes)
  }
  return $(el)
}

