<template>
    <div class="container box data-table">
        <h3 class="title">{{ title }}</h3>
        <table class="table">
            <thead>
                <tr>
                    <th class="table-head">#</th>
                    <th v-for="column in columns" :key="column" class="table-head">
                        {{ column | columnHead }}
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr class="" v-if="tableData.length === 0">
                    <td class="lead text-center alert alert-warning" :colspan="columns.length + 1">
                        No data found.
                        </td>
                </tr>
                <tr v-for="(data, key1) in tableData" :key="data.id" class="m-datatable__row" v_else>
                    <td>{{ serialNumber(key1) }}</td>
                    <td v-for="(value, key) in data" :key="key">{{ value }}</td>
                </tr>
            </tbody>
        </table> 
    </div>
</template>


<script>

    import axios from 'axios';

    export default {
        name: 'DataTable',
        props: {
            fetchUrl: { type: String, required: false },
            columns: { type: Array, required: true },
            title: { type: String, required: true }
        },
        data() {
            return {
                tableData: []
            }
        },
        created() {
            return this.fetchData(this.fetchUrl)
        },
        methods: {
            fetchData(url) {
                axios.get(url) 
                    .then(data => {
                        // this.tableData = data.data.data
                        data.data.data = [];
                        this.tableData = [];
                    })
            },
            serialNumber(key) {
                return key + 1;
            }
        },
        filters: {
            columnHead(value) {
                return value.split('_').join(' ').toUpperCase()
            }
        }
    }
</script>

<style scoped>
    .box {
        border: 1px solid #e7e7e7;
        padding: 30px;
        border-radius: 8px;
        box-shadow: 2px 4px #d4d4d4;
        margin-top: 50px;
    }

    .title {
        font-size: 18px;
        text-align: left;
        font-weight: 800;
        margin-bottom: 20px;
    }
</style>