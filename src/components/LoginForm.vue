<template>
    <div class="container-form">
        <div class="form"  v-if="!loginRequest">
            <label for="name">E-mail</label>
            <input type="text" name="name" v-model="email" />
            <div class="input-errors" v-for="error of v$.email.$errors" :key="error.$uid">
                <div class="error-msg">{{ error.$property  }} {{ error.$params.type}}</div>
            </div>
            <label for="password">Password</label>
            <input type="password" name="name" v-model="password" />
            <div class="input-errors" v-for="error of v$.password.$errors" :key="error.$uid">
                <div class="error-msg">{{ error.$property  }} {{ error.$params.type}}</div>
            </div>
            <button @click="callSubmitLogin">Submit</button>
        </div>
        <div v-else>
            {{t('loading')}}
        </div>
        <div v-if="loginError != ''"> {{t(loginError)}} </div>
    </div>
</template>

<script>
import { defineComponent } from 'vue'
import { mapState, mapActions } from 'vuex'
import { useI18n } from 'vue-i18n'
import useVuelidate from '@vuelidate/core'
import { required, email } from '@vuelidate/validators'

export default defineComponent({
    name: 'login-form',
    setup() {
        const { t } = useI18n({
        inheritLocale: true,
        useScope: 'local'
        })

        // Something todo ..

        return { t, v$: useVuelidate() }
    },
    data: function(){
        return {
            email: '',
            password: ''
        }
    },
    computed: {
        ...mapState([
            'loginRequest',
            'loginError',
        ]),
    },
    methods: {
        ...mapActions([
            'submitLogin'
        ]),
        callSubmitLogin: function(){
            this.v$.$touch();
            if(this.v$.$errors.length == 0){
                this.submitLogin({component: this, email: this.email, password: this.password})
            }
        },
    },
    validations () {
        return {
            email: { required, email }, // Matches this.email
            password: { required }, // Matches this.password
        }
    }
})
</script>

<style scoped>
</style>

<i18n>
{
  "en": {
    "bad_credentials": "Wrong username or password",
    "net_error": "Network error",
    "loading": "Loading",
  },
  "es" : {
    "bad_credentials": "Usuario o contraseña incorrectos",
    "net_error": "Error de red",
    "loading": "Cargando",
  },
  "fr" : {
    "bad_credentials" : "Identifiant ou mot de passe incorrect",
    "net_error": "Erreur réseau",
    "loading": "Chargement en cours",
  }
}
</i18n>