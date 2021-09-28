<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <levels-list />
  </div>
</template>

<script>
// @ is an alias to /src
import { mapActions } from 'vuex'
import LevelsList from '@/components/LevelsList.vue'

export default {
  name: 'Home',
  created: function(){
    this.checkLogin({component: this, requiredStatus: 'auth'})
  },
  components: {
    LevelsList
  },
  methods: {
    ...mapActions([
      'checkLogin'
    ])
  }
}
</script>
