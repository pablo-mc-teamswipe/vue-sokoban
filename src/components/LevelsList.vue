<template>
    <div class="home">
        Lista de niveles
        <ul>
            <li v-for="(board, index) in boards" :key="index">
                <router-link :to="{ name: 'Level', params: { boardIndex: index } }">Nivel {{index}}</router-link>
            </li>
        </ul>
    </div>
</template>

<script>
// @ is an alias to /src
import { mapState } from 'vuex'

export default {
  name: 'levels-list',
  computed: {
    ...mapState([
      'boards',
    ]) 
  }
}
</script>
