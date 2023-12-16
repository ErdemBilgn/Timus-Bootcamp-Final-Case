<template>
  <v-container class="containerr" fluid>
    <v-row class="justify-center align-center roww">
      <v-col cols="3">
        <v-overlay :model-value="isLoading" class="align-center justify-center">
          <v-progress-circular v-show="isLoading" indeterminate color="white"></v-progress-circular>
        </v-overlay>
        <v-card class="pa-4">
          <v-card-title class="text-center">Sing Up Here</v-card-title>
          <v-card-item>
            <v-form @submit.prevent>
              <v-text-field prepend-inner-icon="" variant="solo" v-model="name" label="Name"></v-text-field>

              <v-text-field prepend-inner-icon="mdi-email" variant="solo" v-model="email" label="Email"></v-text-field>

              <v-text-field type="password" prepend-inner-icon="mdi-lock" variant="solo" v-model="password"
                label="Password"></v-text-field>

              <v-radio-group inline v-model="authority">
                <v-radio label="Admin" value="admin"></v-radio>
                <v-radio class="radio" label="Editor" value="editor"></v-radio>
              </v-radio-group>

              <v-btn @click="load()" color="red-darken-3" type="submit" block class="mt-2">
                <span>Submit</span>

              </v-btn>
            </v-form>
          </v-card-item>

        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  data: () => ({
    name: '',
    email: '',
    password: '',
    authority: '',
    isLoading: false
  }),
  methods: {
    load() {
      this.isLoading = true;
      setTimeout(() => {
        this.isLoading = false;
      }, 3000)
    }
  }
}
</script>

<style scoped>
.radio {
  margin-left: 50px;
}

.containerr {
  height: 100vh;
}

.roww {
  height: 80%;
}
</style>