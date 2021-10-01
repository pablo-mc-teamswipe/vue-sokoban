<template>
    <div v-if="playerName != null" class="login_handler">
        {{ playerName}}
        <span @click="callLogout">X</span>
    </div>
</template>

<script>
import { defineComponent } from 'vue'
import { mapState, mapActions } from 'vuex'

export default defineComponent({
    name: 'login-handler',
    computed: {
        ...mapState([
            'playerName'
        ])
    },
    methods: {
        ...mapActions([
            'logout'
        ]),
        callLogout: function(){
            this.logout({component: this})
        }
    }
})
</script>
<style scoped>
    .login_handler{
        clear: both;
        margin-top: 5px;
    }
</style>