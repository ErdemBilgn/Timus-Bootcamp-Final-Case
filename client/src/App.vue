<script setup>
</script>

<template>
  <v-app>
    <v-app-bar>

      <template v-slot:prepend>
        <v-app-bar-nav-icon></v-app-bar-nav-icon>
      </template>

      <v-app-bar-title>
        <RouterLink to="/">Application Bar</RouterLink>
      </v-app-bar-title>

      <v-spacer></v-spacer>

      <v-btn icon class="navbar-items">
        <v-icon icon="mdi-weather-night"></v-icon>
      </v-btn>

      <v-btn class="navbar-items" to="/login" variant="outlined" color="red-darken-3">
        Login
      </v-btn>

      <v-btn class="navbar-items" to="/signup" variant="outlined" color="red-darken-3">
        Sign up
      </v-btn>

    </v-app-bar>

    <v-main>
      <RouterView />
    </v-main>
  </v-app>
</template>

<style scoped>
.navbar-items {
  margin-left: 25px;
}
</style>
