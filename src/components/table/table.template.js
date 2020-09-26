const CODES = {
  'A': 65,
  'Z': 90
}


function toCell() {
  return `
    <div class="cell" contenteditable></div>
  `
}

function toCol(col) {
  return `
    <div class="column">${col}</div>
  `
}

function toRow(content, i) {
  return `
    <div class="row">
      <div class="row-info">${i ? i : ''}</div>
      <div class="row-data">${content}</div>
    </div>
  `
}

export function createTable(rowsCount = 15) {
  const colsCount = CODES.Z - CODES.A + 1
  const rows = []
  const cols = new Array(colsCount)
      .fill('')
      .map((_, i) => toCol(String.fromCharCode(CODES.A + i)))
      .join('')

  console.log(cols);
  rows.push(toRow(cols))

  for (let i = 0; i < rowsCount; i++) {
    const cells = new Array(colsCount)
        .fill('')
        .map(toCell)
        .join('')
    rows.push(toRow(cells, i + 1))
  }

  return rows.join('')
}
