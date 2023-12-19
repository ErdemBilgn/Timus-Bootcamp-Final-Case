import { defineStore } from "pinia";
import axios from 'axios';
import { jwtDecode } from "jwt-decode";

export const useAuthStore = defineStore('auth', {
  state: () => {
    return {
      authUser: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,
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
        const userJSON = JSON.stringify(result.data.user);
        localStorage.setItem("access_token", accessTokenJSON);
        localStorage.setItem("refresh_token", refreshTokenJSON);
        localStorage.setItem("user", userJSON);
        this.authUser = result.data.user;
      }catch(err){
        throw err;
      }
    },

    async checkTokenExpiration() {
      const accessToken = JSON.parse(localStorage.getItem("access_token"));
      const refreshToken = JSON.parse(localStorage.getItem("refresh_token"));

      if(accessToken && refreshToken){
        const accessTokenExp = jwtDecode(accessToken).exp * 1000
        const currentTime = new Date().getTime();

        if(currentTime > accessTokenExp){
          //Access Token Expired.
          //Refresh Tokens
          try{
            await this.refreshTokens();
          }catch(err){
            throw err
          }
        }
      }
    },

    async refreshTokens(){
      try{
        const result = await axios.post("auth/refresh", {}, {
          headers: {
            Authorization: "Bearer " + JSON.parse(localStorage.getItem("refresh_token"))
          }
        })

        const accessTokenJSON = JSON.stringify(result.data.access_token);
        const refreshTokenJSON = JSON.stringify(result.data.refresh_token);
        localStorage.setItem("access_token", accessTokenJSON);
        localStorage.setItem("refresh_token", refreshTokenJSON);
      }catch(err){
        this.authUser = null
        localStorage.removeItem("user");
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
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
        localStorage.removeItem("user");
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
        let result = null
        await axios.put('users/me', data, {
          headers: {
            Authorization: `Bearer ${JSON.parse(localStorage.getItem("access_token"))}`
          }
        }),
        
        result = await axios.get('users/me', {
          headers: {
            Authorization: `Bearer ${JSON.parse(localStorage.getItem("access_token"))}`
          }
        })
        this.authUser = result.data;
        await this.refreshTokens();
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
        localStorage.removeItem("user");
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
      }catch(err){
        throw err
      }
    }
  }
}) 

