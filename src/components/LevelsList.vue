<template>
    <div class="home">
        {{t('levels_list')}}
        <ul>
            <li v-for="(board, index) in boards" :key="index">
                <router-link :to="{ name: 'Level', params: { boardIndex: index } }">{{t('level')}} {{index}}</router-link>
            </li>
        </ul>
    </div>
</template>

<script>
// @ is an alias to /src
import { mapState } from 'vuex'
import { useI18n } from 'vue-i18n'

export default {
  name: 'levels-list',
  setup() {
    const { t } = useI18n({
      inheritLocale: true,
      useScope: 'local'
    })

    // Something todo ..

    return { t }
  },
  computed: {
    ...mapState([
      'boards',
    ]) 
  }
}
</script>

<style scoped>
  li {
    list-style: none;
  }
</style>

<i18n>
{
  "en": {
    "levels_list": "Levels list",
    "level": "Level"
  },
  "es" : {
    "levels_list": "Lista de niveles",
    "level": "Nivel"
  },
  "fr" : {
    "levels_list" : "Listé de niveaux",
    "level": "Niveau"
  }
}
</i18n>
