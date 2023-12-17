

<template>
  <v-app>
    <app-bar :user="authStore.authUser"></app-bar>
    <v-main>
      <RouterView :user="authStore.authUser" />
    </v-main>
  </v-app>
</template>

<script>
import AppBar from './components/AppBar.vue'
import { useAuthStore } from './stores/auth.store'
import { mapStores } from 'pinia'

export default {
  components: {
    AppBar
  },
  data() {
    return {
      user: null,
    }
  },

  computed: {
    ...mapStores(useAuthStore),
  },

}
</script>


<style scoped></style>
