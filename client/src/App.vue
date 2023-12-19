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
import { useAuthStore } from './stores'
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

  async created() {

    try {
      await this.authStore.refreshTokens();
    } catch {
      localStorage.removeItem("user");
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
    }

    setInterval(async () => {
      await this.authStore.checkTokenExpiration();
    }, 1 * 60 * 1000)


  }

}
</script>


<style scoped></style>
