import {storage} from '@core/utils'

const defalultState = {
  rowState: {},
  colState: {},
  dataState: {}, // {'0:1': 'text'}
  currentText: '',
}

export const initialState = storage('excel-state') || defalultState
