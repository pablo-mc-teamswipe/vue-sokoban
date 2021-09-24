import * as CellDefinitions from '@/game/cell-definitions'
import * as CellUtils from '@/game/cell-utils';

export default {
    // Fetch the boards created by user
    moveTo (state, { direction }) {
        let movementRow, movementColumn
        switch(direction){
            case 'down':
                movementRow = +1
                movementColumn = 0
                break
            case 'up':
                movementRow = -1
                movementColumn = 0
                break
            case 'left':
                movementRow = 0
                movementColumn = -1
                break
            case 'right':
                movementRow = 0
                movementColumn = +1
                break
        }

        const adjacentCell = CellUtils.default.getCell(state, state.playerCurrentPosition.row + movementRow, state.playerCurrentPosition.column + movementColumn);
        if( adjacentCell.status ==  CellDefinitions.CELL_STATUS_FREE){
            state.playerCurrentPosition.row += movementRow
            state.playerCurrentPosition.column += movementColumn
        }
        if( adjacentCell.status == CellDefinitions.CELL_STATUS_BRICK){
            const nextAdjacentCell = CellUtils.default.getCell(state, state.playerCurrentPosition.row + movementRow * 2, state.playerCurrentPosition.column + movementColumn * 2);
            if(nextAdjacentCell.status == CellDefinitions.CELL_STATUS_FREE){
                state.playerCurrentPosition.row += movementRow
                state.playerCurrentPosition.column += movementColumn
                state.bricksCurrentPosition[adjacentCell.indexBrick].row += movementRow
                state.bricksCurrentPosition[adjacentCell.indexBrick].column += movementColumn
            }
        }
    }
}  