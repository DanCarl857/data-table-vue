<template>
    <div class="container box data-table">
        <div class="dc-table">
            <h3 class="title">{{ title }}</h3>
            <table class="table">
                <thead>
                    <tr>
                        <th class="table-head">#</th>
                        <th v-for="column in columns" :key="column" class="table-head" @click="sortByColumn(column)">
                            {{ column | columnHead }}
                            <span v-if="column === sortedColumn">
                                <i v-if="order === 'asc'" class="fas fa-arrow-up"></i>
                                <i v-else class="fas fa-arrow-down"></i>
                            </span>
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

        <nav v-if="pagination && tableData.length > 0">
            <ul class="pagination">
                <li class="page-item" :class="{'disabled' : currentPage === 1}">
                    <a class="page-link" href="#" @click.prevent="changePage(currentPage - 1)">Prev</a>
                </li>
                <li v-for="page in pagesNumber" class="page-item" :class="{'active': page == pagination.meta.current_page}" :key="page">
                    <a href="#" @click.prevent="changePage(page)" class="page-link">{{ page }}</a>
                </li>
                <li class="page-item" :class="{'disabled': currentPage === pagination.meta.last_page }">
                    <a class="page-link" href="#" @click.prevent="changePage(currentPage + 1)">Next</a>
                </li>
                <span style="margin-top: 8px;">&nbsp; <i>Displaying {{ pagination.data.length }} of {{ pagination.meta.total }} entries.</i></span>
            </ul>
        </nav>
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
                tableData: [],
                url: '',
                pagination: {
                    meta: { to: 1, from: 1 }
                },
                offset: 4,
                currentPage: 1,
                perPage: 5,
                sortedColumn: this.columns[0],
                order: 'asc'
            }
        },
        watch: {
            fetchUrl: {
                handler: function(fetchUrl) {
                    this.url = fetchUrl
                },
                immediate: true
            }
        },
        created() {
            this.$store.dispatch('setEntries');
            return this.fetchData(this.fetchUrl)
        },
        computed: {
            pagesNumber() {
                if (!this.pagination.meta.to) {
                    return []
                }
                let from = this.pagination.meta.current_page - this.offset
                if (from < 1) {
                    from = 1
                }
                let to = from + (this.offset * 2)
                if (to >= this.pagination.meta.last_page) {
                    to = this.pagination.meta.last_page
                }
                let pagesArray = []
                for (let page = from; page <= to; page++) {
                    pagesArray.push(page)
                }
                return pagesArray
            },
            totalData() {
                return (this.pagination.meta.to - this.pagination.meta.from) + 1
            }
        },
        methods: {
            fetchData(url) {
                axios.get(url) 
                    .then(data => {
                        // this.tableData = data.data.data
                        // this.pagination = data 
                        // this.tableData = data.data
                        this.pagination = []
                        data.data.data = []
                        this.tableData = []
                    }).catch(error => {
                        console.log(`[ERROR]: ${error}`)
                        this.tableData = []
                    })
            },
            serialNumber(key) {
                return key + 1;
            },
            changePage(pageNumber) {
                this.currentPage = pageNumber
                this.fetchData()
            },
            sortedByColumn(column) {
                if (column === this.sortedColumn) {
                    this.order = (this.order === 'asc') ? 'desc' : 'asc'
                } else {
                    this.sortedColumn = column
                    this.order = 'asc'
                }
                this.fetchData()
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