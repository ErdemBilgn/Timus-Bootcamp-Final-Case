import { defineStore } from "pinia";
import axios from 'axios'

export const useFactoryDetailsStore = defineStore("factoryDetails", {
  actions: {
    async getAllDetailsForFactory(firmId){
      try{
        const result = await axios.get(`factory-details/factory-id/${firmId}`, {
          headers: {
            Authorization: 'Bearer ' + JSON.parse(localStorage.getItem("access_token"))
          }
        })
        return result.data;
      }catch(err){
        throw err;
      }
    },

    async insertDetails(details){
      try{
        await axios.post("factory-details", details, {
          headers: {
            Authorization: 'Bearer ' + JSON.parse(localStorage.getItem("access_token"))
          }
        })
      }catch(err){
        throw err;
      }
    },

    async updateFactoryDetails(id,details){
      try{
        await axios.put(`factory-details/${id}`, details , {
          headers: {
            Authorization: 'Bearer ' + JSON.parse(localStorage.getItem("access_token"))
          }
        })
      }catch(err){
        throw err
      }
    },

    async deleteSinlgeFactoryDetails(id){
      try{
        await axios.delete(`factory-details/${id}`, {
          headers: {
            Authorization: 'Bearer ' + JSON.parse(localStorage.getItem("access_token"))
          }
        })
      }catch(err){
        throw err
      }
    },

    async deleteAllFactoryDetails(firmId){
      try{
        await axios.delete(`factory-details/factory-id/${firmId}`, {
          headers: {
            Authorization: 'Bearer ' + JSON.parse(localStorage.getItem("access_token"))
          }
        })
      }catch(err){
        throw err
      }
    }
  }
})