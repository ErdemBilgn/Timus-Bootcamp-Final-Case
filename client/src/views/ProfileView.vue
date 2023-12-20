<template>
  <v-container class="containerr">
    <v-row class="justify-center align-center roww">
      <v-col lg="4" md="8" sm="12">
        <div v-if="user">
          <p v-for="(error, index) in errorMessages" :key="index" color="red-darken-3">{{ error }}</p>
          <v-card class="w-100" prepend-icon="mdi-account-circle">
            <template v-slot:title>
              Profilim
            </template>

            <v-card-item>


              <v-form @submit.prevent="handleUpdate">

                <v-card-text>
                  <v-row class="align-center">
                    <v-col cols="10">
                      <v-text-field variant="solo" label="Name" v-bind:disabled="isNameDisable"
                        v-model="name"></v-text-field>
                    </v-col>
                    <v-col cols="2">
                      <v-btn size="x-small" @click="handleNameClick">
                        <v-icon icon="mdi-pencil"></v-icon>
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-card-text>

                <v-card-text>
                  <v-row class="align-center">
                    <v-col cols="10">
                      <v-text-field variant="solo" label="Email" v-bind:disabled="isEmailDisable"
                        v-model="email"></v-text-field>
                    </v-col>
                    <v-col cols="2">
                      <v-btn size="x-small" @click="handleEmailClick">
                        <v-icon icon="mdi-pencil"></v-icon>
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-card-text>

                <v-card-text>
                  <v-row class="align-center">
                    <v-col cols="10">
                      <v-select v-bind:disabled="isAuthorityDisable" v-model="authority" label="Authority"
                        :items="['admin', 'editor']"></v-select>
                    </v-col>
                    <v-col cols="2">
                      <v-btn size="x-small" @click="handleAuthorityClick">
                        <v-icon icon="mdi-pencil"></v-icon>
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-card-text>

                <v-btn color="red-darken-3" type="submit" block class="mt-2">
                  <span>Profilimi güncelle</span>
                </v-btn>

                <v-btn @click="handleDelete" color="red-darken-3" type="button" block class="mt-2">
                  <span>Hesabımı Sil</span>
                </v-btn>
              </v-form>

            </v-card-item>
          </v-card>
        </div>
        <div v-else>
          LUTFEN GİRİŞ YAPINIZ
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>


<script>
import { mapStores } from 'pinia'
import { useAuthStore } from '../stores/auth.store'

export default {
  props: ['user'],

  computed: {
    ...mapStores(useAuthStore)
  },

  data() {

    return {
      name: "",
      email: "",
      authority: "",
      isNameDisable: true,
      isEmailDisable: true,
      isAuthorityDisable: true,
      errorMessages: []
    }
  },

  created() {
    if (this.user) {
      this.name = this.user._source.name,
        this.email = this.user._source.email,
        this.authority = this.user._source.authority
    }

  },

  methods: {
    handleNameClick() {
      this.isNameDisable = !this.isNameDisable
    },

    handleEmailClick() {
      this.isEmailDisable = !this.isEmailDisable
    },

    handleAuthorityClick() {
      this.isAuthorityDisable = !this.isAuthorityDisable
    },

    async handleUpdate() {
      try {
        const updatedUser = {
          name: this.name,
          email: this.email,
          authority: this.authority
        }

        await this.authStore.updateProfile(updatedUser)

        this.$router.push("/")

      } catch (err) {
        console.log(err)
        this.errorMessages = await err.response.data.message;

      }

    },

    async handleDelete() {
      try {
        await this.authStore.deleteAccount();
        this.$router.push("/")
      } catch (err) {
        console.log(err);
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