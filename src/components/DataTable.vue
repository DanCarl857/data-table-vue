<template>
    <div class="container box data-table">
        <div class="dc-table">
            <h3 class="title">{{ title }}</h3>
            <div class="row">
                <div class="col col-md-6" style="float: left;">
                    <div class="row" style="vertical-align: middle">
                        <div class="col col-md-1 col-xs-12">Show</div>
                        <div class="col col-md-5 col-xs-12" style="margin-top: -6px;">
                            <input v-model="size" type="number" class="form-control" placeholder="# of entries">
                        </div>  
                        <div class="col col-md-1 col-xs-12" style="margin-left: -25px;">
                            entries
                        </div>
                    </div>
                </div>
                <div class="col col-md-6" style="margin-top: -6px;">
                    <input v-model="search" class="form-control" placeholder="Filter users by name">
                </div>
            </div>
            <br />
            <table class="table table-striped table-responsive">
                <thead>
                    <tr>
                        <th class="table-head">#</th>
                        <th v-for="column in columns" :key="column" class="table-head" @click="sortBy(column)">
                            {{ column | columnHead }}
                            <!-- <span v-if="column === sortedColumn">
                                <img src="./../assets/img/up_arrow.png" alt="Up arrow" v-if="order === 'asc'" />
                                <img src="./../assets/img/down_arrow.png" alt="Down arrow" v-else class="fas fa-arrow-down" />
                            </span> -->
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="" v-if="allEntries && allEntries.length <= 0">
                        <td class="lead text-center alert alert-warning" :colspan="columns.length + 1">
                            No data found.
                        </td>
                    </tr>
                    <tr v-for="(data, key1) in paginatedData" :key="data.id" class="m-datatable__row" v_else>
                        <td>{{ tableNumber(key1) }}</td>
                        <td class="name">{{ data.Name }}</td>
                        <td>{{ data.ID | reduceString }}</td>
                        <td style="font-style: italic; font-weight: 700;">{{ data.Date | formatDate }}</td>
                        <td data-toggle="modal" data-target="#myModal">
                            <span class="circle">
                                <img @click="showModal(data)" src="./../assets/img/edit.png" alt="Edit" />
                            </span>&nbsp;
                            {{ data.Description }} 
                        </td>
                        <td>
                            <span :class="[ data.Amount > 0 ? 'amount positive' : 'amount negative' ]">{{ data.Amount }}</span>
                        </td>
                    </tr>
                </tbody>
            </table> 

            <!-- Modal content-->
            <div class="modal fade" id="myModal" role="dialog">
                <div class="modal-dialog">
                    <div class="modal-content container">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal">&times;</button>
                        </div>
                        <div class="modal-body">
                            <h3>Edit Description for Table Row</h3>
                            <p>Name: <b>{{ modalData.Name }}</b></p>
                            <p>Amount: <b>{{ modalData.Amount }}</b></p>
                            <p>Serial Number: <b>{{ modalData.ID | reduceString }}...</b></p>
                            <p>Date: <b>{{ modalData.Date | formatDate }}</b></p>

                            <p>Description: <b><i>{{ modalData.Description }}</i></b></p>

                            <form role="form">
                                <div class="form-group">
                                    <label for="description">New Description</label>
                                    <textarea v-model="description" type="text" class="form-control" id="description" placeholder="Enter description"></textarea>
                                </div>
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button type="submit" class="btn btn-default btn-success" @click="editDescription"> Update</button>
                            <button type="submit" class="btn btn-default btn-danger pull-left" data-dismiss="modal"> 
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </div> 

            <nav>
                 <button class="btn btn-primary" @click="previousPage" :disabled="pageNumber === 0">
                    Previous
                </button>
                <button class="btn btn-primary" @click="nextPage" :disabled="pageNumber >= pageCount - 1">
                    Next
                </button>
            </nav>
        </div>
    </div>
</template>


