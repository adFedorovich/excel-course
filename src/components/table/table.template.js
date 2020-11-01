const CODES = {
  'A': 65,
  'Z': 90
}

const DEFAULT_WIDTH = 120
const DEFAULT_HEIGHT = 20
function getWidth(state, i) {
  return `${state[i] || DEFAULT_WIDTH}px`
}

function getHeight(state, i) {
  return `${state[i] || DEFAULT_HEIGHT}px`
}

function toCell(state, row) {
  return function(_, col) {
    return `
      <div
      class="cell"
      contenteditable
      style="width:${getWidth(state, col)}"
      data-col="${col}" 
      data-id="${row}:${col}"
      data-type="cell">
      </div>
    `
  }
}

function toColumn({col, i, width}) {
  return `
    <div
      class="column"
      data-type="resizable"
      data-col="${i}"
      style="width: ${width}">
      ${col}
      <div class="col-resize" data-resize="col"></div>
    </div>
  `
}

function toRow(i, content, state = {}) {
  const height = getHeight(state, i)
  return `
    <div
      class="row"
      data-type="resizable"
      style="height: ${height}"
      data-row="${i || 0}">
      <div class="row-info">
        ${i ? i + '<div class="row-resize" data-resize="row"></div>' : ''}
      </div>
      <div class="row-data">${content}</div>
    </div>
  `
}

function toChar(_, i) {
  return String.fromCharCode(CODES.A + i)
}

function withWidthFrom(state) {
  return (col, i) => ({col, i, width: getWidth(state, i)})
}

export function createTable(rowsCount = 15, state = {}) {
  const colsCount = CODES.Z - CODES.A + 1
  const rows = []

  const cols = new Array(colsCount)
      .fill('')
      .map(toChar)
      .map(withWidthFrom(state.colState))
      .map(toColumn)
      .join('')

  rows.push(toRow(null, cols))

  for (let row = 0; row < rowsCount; row++) {
    const cells = new Array(colsCount)
        .fill('')
        .map(toCell(state.colState, row))
        .join('')

    rows.push(toRow(row + 1, cells, state.rowState))
  }

  return rows.join('')
}
