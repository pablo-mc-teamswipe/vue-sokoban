
export default {
    board: {
        rows: 5,
        columns: 5,
        walls: [
            {row: 1, column: 1},
            {row: 1, column: 2},
            {row: 1, column: 3},
            {row: 1, column: 4},
            {row: 1, column: 5},
            {row: 2, column: 1},
            {row: 2, column: 5},
            {row: 3, column: 1},
            {row: 3, column: 5},
            {row: 4, column: 1},
            {row: 4, column: 5},
            {row: 5, column: 1},
            {row: 5, column: 2},
            {row: 5, column: 3},
            {row: 5, column: 4},
            {row: 5, column: 5},
        ],
        brickTargets: [
            {row: 2, column: 2}
        ],
        playerInitialPosition: {
            row: 2,
            column: 2
        },
        bricksInitialPosition: [
            {row: 3, column: 3}
        ]
    },
    playerCurrentPosition: {
        row: 2,
        column: 2
    },
    bricksCurrentPosition: [
        {row: 3, column: 3}
    ],
    numberMovements: 0,
    numberMovementsPlayed: 0,
    listMovements: [
        /* { direction: left|right|down|up, movesBrick: true|false } */
    ]
}
  