<script>
    import { mapGetters, mapMutations } from 'vuex';
    import moment from 'moment';

    export default {
        name: 'DataTable',
        beforeCreate() {
            this.$store.dispatch('setEntries');
        },
        props: {
            columns: { type: Array, required: true },
            title: { type: String, required: false, default: "Data Table Component" },
        },
        data() {
            return {
                pageNumber: 0,
                search: '',
                size: 10,
                currentSort: 'name',
                currentSortDir: 'asc',
                modalData: {},
                description: ''
            }
        },
        computed: {
            ...mapGetters({
                allEntries: 'getEntries',
                entriesCount: 'getEntriesCount'
            }),
            pageCount() {
                let l = this.entriesCount, s = this.size;
                return Math.ceil(l/s);
            },
            paginatedData() {
                const start = this.pageNumber * this.size, end = start + this.size;
                let pData = this.allEntries.slice(start, end);

                // initially always sort by date
                pData.sort((a, b) => {
                    let date1 = new Date(a.Date);
                    let date2 = new Date(b.Date);
                    return (date2 > date1) ? 1 : ((date1 > date2) ? -1 : 0);
                });

                if (this.search) {
                    let searchString = this.search;
                    return pData.filter((data) => {
                        return data.Name.toLowerCase().includes(searchString);
                    });
                }
                return pData;
            }
        },
        methods: {
            ...mapMutations({
                updateEntry: 'editEntry'
            }),
            tableNumber(key) {
                return key + 1;
            },
            sortBy(columnHeader) {
                console.log(this.paginatedData);
                console.log(columnHeader);
            },
            showModal(data) {
                this.modalData = Object.assign({}, data);
            },
            editDescription() {
                console.log(this.description);
                const payload = {
                    name: 'Shit',
                    age: 54,
                    status: 'test'
                }
                console.log(payload);
                this.updateEntry({
                    key: this.modalData.ID,
                    value: payload
                });
            },
            nextPage() {
                this.pageNumber++;
            },
            previousPage() {
                this.pageNumber--;
            }
        },
        filters: {
            // simple filter to change hyphenated column headers to camelCase
            columnHead(value) {
                return value.split('_').join(' ').toUpperCase()
            },

            formatDate(value) {
                if (value) {
                    return moment(String(value)).format('MM-DD-YYYY hh:mm');
                }
            },

            // reduce length of IDs to make table neater
            reduceString(value) {
                if (value) {
                    return value.substring(0, 8);
                }
            }
        }
    }
</script>

<style scoped>
    .box {
        border: 1px solid #eeeeee;
        padding: 30px;
        border-radius: 8px;
        box-shadow: 10px 10px 5px #d4d4d4;
        margin-top: 50px;
        margin-bottom: 60px;
    }

    /* remove table borders */
    .table td, th {
        border: none;
    }

    .table-striped > tbody > tr:nth-child(2n+1) > td, .table-striped > tbody > tr:nth-child(2n+1) > th {
        background-color: #f8f8ff;
        border: 0px;
    }

    .title {
        font-size: 22px;
        text-align: left;
        font-weight: 900;
        margin-bottom: 40px;
    }

    .circle {
        cursor: pointer;
        border: 1px solid #fff;
        padding: 3px 5px;
        height: 7px;
        border-radius: 5px;
        box-shadow: 2px 2px 1px #d4d4d4
    }

    .circle img {
        width: 14px;
        height: 14px;
    }

    .dc-table {
        text-align: left;
    }

    .name {
        font-weight: 800;
    }

    .btn {
        height: 30px;
        border-radius: 15px;
        padding: 2px 12px;
        font-weight: 800;
        margin-left: 15px;
    }

    .amount {
        color: #fff;
        font-weight: 700;
        padding: 4px 10px;
        height: 20px;
        border-radius: 13px;
        font-size: 14px;
        box-shadow: 4px 4px 2px #d4d4d4
    }

    .positive {
        color: #3a3a3a;
        
    }

    .negative {
        background-color: #ec8787;
    }
</style>