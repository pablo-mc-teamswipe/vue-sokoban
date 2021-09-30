<template>
    <div class="hello" >
        <label for="name">E-mail</label>
        <input type="text" name="name" v-model="email" />
        <label for="password">Password</label>
        <input type="password" name="name" v-model="password" />
        <button @click="callSubmitLogin">Submit</button>
    </div>
</template>

<script>
import { defineComponent } from 'vue'
import { mapActions } from 'vuex'

export default defineComponent({
    name: 'login-form',
    setup() {
    },
    data: function(){
        return {
            email: '',
            password: ''
        }
    },
    methods: {
        ...mapActions([
            'submitLogin'
        ]),
        callSubmitLogin: function(){
            this.submitLogin({component: this, email: this.email, password: this.password})
        },
    }
})
</script>

<style scoped>
</style>
