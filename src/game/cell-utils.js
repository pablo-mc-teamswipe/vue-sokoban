import * as CellDefinitions from '@/game/cell-definitions'

export default {
    getCell: (state, row, column) => {
        let content = CellDefinitions.CELL_CONTENT_DEFAULT
        let status = CellDefinitions.CELL_STATUS_FREE;

        let indexBrick = -1;
        let iterator

        // Check if there is a wall in this cell
        for(iterator in state.board.walls){
            if(state.board.walls[iterator].row == row && state.board.walls[iterator].column == column){
                content = CellDefinitions.CELL_CONTENT_WALL
                status = CellDefinitions.CELL_STATUS_WALL
            }
        }

        // Check if a target brick is in this cell
        for(iterator in state.board.brickTargets){
            let brickTarget = state.board.brickTargets[iterator];
            if(brickTarget.row == row && brickTarget.column == column){
                content = CellDefinitions.CELL_CONTENT_TARGET
            }
        }

        // Check if the player is in this cell
        if(row == state.playerCurrentPosition.row && column == state.playerCurrentPosition.column){
            status = CellDefinitions.CELL_STATUS_PLAYER
        }

        // Check if a brick is in this cell
        for(iterator in state.bricksCurrentPosition){
            let brick = state.bricksCurrentPosition[iterator];
            if(brick.row == row && brick.column == column){
                status = CellDefinitions.CELL_STATUS_BRICK
                indexBrick = iterator;
            }
        }

        return {
            content: content,
            status: status,
            indexBrick: parseInt(indexBrick)
        }
    }
}