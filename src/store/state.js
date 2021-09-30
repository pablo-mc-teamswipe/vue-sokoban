
export default {
    playerName: null,
    listLevels: [
        /* { id, name, description, screenshot} */
    ],
    levelId: -1,
    board: {
        /* rows, columns */ 
    },
    solutionsReported: [
        /**  */
    ],
    fetchingData: false,
    error: false,
    loginRequest: '',
    loginError: '',
    currentBoardIndex: -1,
    playerCurrentPosition: {
        /*row: 2,
        column: 2
    */},
    bricksCurrentPosition: [
        /*{row: 3, column: 3} */
    ],
    numberMovements: 0,
    numberMovementsPlayed: 0,
    listMovements: [
        /* { direction: left|right|down|up, movesBrick: true|false } */
    ],
    levelCompleted: false
}
  