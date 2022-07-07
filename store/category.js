export const state = () => ({
    categories: [], //STATE UNTUK MENYIMPAN DATA KATEGORI
    errors: [],
    page: 1
})

export const mutations = {
    //MUTATION UNTUK MENGUBAH VALUE DARI STATE KATEGORI
    SET_CATEGORY_DATA(state, payload) {
        state.categories = payload
    },
    SET_ERRORS(state, payload) {
        state.errors = payload
    },
    SET_PAGE(state, payload) {
        state.page = payload
    }
}

export const actions = {
    //ACTIONS UNTUK MELAKUKAN REQUEST KE API
    getCategoriesData({ commit, state }, payload) {
        let search = payload ? payload:''
        return new Promise((resolve, reject) => {
            //MENGGUNAKAN AXIOS DENGAN TARGET /CATEGORIES
            this.$axios.get(`/categories?q=${search}&page=${state.page}`).then((response) => {
                //JIKA PROSESNYA SELESAI, MAKA DATA YANG DITERIMA DARI API
                //AKAN DISIMPAN KE DALAM STATE CATEGORIES
                commit('SET_CATEGORY_DATA', response.data.data)
                resolve()
            })
        })
    },

    destroyCategoryData({ dispatch, commit }, payload) {
        return new Promise((resolve, reject) => {
            //KIRIM PERMINTAAN KE API UNTUK MENGHAPUS DATA
            this.$axios.delete(`/categories/${payload}`)
            .then(() => {
                //LOAD DATA TERBARU
                dispatch('getCategoriesData')
                resolve()
            })
            .catch((error) => {
                commit('SET_ERRORS', error.response.data)
            })
        })
    },

    storeCategoryData({ dispatch, commit }, payload) {
        return new Promise((resolve, reject) => {
            this.$axios.post('/categories', payload)
            .then(() => {
                dispatch('getCategoriesData')
                resolve()
            })
            .catch((error) => {
                commit('SET_ERRORS', error.response.data)
            })
        })
    },

    updateCategoryData({ dispatch, commit }, payload) {
        return new Promise((resolve, reject) => {
            //MEMBUAT REQUEST KE SERVER UNTUK MEMPERBAHARUI DATA
            this.$axios.put(`/categories/${payload.id}`, payload)
            .then(() => {
                //MENGAMBIL DATA CATEGORY YANG TERBARU
                dispatch('getCategoriesData')
                resolve()
            })
            .catch((error) => {
                commit('SET_ERRORS', error.response.data)
            })
        })
    },
}