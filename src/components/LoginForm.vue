<template>
    <div class="form">
        <div class="input-container">
            <label for="name">E-mail</label>
            <input type="text" name="name" v-model="email" />
            <div class="input-errors" v-for="error of v$.email.$errors" :key="error.$uid">
                <div class="error-msg">{{ error.$property  }} {{ error.$params.type}}</div>
            </div>
        </div>
        <div class="input-container">
            <label for="password">Password</label>
            <input type="password" name="name" v-model="password" />
            <div class="input-errors" v-for="error of v$.password.$errors" :key="error.$uid">
                <div class="error-msg">{{ error.$property  }} {{ error.$params.type}}</div>
            </div>
        </div>
        <button v-if="!loginRequest" @click="callSubmitLogin">Submit</button>
        <div v-else> {{t('loading')}} </div>
        <div v-if="loginError != ''" class="error-msg"> {{t(loginError)}} </div>
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
.form{
    max-width: 300px;
    display: block;
    margin: 0 auto;
}
label{
    float: left;
    font-size: 13px;
}
.input-container{
    min-height: 60px;
}

input{
    border-width: 0 0 1px 0;
    clear: both;
    width: 100%;

}

.error-msg{
    color: #fe4066;
    font-size: 11px;
}
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