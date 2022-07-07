export const state = () => ({
    isAuth: false, //STATE SEBAGAI TANDAI SUDAH LOGIN JIKA BELUM
    api_token: null //STATE UNTUK DATA API TOKEN
})

export const mutations = {
    //MUTATION UNTUK MENGUBAH STATE DI ATAS
    SET_IS_AUTH(state, payload) {
        state.isAuth = payload
    },
    SET_API_TOKEN(state, payload) {
        state.api_token = payload
    }
}

export const actions = {
    //PERMASALAH BARU AKAN MUNCUL KETIKA HALAMAN DIRELOAD, MAKA STATE ISAUTH AKAN DISET KEMBALI JADI FALSE KARENA PADA DASARKAN STATE AKAN HILANG JIKA HALAMAN DIRELOAD
    //MAKA KITA JALANKAN FUNGSI DIBAWHA INI, DIMANA INI AKAN BERJALAN SECARA OTOMATIS KETIKA APLIKASI KITA DILOAD
    nuxtServerInit({ commit }, context) {
        //KEMUDIAN KITA SET ISAUTH MENYESUAIKAN VALUE DARI STATE AUTHENTICATION
        commit('SET_IS_AUTH', context.app.$auth.$state.loggedIn)
        
        //CEK APAKAH SUDAH LOGIN
        if (context.app.$auth.$state.loggedIn) {
            //MAKA SET API TOKENNYA
            commit('SET_API_TOKEN', context.app.$auth.$state.user.api_token)
        }
    }
}