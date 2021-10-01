<template>
    <div>
        <div v-if="fetchingDataInProgress[fetchId]">{{t('fetching')}}</div>
        <div v-if="!fetchingDataInProgress[fetchId] && fetchingDataError[fetchId]">{{t('error')}}</div>
        <div v-show="!fetchingDataInProgress[fetchId] && !fetchingDataError[fetchId]"><slot /></div>
    </div>
</template>

<script>
// @ is an alias to /src
import { mapState } from 'vuex'
import { useI18n } from 'vue-i18n'

export default {
  name: 'fetch-data-handler',
  setup() {
    const { t } = useI18n({
      inheritLocale: true,
      useScope: 'local'
    })

    // Something todo ..

    return { t }
  },
  props: {
    fetchId: String
  },
  computed: {
    ...mapState([
      'fetchingDataInProgress',
      'fetchingDataError'
    ]) 
  },
}
</script>

<i18n>
{
  "en": {
    "fetching": "Fetching data",
    "error": "Error receiving the data",
  },
  "es" : {
    "fetching": "Cargando datos",
    "error": "Error recibiendo los datos",
  },
  "fr" : {
    "fetching": "Récupérer des données",
    "error": "Erreur lors de la réception des données",
  }
}
</i18n>
