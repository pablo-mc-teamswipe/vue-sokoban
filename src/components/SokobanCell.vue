<template>
    <div :class="cellClassName"> 
    </div>    
</template>

<script>
import { defineComponent } from 'vue'
import { mapGetters } from 'vuex'
import * as CellDefinitions from '@/game/cell-definitions'

export default defineComponent({
    name: 'sokoban-cell',
    props: {
        row: Number,
        column: Number
    },

    computed: {
        ...mapGetters([
            'getCell'
        ]),
        cellClassName () {
            let foregroundClass = '', backgroundClass = '';

            const cell = this.getCell(parseInt(this.row), parseInt(this.column));
            if(cell.content == CellDefinitions.CELL_CONTENT_TARGET && cell.status == CellDefinitions.CELL_STATUS_BRICK){
                return 'target_got';
            }

            switch(cell.content){
                case CellDefinitions.CELL_CONTENT_WALL:
                    backgroundClass = 'wall_class';
                    break;
                case CellDefinitions.CELL_CONTENT_TARGET:
                    backgroundClass = 'target_class';
                    break;
                case CellDefinitions.CELL_CONTENT_DEFAULT:
                    backgroundClass = 'default_class';
                    break;
            }

            switch(cell.status){
                case CellDefinitions.CELL_STATUS_BRICK:
                    foregroundClass = 'brick_class';
                    break;
                case CellDefinitions.CELL_STATUS_PLAYER:
                    foregroundClass = 'player_class';
                    break;
                case CellDefinitions.CELL_STATUS_FREE:
                    foregroundClass = 'free_class';
                    break;
            }
            return `${foregroundClass} ${backgroundClass}`;
        }
    },

    setup() {
        
    },
})
</script>

<style scoped>
    div{
        width: 40px;
        height: 40px;
        float: left;
        border: 5px solid;
    }
    .wall_class{
        background: #6E4835;
        border-color: #6E4835;
    }
    .target_class{
        background: #C9C1A9;
    }

    .default_class{
        background: #C58372;
    }

    .brick_class{
        border-color: #735F68;
    }

    .free_class{
        border-color: #C58372;
    }

    .player_class{
        border-color: #4F952A;
    }

</style>