import axios from 'axios'

axios.defaults.baseURL = "http://localhost:3333/"
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

if (localStorage.getItem("tokens"))
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + JSON.parse(localStorage.getItem("tokens")).access_token