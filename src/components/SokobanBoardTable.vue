<template>
    <ul>
        <li v-for="indexRow in boards[boardIndex].rows" :key="indexRow" >
            <sokoban-cell v-for="indexColumn in boards[boardIndex].columns" :key="indexColumn" 
                :row="indexRow" :column="indexColumn" ></sokoban-cell>
        </li>
    </ul>
</template>

<script>
import { defineComponent } from 'vue'
import { mapState, mapActions } from 'vuex'
import SokobanCell from './SokobanCell.vue'

export default defineComponent({
    props: {
        boardIndex: Number
    },
    created: function(){
        this.initLevel({'boardIndex': this.boardIndex});
    },
    components: {SokobanCell},  
    computed: {
        ...mapState([
            'boards'
        ]) 
    },
    methods: {
        ...mapActions([
            'initLevel'
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
</style>

