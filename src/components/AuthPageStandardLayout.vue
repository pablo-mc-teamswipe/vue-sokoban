<template>
    <page-layout>
        <div v-if="checkingLogin" >Checking Login</div>
        <slot v-else/>
    </page-layout>
</template>

<script>
// @ is an alias to /src
import { mapState, mapActions } from 'vuex'
import PageLayout from '@/components/PageLayout.vue'

export default {
    name: 'auth-page-standard-layout',
    created: function(){
      this.checkLogin({requiredStatus: 'auth'})
    },
    components: {
        PageLayout
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
