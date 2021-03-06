import {$} from '@core/dom'
import {ExcelComponent} from '@core/ExcelComponent'
import {createTable} from '@components/table/table.template'
import {resizeHandler} from '@components/table/table.resize'
import {isCell, matrix, nextSelector} from '@components/table/table.functions'
import {TableSelection} from '@components/table/TableSelection'

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
    return createTable(20)
  }

  prepare() {
    this.selection = new TableSelection()
  }

  init() {
    super.init()
    const $cel = this.$root.find('[data-id="0:0"]')
    this.selection.select($cel)
    this.$emit('table:select', $cel)

    this.$on('formula:input', (text) => {
      this.selection.current.text(text)
    })

    this.$on('formula:done', () => {
      this.selection.current.focus()
    })
  }

  onMousedown(event) {
    const type = event.target.dataset.resize;
    if (type) resizeHandler(this.$root, event, type)
    else if (isCell(event)) {
      const $target = $(event.target)
      if (event.shiftKey) {
        const $cels = matrix($target, this.selection.current)
            .map(id => this.$root.find(`[data-id="${id}"]`))
        this.selection.selectGroup($cels);
      } else {
        this.selection.select($target)
      }
      this.$emit('table:select', $target)
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
      this.selection.select($next)
      this.$emit('table:select', $next)
    }
  }

  onInput(event) {
    this.$emit('table:input', $(event.target))
  }
}


