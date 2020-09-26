import {ExcelComponent} from '@core/ExcelComponent'
import {createTable} from '@components/table/table.template'
import {resizeHandler} from '@components/table/table.resize'

export class Table extends ExcelComponent {
  static className = 'excel__table'
  constructor($root) {
    super($root, {
      listeners: ['mousedown']
    })
  }

  toHTML() {
    return createTable(20)
  }

  onMousedown(event) {
    const type = event.target.dataset.resize;
    if (type) resizeHandler(this.$root, event, type)
  }
}
