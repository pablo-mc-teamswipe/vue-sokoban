<template>
    <ul>
        <li v-for="indexRow in board.rows" :key="indexRow" >
            <sokoban-cell v-for="indexColumn in board.columns" :key="indexColumn" 
                :row="indexRow" :column="indexColumn" ></sokoban-cell>
        </li>
    </ul>
</template>

<script>
import { defineComponent } from 'vue'
import { mapState } from 'vuex'
import SokobanCell from '@/components/SokobanCell.vue'

export default defineComponent({
    components: {SokobanCell},  
    computed: {
        ...mapState([
            'board'
        ]) 
    },
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

