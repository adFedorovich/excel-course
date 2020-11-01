import {$} from '@core/dom'
import {
  shouldResize,
  isCell,
  matrix,
  nextSelector
} from '@components/table/table.functions'
import {ExcelComponent} from '@core/ExcelComponent'
import {createTable} from '@components/table/table.template'
import {resizeHandler} from '@components/table/table.resize'
import {TableSelection} from '@components/table/TableSelection'
import * as actions from '@redux/actions'

export class Table extends ExcelComponent {
  static className = 'excel__table'
  constructor($root, options) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'keydown', 'input'],
      ...options
    })
  }

  toHTML() {
    return createTable(20, this.store.getState())
  }

  prepare() {
    this.selection = new TableSelection()
  }

  init() {
    super.init()
    const $cel = this.$root.find('[data-id="0:0"]')
    this.selectCell($cel)

    this.$on('formula:input', (text) => {
      this.selection.current.text(text)
    })

    this.$on('formula:done', () => {
      this.selection.current.focus()
    })
  }

  selectCell($cell) {
    this.selection.select($cell)
    this.$emit('table:select', $cell)
  }

  async resizeTable(event) {
    try {
      const data = await resizeHandler(this.$root, event)
      this.$dispatch(actions.tableResize(data))
    } catch (e) {
      console.warn(e.message);
    }
  }

  onMousedown(event) {
    if (shouldResize(event)) {
      this.resizeTable(event)
    } else if (isCell(event)) {
      const $target = $(event.target)
      if (event.shiftKey) {
        const $cells = matrix($target, this.selection.current)
            .map(id => this.$root.find(`[data-id="${id}"]`))
        this.selection.selectGroup($cells)
      } else {
        this.selectCell($target)
      }
    }
  }

  onKeydown(event) {
    const keys = [
      'Enter',
      'Tab',
      'ArrowLeft',
      'ArrowRight',
      'ArrowUp',
      'ArrowDown'
    ]
    const {key, shiftKey} = event;

    if (keys.includes(key)) {
      if (shiftKey && key !== 'Tab') return
      event.preventDefault()
      const id = this.selection.current.id(true)
      const $next = this.$root.find(nextSelector(key, id, shiftKey));
      this.selectCell($next)
    }
  }

  onInput(event) {
    this.$dispatch(actions.changeText({
      id: this.selection.current.text(),
      value: $(event.target).text()
    }))
  }
}


