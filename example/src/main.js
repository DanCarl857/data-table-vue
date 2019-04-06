import Vue from 'vue';
import App from './App.vue';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { store } from './store';
import firebase from 'firebase';

Vue.config.productionTip = false
// Vue.prototype.$http = axios

// Firebase Configuration
// Keep this here for simplicity
const config = {
  apiKey: "AIzaSyBa-iS6qczt1NWYpclt2ftPEb_mqM7J8j0",
  authDomain: "data-table-862a7.firebaseapp.com",
  databaseURL: "https://data-table-862a7.firebaseio.com",
  projectId: "data-table-862a7",
  storageBucket: "data-table-862a7.appspot.com",
  messagingSenderId: "21964294526"
};

firebase.initializeApp(config);

export const db = firebase.firestore();

new Vue({
  store,
  render: h => h(App),
}).$mount('#app')
