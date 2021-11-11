<template>
    <page-layout>
        <h2>Sokoban Game</h2>
        <login-form />
    </page-layout>
</template>

<script>
import { defineComponent } from 'vue'
import { mapActions } from 'vuex'
import PageLayout from '@/components/PageLayout.vue'
import LoginForm from '@/components/LoginForm.vue'

export default defineComponent({
    components: {
        LoginForm, PageLayout
    },
    setup() {
        
    },
    created: function(){
        this.checkLogin({requiredStatus: 'guest'})
    },
    methods: {
        ...mapActions([
            'checkLogin'
        ])
    }
})
</script>
