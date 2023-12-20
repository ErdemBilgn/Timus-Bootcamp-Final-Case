<template>
  <v-container class="containerr" fluid>
    <v-row class="justify-center align-center roww">
      <v-col lg="3" sm="12" md="6">
        <v-overlay :model-value="isLoading" class="align-center justify-center">
          <v-progress-circular v-show="isLoading" indeterminate color="white"></v-progress-circular>
        </v-overlay>
        <p v-for="(error, index) in errorMessages" :key="index" color="red-darken-3">{{ error }}</p>
        <v-card class="pa-4">
          <v-card-title class="text-center">Giriş
            Yapın</v-card-title>
          <v-card-item>
            <v-form @submit.prevent="handleLogin()">
              <v-text-field prepend-inner-icon="mdi-email" variant="solo" v-model="email" label="Email"></v-text-field>

              <v-text-field type="password" prepend-inner-icon="mdi-lock" variant="solo" v-model="password"
                label="Parola"></v-text-field>

              <v-checkbox v-model="remember" label="Beni Hatırla" color="red" hide-details></v-checkbox>

              <v-btn @click="load()" color="red-darken-3" type="submit" block class="mt-2">
                <span>Giriş Yap</span>

              </v-btn>
            </v-form>
          </v-card-item>
          <v-card-actions>
            <v-btn block type="submit" to="/signup" color="red-darken-3">Kayıt Ol</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { useAuthStore } from '@/stores';
import { mapStores } from 'pinia';

export default {

  data() {
    return {
      email: '',
      password: '',
      remember: false,
      isLoading: false,
      errorMessages: [],
    }
  },

  created() {
    const credentialsJSON = localStorage.getItem("credentials");
    if (credentialsJSON) {
      const credentials = JSON.parse(credentialsJSON);
      this.email = credentials.email,
        this.password = credentials.password
    }
  },

  computed: {
    ...mapStores(useAuthStore)
  },

  methods: {
    load() {
      this.isLoading = true;
      setTimeout(() => {
        this.isLoading = false;
      }, 500)
    },

    async handleLogin() {
      try {
        const data = {
          email: this.email,
          password: this.password,
        }
        await this.authStore.login(data);
        this.$router.push("/");

        if (this.remember) {
          const credentials = {
            email: this.email,
            password: this.password
          }
          this.authStore.saveUserDataToStorage(credentials);
        }

      } catch (err) {
        this.errorMessages = await err.response.data.message;
      }


    }
  }
}
</script>

<style scoped>
.containerr {
  height: 90vh;
}

.roww {
  height: 90%;
}
</style>
