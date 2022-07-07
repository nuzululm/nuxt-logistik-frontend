export const state = () => ({
    users: [] ,
    data:[],
    errors: [],
    page: 1
})

export const mutations = {
    SET_USER_DATA(state, payload) {
        state.users = payload
    },
    SET_DATA(state, payload) {
        state.data = payload
    },
    SET_ERRORS(state, payload) {
        state.errors = payload
    },
    //MUTATION UNTUK MENGUBAH VALUE DARI STATE PAGE
    SET_PAGE(state, payload) {
        state.page = payload
    }
}

export const actions = {
    getUsersData({commit, state}, payload){
        let search = payload ? payload:''
        return new Promise((resolve, reject) => {
            this.$axios.get(`/users?q=${search}&page=${state.page}`).then((response) => {
                commit('SET_USER_DATA', response.data.data)
                resolve()
            })
        })
    },

    storeUsersData({ dispatch, commit }, payload) {
        return new Promise((resolve, reject) => {
            //MENGIRIM REQUEST KE SERVER DENGAN METHOD POST DAN DATA DARI PAYLOAD
            this.$axios.post('/users', payload)
            .then(() => {
                //JIKA BERHASIL, MAKA LOAD DATA TERBARU
                dispatch('getUsersData')
                resolve()
            })
            .catch((error) => {
              //JIKA TERJADI ERROR VALIDASI, SET STATE UNTUK MENAMPUNG DATA ERROR VALIDASINYA
                commit('SET_ERRORS', error.response.data)
            })
        })
    },

    getData({commit}, payload){
        return new Promise((resolve, reject) => {
            this.$axios.get(`/users/${payload}`).then((response) => {
                commit('SET_DATA', response.data.data)
                resolve()
            })
        })
    },

    updateUserData({ dispatch, commit }, payload) {
        return new Promise((resolve, reject) => {
            //MENGIRIM REQUEST KE SERVER DENGAN METHOD PUT DAN DATA DARI PAYLOAD
            this.$axios.put(`/users/${payload.id}`, payload)
            .then(() => {
                //JIKA BERHASIL, MAKA LOAD DATA TERBARU
                dispatch('getUsersData')
                resolve()
            })
            .catch((error) => {
              //JIKA TERJADI ERROR VALIDASI, SET STATE UNTUK MENAMPUNG DATA ERROR VALIDASINYA
                commit('SET_ERRORS', error.response.data)
            })
        })
    },

    destroyUsersData({ dispatch, commit }, payload) {
        return new Promise((resolve, reject) => {
            //MENGIRIM REQUEST KE SERVER DENGAN METHOD DELETE DAN ID DARI PAYLOAD
            this.$axios.delete(`/users/${payload}`)
            .then(() => {
                //JIKA BERHASIL, MAKA LOAD DATA TERBARU
                dispatch('getUsersData')
                resolve()
            })
            .catch((error) => {
              //JIKA TERJADI ERROR VALIDASI, SET STATE UNTUK MENAMPUNG DATA ERROR VALIDASINYA
                commit('SET_ERRORS', error.response.data)
            })
        })
    },
}