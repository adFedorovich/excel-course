import {$} from '@core/dom'

export function resizeHandler($root, event) {
  return new Promise((resolve) => {
    const $resizer = $(event.target)
    const $parent = $resizer.closest('[data-type="resizable"]')
    const coords = $parent.getCoords();
    const type = $resizer.data.resize
    let value;
    $resizer.css({opacity: 1})

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
      resolve({
        value,
        id: type === 'col' ? $parent.data.col : null
      })
    }
  })
}
