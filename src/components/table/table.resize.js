import {$} from '@core/dom'

export function resizeHandler($root, event, type) {
  const $resizer = $(event.target)
  let value;
  $resizer.css({opacity: 1})
  const $parent = $resizer.closest('[data-type="resizable"]')
  const coords = $parent.getCoords();

  document.onmousemove = (e) => {
    if (type === 'col') {
      const delta = e.pageX - coords.right
      value = coords.width + delta
      $resizer.css({
        right: `${-delta}px`,
        zIndex: 1000,
      })
    } else {
      const delta = e.pageY - coords.bottom
      value = coords.height + delta
      $resizer.css({
        bottom: `${-delta}px`,
        zIndex: 1000,
      })
    }
  }

  document.onmouseup = () => {
    document.onmousemove = null
    if (type === 'col') {
      $root.findAll(`[data-col="${$parent.data.col}"]`)
          .forEach(el => $(el).css({width: `${value}px`}))
    } else {
      $parent.css({height: `${value}px`})
    }
    $resizer.removeAttr('style')
    document.onmouseup = null
  }
}
