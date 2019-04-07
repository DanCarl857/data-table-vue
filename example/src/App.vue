<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <v-main msg="Example usage of data table component"/>
    <v-datatable 
      :columns="['name', 'ID', 'date', 'description', 'amount']"
      title="Data Table Component"
      :dtData="allEntries"
      :count="entriesCount"
    />
  </div>
</template>

<script>
  import Main from './components/Main.vue';
  import DataTable from './components/DataTable';

  import { mapGetters, mapMutations } from 'vuex';

  export default {
    name: 'app',
    components: {
      'v-main': Main,
      'v-datatable': DataTable
    },
    beforeCreate() {
      this.$store.dispatch('setEntries');
    },
    computed: {
      ...mapGetters({
        allEntries: 'getEntries',
        entriesCount: 'getEntriesCount'
      })
    },
    methods: {
      ...mapMutations({
        updateEntry: 'editEntry'
      })
    }
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
