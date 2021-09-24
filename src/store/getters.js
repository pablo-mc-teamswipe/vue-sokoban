import * as CellUtils from '@/game/cell-utils'

export default {
    getCell: (state) => (row, column) => {
        return CellUtils.default.getCell(state, row, column)
    }
}
  