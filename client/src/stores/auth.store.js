import { defineStore } from "pinia";
import axios from 'axios'

export const useAuthStore = defineStore('auth', {
  state: () => {
    return {
      authUser: null,
    }
  },
  getters: {
    user: (state) => state.authUser

  },

  actions: {
    async login(credentials) {
      try{
        const result = await axios.post('auth/login', credentials);
        const accessTokenJSON = JSON.stringify(result.data.tokens.access_token);
        const refreshTokenJSON = JSON.stringify(result.data.tokens.refresh_token);
        localStorage.setItem("access_token", accessTokenJSON);
        localStorage.setItem("refresh_token", refreshTokenJSON);
        this.authUser = result.data.user;
        console.log(localStorage.getItem("access_token"));
      }catch(err){
        throw err;
      }
    },
    
    async logout(){
      try{
        await axios.post('auth/logout', {}, {
          headers: {
            Authorization: `Bearer ${JSON.parse(localStorage.getItem("access_token"))}`
          }
        });
        this.authUser = null;
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
      }catch(err){
        throw err;
      }

    },

    async signup(newUser){
      try{
        await axios.post('auth/signup', newUser)
      }catch(err){
        throw err;
      }
    },

    saveUserDataToStorage(credentials){
      const dataJSON = JSON.stringify(credentials);
      localStorage.setItem("credentials",dataJSON);
    },

    async updateProfile(data){
      try{
        await axios.put('users/me', data, {
          headers: {
            Authorization: `Bearer ${JSON.parse(localStorage.getItem("access_token"))}`
          }
        })
      }catch(err){
        throw err;
      }
    },

    async deleteAccount(){
      try{
        await axios.delete('users/me', {
          headers: {
            Authorization: `Bearer ${JSON.parse(localStorage.getItem("access_token"))}`
          }
        })

        this.authUser = null;
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
      }catch(err){
        throw err
      }
    }
  }
}) 

