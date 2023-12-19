import { defineStore } from 'pinia'
import axios from 'axios'
import { useAuthStore } from './auth.store'

export const useFactoriesStore = defineStore("factories", {
  actions: {
    async getAllFactories() {
      try {
        const result = await axios.get("factories", {
          headers: {
            Authorization: 'Bearer ' + JSON.parse(localStorage.getItem("access_token"))
          }
        })
        await useAuthStore().refreshTokens();
        return result.data;
      }catch(err){
        throw err;
      }
    },

    async insertFactory(factory){
      try{
        await axios.post("factories", factory, {
          headers: {
            Authorization: "Bearer " + JSON.parse(localStorage.getItem("access_token"))
          }
        });

        await useAuthStore().refreshTokens();
      }catch(err){
        throw err;
      }
    },

    async updateFactory(id, data){
      try{
        delete data.id;
        await axios.put(`factories/${id}`, data, {
          headers: {
            Authorization: "Bearer " + JSON.parse(localStorage.getItem("access_token"))
          }
        })

        await useAuthStore().refreshTokens();

      }catch(err){
        throw err;
      }
    },

    async deleteFactory(id){
      try{
        await axios.delete(`factories/${id}`, {
          headers: {
            Authorization: "Bearer " + JSON.parse(localStorage.getItem("access_token"))
          }
        })

        await useAuthStore().refreshTokens();
      }catch(err){
        throw err
      }
    }
  }
}) 