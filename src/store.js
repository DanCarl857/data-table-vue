import Vue from 'vue';
import Vuex from 'vuex';
import firebase from 'firebase';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        entries: []
    },
    getters: {
        getEntries: state => {
            return state.entries;
        },
        getEntriesCount: (state) => {
            return state.entries.length;
        }
    },
    actions: {
        setEntries: context => {
            context.commit('setEntries');
        }
    },
    mutations: {
        setEntries: (state) => {
            firebase.database().ref('entries').once('value', snapshot => {
                state.entries = snapshot.val(); 
            });
        },

        editEntry: (state, payload) => {
            console.log(payload);
            // console.log(index);
            // console.log(firebase.database.ref(`entries/${index}`));
            console.log(firebase.database().ref.child('entries'));
        }
    }
})