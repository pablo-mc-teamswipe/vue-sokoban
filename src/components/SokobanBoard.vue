<template>
    <fetch-data-handler>
        <div class="sokoban-board">
            <sokoban-board-panel-control />
            <div class="down">
                <sokoban-solutions-reported />
                <sokoban-board-table />
            </div>
        </div>
    </fetch-data-handler>
</template>

<script>
import { mapActions } from 'vuex'
import FetchDataHandler from '@/components/FetchDataHandler.vue';
import SokobanBoardPanelControl from '@/components/SokobanBoardPanelControl.vue'
import SokobanBoardTable from '@/components/SokobanBoardTable.vue'
import SokobanSolutionsReported from '@/components/SokobanSolutionsReported.vue'

export default {
    components: { SokobanBoardPanelControl, SokobanBoardTable, SokobanSolutionsReported, FetchDataHandler},
    name: 'sokoban-board',
    props: {
        boardIndex: Number
    },
    created: function(){
        this.getLevelInfo({'level': this.boardIndex});
    },
    methods: {
        ...mapActions([
            'getLevelInfo'
        ]),
    }
}
</script>

<style scoped>
.sokoban_board{
    margin: 0 auto;
    display: block;
}
.down{
    clear: both;
}
</style>