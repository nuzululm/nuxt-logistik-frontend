<template>
    <div class="container-fluid">
        <div class="card">
            <div class="card-header">
                <h4 class="card-title">
                    <!-- TOMBOL YANG KETIKA DIKLIK AKAN DIARAHKAN KE HALAMAN ADD USER -->
                    <nuxt-link class="btn btn-primary float-right btn-sm" :to="{name: 'users-add'}">Add New</nuxt-link>
                </h4>
            </div>
            <div class="card-body row">
                <div class="col-md-4 offset-md-8 mb-4">
                  	<!-- FUNGSI PENCARIAN INI AKAN BERFUNGSI KETIKA TOMBOL ENTER DITEKAN -->
                    <input type="text" placeholder="Search" v-model="search" @keypress.enter="findUser" class="form-control">
                </div>
                <div class="col-md-12">
                    <!-- TAG BOOTSTRAP VUE UNTUK TABLE, DIMANA ITEMS ADALAH DATA YANG AKAN DITAMPILKAN, DAN FIELDS AKAN MENJADI HEADER DARI TABLE -->
                    <b-table striped hover :items="users.data" :fields="fields" show-empty responsive>
                        <!-- MEMBUAT CUSTOM DATA YANG AKAN DI-RENDER DI DALAM KOLOM NAME -->
                        <template v-slot:cell(name)="row">
                            <p><strong>{{ row.item.name }}</strong></p>
                            <p>
                                ID: <span class="badge badge-success">{{ row.item.identity_id }}</span> <br>
                                Gender: <span class="badge badge-success">{{ row.item.gender == 1 ? 'Male':'Female' }}</span>
                            </p>
                        </template>
                         <!-- MENAMPILKAN TOMBOL EDIT DAN HAPUS --> 
                        <template v-slot:cell(actions)="row">
                            <!-- TOMBOL EDIT AKAN DIARAHKAN KE HALAMAN BARU --> 
                            <nuxt-link :to="{name: 'users-edit-id', params: {id: row.item.id}}" :key="'edit'+row.index" class="btn btn-warning btn-sm">Edit</nuxt-link>
                            <!-- TOMBOL HAPUS AKAN MEMBUKA MODAL KONFIRMASI --> 
                            <button class="btn btn-danger btn-sm" @click="openDeleteModal(row)">Delete</button>
                        </template>
                    </b-table>

                    <!-- MENAMPILKAN PAGINASI DATA USER, DIMANA V-MODELNYA BERDASARKAN PAGE YANG SEDANG AKTIF --> 
                    <b-pagination
                        align="right"
                        v-model="users.current_page"
                        :total-rows="users.total"
                        :per-page="users.per_page"
                        @change="changePage"
                        aria-controls="my-table"
                    ></b-pagination>
                </div>
                <!-- MODAL INI AKAN DIBUKA, JIKA deleteModal bernilai true -->
                <b-modal v-model="deleteModal" title="Hapus Data User">
                     <!-- TAMPILKAN DATA USER YANG AKAN DIHAPUS -->
                    <p>Kamu yakin ingin menghapus data: <code>{{ user_selected ? user_selected.name : '' }}</code> ?</p>
                    <template v-slot:modal-footer>
                        <div class="w-100 float-right">
                            <b-button
                                variant="secondary"
                                size="sm"
                                @click="deleteModal=false"
                            >
                                Close
                            </b-button>
                            <!-- JIKA TOMBOL INI DITEKAN, MAKA AKAN MENJALANKAN FUNGSI deleteDataUser -->
                            <b-button
                                variant="primary"
                                size="sm"
                                @click="deleteDataUser"
                            >
                                Delete
                            </b-button>
                        </div>
                    </template>
                </b-modal>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapState, mapMutations } from 'vuex'

export default {
    //KETIKA PAGE DILOAD, MAKA FUNGSI INI AKAN DIJALANKAN SECARA OTOMATIS
    //DIMANA KITA MEMANGGIL FUNGSI GETUSERSDATA DARI STORE USER
    async asyncData({store}) {
        await Promise.all([
            store.dispatch('user/getUsersData')
        ])
        return
    },
    data() {
        return {
            //FIELD UNTUK MENJADI HEADER TABLE
            fields: ['name', 'address', 'email', 'phone_number','actions'], 
            items: [],
            deleteModal: false,
            user_selected: null,
            search: '' //MENGHANDLE VALUE PENCARIAN
        }
    },
    watch: {
        //JIKA VALUE PAGE BERUBAH
        page() {
            //MAKA REQUEST DATA BARU
            this.getUsersData(this.search)
        }  
    },
    computed: {
        //SETIAP REQUEST KE API, DATANYA AKAN DISIMPAN KE DALAM STATE YANG ADA DIMASING-MASING MODULE STORE VUEX
        //DALAM HAL INI, DATA USER AKAN DISIMPAN KE DALAM STATE USERS, DI DALAM MODULE USER ATAU USER.JS YANG ADA DI DALAM FOLDER STORE
        ...mapState('user', {
            users: state => state.users,
            page: state => state.page
        })
    },
    methods: {
        ...mapActions('user', ['getUsersData', 'destroyUsersData']),
        ...mapMutations('user', ['SET_PAGE']),
        openDeleteModal(row){
            this.user_selected = row.item
            this.deleteModal = true
        },
        deleteDataUser() {
            //JALANKAN ACTIONS YANG BERISI PERINTAH UNTUK HIT KE API
            //DENGAN MENGIRIMKAN ID USER YANG AKAN DIHAPUS
            this.destroyUsersData(this.user_selected.id).then(() => {
                //JIKA BERHASIL, TUTUP MODAL DAN BERSIHKAN SELECTED USER
                this.deleteModal = false
                this.user_selected = null
            })
        },

        findUser() {
            //LAKUKAN PEMANGGILAN KE API UNTUK MENDAPATKAN DATA BERDASARKAN PENCARIAN
            this.getUsersData(this.search)
        },
        //JIKA PAGINATION DIKLIK, MAKA AKAN MENGESET VALUE PAGE YANG SEDANG AKTIF
        changePage(val) {
            this.SET_PAGE(val)
        }
    }
}
</script>