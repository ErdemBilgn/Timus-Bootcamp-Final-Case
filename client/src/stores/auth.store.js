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
        const tokensJSON = JSON.stringify(result.data.tokens);
        localStorage.setItem("tokens", tokensJSON);
        this.authUser = result.data.user;
      }catch(err){
        throw err;
      }
    },
    
    async logout(){
      await axios.post('auth/logout');
      this.authUser = null;
      localStorage.removeItem("tokens");
    },

    async signup(newUser){
      try{
        await axios.post('auth/signup', newUser)
      }catch(err){
        throw err;
      }
    },

    saveUserDataToStorage(data){
      const dataJSON = JSON.stringify(data);
      localStorage.setItem("credentials",dataJSON);
    }
  }
}) 

