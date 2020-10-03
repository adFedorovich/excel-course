const CODES = {
  'A': 65,
  'Z': 90
}

function toCell(row) {
  return function(_, col) {
    return `
      <div
      class="cell"
      contenteditable
      data-col="${col}" 
      data-id="${row}:${col}"
      data-type="cell">
      </div>
    `
  }
}

function toCol(col, i) {
  return `
    <div class="column" data-type="resizable" data-col="${i}">
      ${col}
      <div class="col-resize" data-resize="col"></div>
    </div>
  `
}

function toRow(content, i) {
  return `
    <div class="row" data-type="resizable">
      <div class="row-info">
        ${i ? i + '<div class="row-resize" data-resize="row"></div>' : ''}
      </div>
      <div class="row-data">${content}</div>
    </div>
  `
}

export function createTable(rowsCount = 15) {
  const colsCount = CODES.Z - CODES.A + 1
  const rows = []
  const cols = new Array(colsCount)
      .fill('')
      .map((_, i) => toCol(String.fromCharCode(CODES.A + i), i))
      .join('')

  rows.push(toRow(cols))

  for (let row = 0; row < rowsCount; row++) {
    const cells = new Array(colsCount)
        .fill('')
        .map(toCell(row))
        .join('')
    rows.push(toRow(cells, row + 1))
  }

  return rows.join('')
}
