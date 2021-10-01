import * as MutationTypes from '@/store/mutation-types'
import * as CellDefinitions from '@/game/cell-definitions'
import * as CellUtils from '@/game/cell-utils';

export default {
    // Login mutations
    [MutationTypes.LOGIN_REQUEST] (state){
        state.loginRequest = true
        state.loginError = ''
    },

    [MutationTypes.LOGIN_SUCCESS] (state){
        state.loginRequest = false
    },

    [MutationTypes.LOGIN_FAILURE] (state , {errorLabel}){
        state.loginError = errorLabel
        state.loginRequest = false
    },

    [MutationTypes.LOGIN_CHECK_REQUEST] (state) {
        state.checkingLogin = true
    },

    [MutationTypes.LOGIN_CHECK_SUCCESS] (state, {playerName}) {
        state.checkingLogin = false
        state.playerName = playerName;
    },

    [MutationTypes.LOGIN_CHECK_FAILURE] (state) {
        state.checkingLogin = false
    },

    // Logout mutations
    [MutationTypes.LOGOUT] (state) {
        state.playerName = null
    },

    // Fetch data mutations
    [MutationTypes.FETCH_LEVELS_REQUEST] (state) {
        state.fetchingData = true
    },

    [MutationTypes.FETCH_LEVELS_SUCCESS] (state, {listLevels}) {
        Object.assign(state.listLevels, listLevels)
    },

    [MutationTypes.FETCH_LEVELS_FAILURE] (state){
        state.error = true
    },

    [MutationTypes.GET_LEVEL_INFO_REQUEST] (state) {
        state.fetchingData = true
    },

    [MutationTypes.GET_LEVEL_INFO_SUCCESS] (state, {level}) {
        state.levelId = level.id;
        state.board = level.board;
        state.solutionsReported = level.solutionsReported;
        Object.assign(state.playerCurrentPosition, state.board.playerInitialPosition)
        Object.assign(state.bricksCurrentPosition,[])
        for(let iterator in state.board.bricksInitialPosition){
            state.bricksCurrentPosition[iterator] = state.board.bricksInitialPosition[iterator];
        }
        state.numberMovements = 0;
        state.numberMovementsPlayed = 0;
        state.levelCompleted = false
    },

    [MutationTypes.GET_LEVEL_INFO_FAILURE] (state){
        state.error = true
    },

    // Post data mutations
    [MutationTypes.REPORT_SOLUTION_REQUEST] (state) {
        state.fetchingData = true
    },

    [MutationTypes.REPORT_SOLUTION_SUCCESS] (state) {
        state.error = true
    },

    [MutationTypes.REPORT_SOLUTION_FAILURE] (state){
        state.error = true
    },

    // Game mutations
    [MutationTypes.MOVE_TO] (state, { direction }) {
        let movementRow, movementColumn
        let incrementDimensions = CellUtils.default.getDimensionIncrementsByDirection(direction);

        const adjacentCell = CellUtils.default.getCell(state, 
            state.playerCurrentPosition.row + incrementDimensions.movementRow, state.playerCurrentPosition.column + incrementDimensions.movementColumn);
        if( adjacentCell.status ==  CellDefinitions.CELL_STATUS_FREE){
            state.playerCurrentPosition.row += incrementDimensions.movementRow
            state.playerCurrentPosition.column += incrementDimensions.movementColumn
            state.listMovements[state.numberMovementsPlayed] = { direction, movesBrick: false, indexBrickMoved: -1};
            state.numberMovementsPlayed++
            state.numberMovements = state.numberMovementsPlayed
            state.levelCompleted = CellUtils.default.checkLevelCompleted(state)
        }
        if( adjacentCell.status == CellDefinitions.CELL_STATUS_BRICK){
            const nextAdjacentCell = CellUtils.default.getCell(state, state.playerCurrentPosition.row + movementRow * 2, state.playerCurrentPosition.column + movementColumn * 2);
            if(nextAdjacentCell.status == CellDefinitions.CELL_STATUS_FREE){
                state.playerCurrentPosition.row += incrementDimensions.movementRow
                state.playerCurrentPosition.column += incrementDimensions.movementColumn
                state.bricksCurrentPosition[adjacentCell.indexBrick].row += incrementDimensions.movementRow
                state.bricksCurrentPosition[adjacentCell.indexBrick].column += incrementDimensions.movementColumn
                state.listMovements[state.numberMovements] = { direction, movesBrick: true, indexBrickMoved: adjacentCell.indexBrick};
                state.numberMovementsPlayed++
                state.numberMovements = state.numberMovementsPlayed
                state.levelCompleted = CellUtils.default.checkLevelCompleted(state)
            }
        }
    },

    [MutationTypes.GOTO_BACK] (state) {
        if(state.numberMovementsPlayed == 0){
            return
        }
        const lastMovement = state.listMovements[state.numberMovementsPlayed - 1]
        let incrementDimensions = CellUtils.default.getDimensionIncrementsByDirection(lastMovement.direction);
        state.playerCurrentPosition.row -= incrementDimensions.movementRow
        state.playerCurrentPosition.column -= incrementDimensions.movementColumn
        if(lastMovement.movesBrick){
            state.bricksCurrentPosition[lastMovement.indexBrickMoved].row -= incrementDimensions.movementRow
            state.bricksCurrentPosition[lastMovement.indexBrickMoved].column -= incrementDimensions.movementColumn
        }
        state.numberMovementsPlayed--
    },

    [MutationTypes.GOTO_FORWARD] (state) {
        if(state.numberMovementsPlayed >= state.numberMovements){
            return
        }
        const nextMovement = state.listMovements[state.numberMovementsPlayed]
        let incrementDimensions = CellUtils.default.getDimensionIncrementsByDirection(nextMovement.direction);
        state.playerCurrentPosition.row += incrementDimensions.movementRow
        state.playerCurrentPosition.column += incrementDimensions.movementColumn
        if(nextMovement.movesBrick){
            state.bricksCurrentPosition[nextMovement.indexBrickMoved].row += incrementDimensions.movementRow
            state.bricksCurrentPosition[nextMovement.indexBrickMoved].column += incrementDimensions.movementColumn
        }
        state.numberMovementsPlayed++
    },
}  