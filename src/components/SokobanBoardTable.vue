<template>
    <fetch-data-handler>
        <ul>
            <li v-for="indexRow in board.rows" :key="indexRow" >
                <sokoban-cell v-for="indexColumn in board.columns" :key="indexColumn" 
                    :row="indexRow" :column="indexColumn" ></sokoban-cell>
            </li>
        </ul>
    </fetch-data-handler>
</template>

<script>
import { defineComponent } from 'vue'
import { mapState, mapActions } from 'vuex'
import FetchDataHandler from '@/components/FetchDataHandler.vue';
import SokobanCell from '@/components/SokobanCell.vue'

export default defineComponent({
    props: {
        boardIndex: Number
    },
    created: function(){
        this.getLevelInfo({'level': this.boardIndex});
    },
    components: {SokobanCell, FetchDataHandler},  
    computed: {
        ...mapState([
            'board'
        ]) 
    },
    methods: {
        ...mapActions([
            'getLevelInfo'
        ]),
    }
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
li{
    clear: both;
    list-style: none;
}

ul {
    float: left;
}
</style>

