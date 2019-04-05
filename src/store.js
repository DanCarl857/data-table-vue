import Vue from 'vue';
import Vuex from 'vuex';
import firebase from 'firebase';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        entries: null
    },
    getters: {
        getEntries: state => {
            return state.entries;
        }
    },
    actions: {
        setEntries: context => {
            let tempEntries = [];
            firebase.database().ref('entries').once('value', snapshot => {
                tempEntries = snapshot.val();
                context.commit('setEntries', tempEntries);
            });
            
        }
    },
    mutations: {
        setEntries: (state, entries) => {
            console.log(entries);
            state.entries = entries;
        }
    }
})