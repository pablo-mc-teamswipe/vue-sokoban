<template>
    <header>
        <router-link to="/"><img class="logo" src="../assets/logo.png" alt="Vue Sokoban" /></router-link>
        <div class="right">
            <language-selector />
            <login-handler />
        </div>
    </header>    
</template>

<script>
import { defineComponent } from 'vue'
import LanguageSelector from '@/components/LanguageSelector.vue'
import LoginHandler from '@/components/LoginHandler.vue'

export default defineComponent({
    name: 'page-header',
    setup() {
        
    },
    components: { LanguageSelector, LoginHandler}
})
</script>

<style scoped>
    header {
        width: calc(100% - 10px);
        height: 70px;
        background: #faebdc;
        padding: 5px;
    }

    .logo{
        width: 70px;
        max-width: 70px;
        float: left;
    }

    .right{
        float: right;
        width: 200px;
        max-width: 200px;
    }
</style>