<template>
  <nav>
    <v-app-bar>
      <template v-slot:prepend>
        <v-app-bar-nav-icon @click="openDrawer"></v-app-bar-nav-icon>
      </template>

      <v-app-bar-title>
        <span class="font-weight-light">EnergySa</span>
      </v-app-bar-title>

      <v-spacer></v-spacer>

      <v-btn @click="changeTheme" icon class="ml-5">
        <v-icon :icon="isDarkTheme ? 'mdi-weather-night' : 'mdi-weather-sunny'"></v-icon>
      </v-btn>

      <p v-if="user">{{ user._source.name }}</p>

      <v-btn to="/factories" v-if="user" class="ml-5" variant="outlined" color="red-darken-3">
        <span>Dashboard</span>
        <v-icon class="ml-1" right icon="mdi-view-dashboard"></v-icon>
      </v-btn>

      <v-btn to="/profile" v-if="user" class="ml-5" variant="outlined" color="red-darken-3">
        <span>Profile</span>
        <v-icon class="ml-1" right icon="mdi-account-circle"></v-icon>
      </v-btn>

      <v-btn v-if="user" @click="handleLogout()" class="ml-5" variant="outlined" color="red-darken-3">
        <span>Logout</span>
        <v-icon class="ml-1" right icon="mdi-logout"></v-icon>
      </v-btn>


      <v-btn v-if="!user" class="ml-5" to="/login" variant="outlined" color="red-darken-3">
        <span>Login</span>
        <v-icon class="ml-1" right icon="mdi-login"></v-icon>
      </v-btn>

      <v-btn v-if="!user" class="ml-5" to="/signup" variant="outlined" color="red-darken-3">
        <span>Sign Up</span>
        <v-icon class="ml-1" right icon="mdi-account-plus"></v-icon>
      </v-btn>





    </v-app-bar>


  </nav>
</template>

<script>
import { useTheme } from 'vuetify/lib/framework.mjs';
import { mapStores } from 'pinia';
import { useAuthStore } from '../stores/auth.store';

export default {
  props: ['user'],
  data() {
    return {
      isDarkTheme: true,
      theme: useTheme(),
      drawer: false,
    }
  },

  computed: {
    ...mapStores(useAuthStore)
  },
  methods: {
    changeTheme() {
      this.isDarkTheme = !this.isDarkTheme;
      this.theme.global.name = this.isDarkTheme ? "dark" : "light";
    },

    openDrawer() {
      this.drawer = !this.drawer;
    },

    async handleLogout() {
      try {
        await this.authStore.logout();
        this.$router.push('/');
      } catch (err) {
        console.log(err);
      }
    }
  }
}

</script>


<style scoped></style>