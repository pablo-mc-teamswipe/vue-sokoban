<template>
    <page-layout>
        <levels-list v-if="!checkingLogin" />
    </page-layout>
</template>

<script>
// @ is an alias to /src
import { mapState, mapActions } from 'vuex'
import PageLayout from '@/components/PageLayout.vue'
import LevelsList from '@/components/LevelsList.vue'

export default {
  name: 'Home',
  created: function(){
    this.checkLogin({component: this, requiredStatus: 'auth'})
  },
  components: {
    LevelsList, PageLayout
  },
  computed: {
    ...mapState([
      'checkingLogin'
    ])
  },
  methods: {
    ...mapActions([
      'checkLogin'
    ])
  }
}
</script>
