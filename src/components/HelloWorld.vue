<template>
  <div class="hello" >
    <button @click="moveTo({direction:'up'})">Up</button>
    <button @click="moveTo({direction: 'down'})">Down</button>
    <button @click="moveTo({direction:'left'})">Left</button>
    <button @click="moveTo({direction:'right'})">Right</button>
    <ul>
      <li v-for="(row, indexRow) in board.cells" :key="indexRow" >
        <sokoban-cell v-for="(cell, indexColumn) in row" :key="indexColumn" 
          :row="indexRow" :column="indexColumn" ></sokoban-cell>
      </li>
    </ul>
  </div>
</template>

<script>
import SokobanCell from './SokobanCell.vue'
import { mapState, mapActions } from 'vuex'

export default {
  components: { SokobanCell },
  name: 'HelloWorld',
  props: {
    msg: String
  },
  computed: {
    ...mapState([
      'board'
    ])
  },
  methods: {
    ...mapActions([
      'moveTo'
    ]),
    earendil (){

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
li{
  clear: both;
  list-style: none;;
}
</style>
