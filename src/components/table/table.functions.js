import {range} from '@core/utils'

export function isCell(event) {
  return event.target.dataset.type === 'cell'
}

export function matrix($target, $current) {
  const target = $target.id(true)
  const current = $current.id(true)
  const cols = range(current.col, target.col)
  const rows = range(current.row, target.row)
  return cols.reduce((acc, col) => {
    rows.forEach(row => acc.push(`${row}:${col}`))
    return acc
  }, [])
}

export function nextSelector(key, {col, row}, shiftKey) {
  const MIN_VALUE = 0;

  if (key === 'Tab') {
    key = shiftKey ? 'TabShift' : 'Tab'
  }

  switch (key) {
    case 'Enter':
    case 'ArrowDown':
      row++
      break;
    case 'Tab':
    case 'ArrowRight':
      col++
      break;
    case 'ArrowLeft':
    case 'TabShift':
      col = col - 1 < MIN_VALUE ? MIN_VALUE : --col
      break;
    case 'ArrowUp':
      row = row - 1 < MIN_VALUE ? MIN_VALUE : --row
      break;

    default:
      break;
  }

  return `[data-id="${row}:${col}"]`
}
