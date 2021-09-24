import * as MutationTypes from '@/store/mutation-types'
import * as CellDefinitions from '@/game/cell-definitions'
import * as CellUtils from '@/game/cell-utils';

export default {
    // Fetch the boards created by user
    [MutationTypes.MOVE_TO] (state, { direction }) {
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
            state.listMovements[state.numberMovementsPlayed] = { direction, movesBrick: false, indexBrickMoved: -1};
            state.numberMovementsPlayed++
            state.numberMovements = state.numberMovementsPlayed
        }
        if( adjacentCell.status == CellDefinitions.CELL_STATUS_BRICK){
            const nextAdjacentCell = CellUtils.default.getCell(state, state.playerCurrentPosition.row + movementRow * 2, state.playerCurrentPosition.column + movementColumn * 2);
            if(nextAdjacentCell.status == CellDefinitions.CELL_STATUS_FREE){
                state.playerCurrentPosition.row += movementRow
                state.playerCurrentPosition.column += movementColumn
                state.bricksCurrentPosition[adjacentCell.indexBrick].row += movementRow
                state.bricksCurrentPosition[adjacentCell.indexBrick].column += movementColumn
                state.listMovements[state.numberMovements] = { direction, movesBrick: true, indexBrickMoved: adjacentCell.indexBrick};
                state.numberMovementsPlayed++
                state.numberMovements = state.numberMovementsPlayed
            }
        }
    },

    [MutationTypes.GOTO_BACK] (state) {
        if(state.numberMovementsPlayed == 0){
            return
        }
        const lastMovement = state.listMovements[state.numberMovementsPlayed - 1]
        let movementRow, movementColumn
        switch(lastMovement.direction){
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
        state.playerCurrentPosition.row -= movementRow
        state.playerCurrentPosition.column -= movementColumn
        if(lastMovement.movesBrick){
            state.bricksCurrentPosition[lastMovement.indexBrickMoved].row -= movementRow
            state.bricksCurrentPosition[lastMovement.indexBrickMoved].column -= movementColumn
        }
        state.numberMovementsPlayed--
    },

    [MutationTypes.GOTO_FORWARD] (state) {
        if(state.numberMovementsPlayed >= state.numberMovements){
            return
        }
        const nextMovement = state.listMovements[state.numberMovementsPlayed]
        let movementRow, movementColumn
        switch(nextMovement.direction){
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
        state.playerCurrentPosition.row += movementRow
        state.playerCurrentPosition.column += movementColumn
        if(nextMovement.movesBrick){
            state.bricksCurrentPosition[nextMovement.indexBrickMoved].row += movementRow
            state.bricksCurrentPosition[nextMovement.indexBrickMoved].column += movementColumn
        }
        state.numberMovementsPlayed++
    },

    [MutationTypes.INIT_LEVEL] (state, {boardIndex}) {
        console.log(state.boards[boardIndex].bricksInitialPosition);
        state.currentBoardIndex = boardIndex;
        Object.assign(state.playerCurrentPosition, state.boards[boardIndex].playerInitialPosition)
        Object.assign(state.bricksCurrentPosition,[])
        for(let iterator in state.boards[boardIndex].bricksInitialPosition){
            state.bricksCurrentPosition[iterator] = state.boards[boardIndex].bricksInitialPosition[iterator];
        }
        this.numberMovements = 0;
        this.numberMovementsPlayed = 0;
    }
}  