<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <Main msg="Example usage of data table component"/>
    <DataTable 
      :columns="['name', 'amount', 'date', 'description']"
      fetchUrl="https://github.com/DanCarl857"
      title="Data Table Component"
    />
  </div>
</template>

<script>
import Main from './components/Main.vue';
import DataTable from './components/DataTable.vue';

export default {
  name: 'app',
  components: {
    Main,
    DataTable
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
