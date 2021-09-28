
export default {
    playerName: null,
    listLevels: [
        /* { id, name, description, screenshot} */
    ],
    board: {
        /* rows, columns */ 
    },
    fetchingData: false,
    error: false,
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
  