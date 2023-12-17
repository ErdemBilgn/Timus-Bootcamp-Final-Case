

<template>
  <v-app>
    <app-bar :user="user"></app-bar>
    <v-main>
      <RouterView :user="user" />
    </v-main>
  </v-app>
</template>

<script>
import AppBar from './components/AppBar.vue'
import axios from 'axios'

export default {
  components: {
    AppBar
  },
  data() {
    return {
      user: null
    }
  },

  async created() {
    const result = await axios.get('users/me')

    this.user = result.data;
    console.log(this.user)

  }
}
</script>


<style scoped></style>
