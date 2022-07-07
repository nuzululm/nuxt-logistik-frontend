<template>
    <div class="container-fluid">
        <div class="row">

            <div class="col-md-4">
                <div class="card">
                    <div class="card-header">
                        <h4 class="card-title">Add New</h4>
                    </div>
                    <div class="card-body">
                        <category-form ref="form" />
                        <button class="btn btn-primary btn-sm" @click="submit">Save</button>
                    </div>
                </div>
            </div>

            <div class="col-md-8">
                <div class="card">
                    <div class="card-header">
                        <h4 class="card-title">
                            List Categories
                        </h4>
                    </div>
                    <div class="card-body row">
                        <div class="col-md-4 offset-md-8 mb-4">
                            <input type="text" placeholder="Search" v-model="search" @keypress.enter="findCategory" class="form-control">
                        </div>
                        <div class="col-md-12">
                            <b-table striped hover :items="categories.data" :fields="fields" show-empty responsive>
                                <template v-slot:cell(actions)="row">
                                    <button class="btn btn-warning btn-sm" @click="openEditModal(row)">Edit</button>
                                    <button class="btn btn-danger btn-sm" @click="openDeleteModal(row)">Delete</button>
                                </template>
                            </b-table>
                            <b-pagination
                                align="right"
                                v-model="categories.current_page"
                                :total-rows="categories.total"
                                :per-page="categories.per_page"
                                @change="changePage"
                                aria-controls="my-table"
                            ></b-pagination>
                        </div>

                        <b-modal v-model="deleteModal" title="Delete Data Category">
                            <p>Kamu yakin ingin menghapus data: <code>{{ category_selected ? category_selected.name:'' }}</code>?</p>
                            <template v-slot:modal-footer>
                                <div class="w-100 float-right">
                                    <b-button
                                        variant="secondary"
                                        size="sm"
                                        @click="deleteModal=false"
                                    >
                                        Close
                                    </b-button>
                                    <b-button
                                        variant="primary"
                                        size="sm"
                                        @click="deleteDataCategory"
                                    >
                                        Delete
                                    </b-button>
                                </div>
                            </template>
                        </b-modal>

                        <b-modal v-model="editModal" title="Edit Category">
                            <category-form ref="formEdit" :selected="category_selected" />
                            <template v-slot:modal-footer>
                                <div class="w-100 float-right">
                                    <b-button
                                        variant="secondary"
                                        size="sm"
                                        @click="deleteModal=false"
                                    >
                                        Close
                                    </b-button>
                                    <b-button
                                        variant="primary"
                                        size="sm"
                                        @click="updateCategory"
                                    >
                                        Update
                                    </b-button>
                                </div>
                            </template>
                        </b-modal>

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapState, mapMutations } from 'vuex'
import Category from '@/components/form/Category.vue'

export default {
    
    //FUNGSI INI AKAN BERJALAN SEBELUM COMPONENT DILOAD
    async asyncData({store}) {
        await Promise.all([
            //KITA MELOAD FUNGSI GETCATEGORIESDATA UNTUK MENGAMBIL DATA KATEGORI DARI API
            store.dispatch('category/getCategoriesData')
        ])
        return
    },
    data() {
        return {
            fields: ['name', 'description', 'actions'], 
            items: [],
            search: '',
            deleteModal: false,
            category_selected: null,
            editModal: false,
        }
    },
    computed: {
        //LOAD STATE CATEGORIES DAN PAGE YANG AKTIF
        ...mapState('category', {
            categories: state => state.categories,
            page: state => state.page
        })
    },
    watch: {
        //KETIKA VALUE DARI STATE PAGE BERUBAH
        page() {
            //MAKA KITA REQUEST DATA BARU
            this.getCategoriesData(this.search)
        }  
    },
    methods: {
        //LOAD ACTIONS DARI MODULE CATEGORY
        ...mapActions('category', ['getCategoriesData', 'destroyCategoryData']),
        ...mapMutations('category', ['SET_PAGE']),
        
        openDeleteModal(row) {
            this.category_selected = row.item
            this.deleteModal = true
        },

        deleteDataCategory() {
            this.destroyCategoryData(this.category_selected.id).then(() => {
                this.deleteModal = false
                this.category_selected = null
            })
        },

        openEditModal(row) {
            this.category_selected = row.item
            this.editModal = true
        },

        closeEditModal(row) {
            this.category_selected = null
            this.editModal = false
        },

        updateCategory() {
            this.$refs.formEdit.update().then(() => this.closeEditModal())
        },
        
        findCategory() {
            this.getCategoriesData(this.search)
        },

        changePage(val) {
            this.SET_PAGE(val)
        },

        submit() {
            this.$refs.form.submit()
        },
        
    },

    components: {
        'category-form': Category
    },
}
</script>