
export default {
    // Login state data
    loginRequest: '',
    loginError: '',
    checkingLogin: false,
    playerName: null,

    // General fetching state data
    fetchingDataInProgress: false,
    fetchingDataError: false,

    // List levels state data
    listLevels: [ /* { id, name, description, screenshot} */ ],

    // Level info state data
    levelId: -1,
    board: { /* rows: Number, columns: Number, walls: [], bricksTarget: [], bricksInitialPosition: [], playerInitialPosition: {},  */ },
    solutionsReported: [  /**  */  ],

    // Game state data
    playerCurrentPosition: {  /*row: 2, column: 2 */},
    bricksCurrentPosition: [ /*{row: 3, column: 3} */ ],
    numberMovements: 0,
    numberMovementsPlayed: 0,
    listMovements: [ /* { direction: left|right|down|up, movesBrick: true|false, indexBrickMoved: Number } */ ],
    levelCompleted: false
}
  