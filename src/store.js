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
        },

        editEntry: context => {
            context.dispatch('editEntry');
        }
    },
    mutations: {
        setEntries: (state) => {
            firebase.database().ref('entries').once('value', snapshot => {
                state.entries = snapshot.val(); 
            });
        },

        // TODO: Refactor this to make it more efficient
        editEntry: (state, payload) => {
            let index = state.entries.findIndex((entry) => {
                return entry.ID == payload.value.ID && entry.Name == payload.value.Name
            });

            if (index >= 0) {
                let data = Object.assign([], state.entries);
                data[index] = payload.value;
                firebase.database().ref('entries').set(data, (error) => {
                    if (error) {
                        console.log('[ERROR]: ' + error);
                    } else {
                        Vue.set(state, 'entries', data);
                    }
                })
            }
        }
    }
})