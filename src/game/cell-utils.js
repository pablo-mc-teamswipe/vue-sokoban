import * as CellDefinitions from '@/game/cell-definitions'

export default {
    getCell: (state, row, column) => {
        let status = CellDefinitions.CELL_STATUS_FREE;
        let indexBrick = -1;
        if( state.board.cells[row][column].content == CellDefinitions.CELL_CONTENT_WALL){
            status = CellDefinitions.CELL_STATUS_WALL;
        }

        if(row == state.playerCurrentPosition.row && column == state.playerCurrentPosition.column){
            status = CellDefinitions.CELL_STATUS_PLAYER
        }
        for(var i in state.bricksCurrentPosition){
            let brick = state.bricksCurrentPosition[i];
            if(brick.row == row && brick.column == column){
                status = CellDefinitions.CELL_STATUS_BRICK
                indexBrick = i;
            }
        }
        return {
            content: state.board.cells[row][column].content,
            status: status,
            indexBrick: parseInt(indexBrick)
        }
    }
}