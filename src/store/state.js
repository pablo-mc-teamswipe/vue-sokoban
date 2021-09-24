import * as CellDefinitions from '@/game/cell-definitions'

export default {
    board: {
        rows: 5,
        columns: 5,
        cells: [
            [ 
                { content: CellDefinitions.CELL_CONTENT_WALL},
                { content: CellDefinitions.CELL_CONTENT_WALL},
                { content: CellDefinitions.CELL_CONTENT_WALL},
                { content: CellDefinitions.CELL_CONTENT_WALL},
                { content: CellDefinitions.CELL_CONTENT_WALL}
            ],[
                { content: CellDefinitions.CELL_CONTENT_WALL},
                { content: CellDefinitions.CELL_CONTENT_TARGET},
                { content: CellDefinitions.CELL_CONTENT_DEFAULT},
                { content: CellDefinitions.CELL_CONTENT_DEFAULT},
                { content: CellDefinitions.CELL_CONTENT_WALL}
            ],[
                { content: CellDefinitions.CELL_CONTENT_WALL},
                { content: CellDefinitions.CELL_CONTENT_DEFAULT},
                { content: CellDefinitions.CELL_CONTENT_DEFAULT},
                { content: CellDefinitions.CELL_CONTENT_DEFAULT},
                { content: CellDefinitions.CELL_CONTENT_WALL}
            ],[
                { content: CellDefinitions.CELL_CONTENT_WALL},
                { content: CellDefinitions.CELL_CONTENT_DEFAULT},
                { content: CellDefinitions.CELL_CONTENT_DEFAULT},
                { content: CellDefinitions.CELL_CONTENT_DEFAULT},
                { content: CellDefinitions.CELL_CONTENT_WALL}
            ],[
                { content: CellDefinitions.CELL_CONTENT_WALL},
                { content: CellDefinitions.CELL_CONTENT_WALL},
                { content: CellDefinitions.CELL_CONTENT_WALL},
                { content: CellDefinitions.CELL_CONTENT_WALL},
                { content: CellDefinitions.CELL_CONTENT_WALL}
            ]
        ]
    },
    playerCurrentPosition: {
        row: 1,
        column: 1
    },
    bricksCurrentPosition: [
        {row: 2, column: 2}
    ]
}
  