export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'dw-logistik-nuxt',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],

    // ---> TAMBAHKAN CODE INI UNTUK MENAMBAHKAN EKSTERNAL JAVASCRIPT
    script: [
      { src: "/vendor/jquery/jquery.min.js" },
      { src: "/vendor/bootstrap/js/bootstrap.bundle.min.js" },
      { src: "/vendor/jquery-easing/jquery.easing.min.js" },
      { src: "/js/sb-admin-2.min.js" }
    ]
  },

  // ---> DAN LOAD FILE CSS DI DALAM ATTRIBUTE INI
  // Global CSS: https://go.nuxtjs.dev/config-cs
  css: [
    '@/assets/vendor/fontawesome-free/css/all.min.css',
    '@/assets/css/sb-admin-2.min.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '@/plugins/axios.js'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/auth',
    'bootstrap-vue/nuxt'
  ],

  auth: {
    strategies: {
      //METHOD LOGIN YANG AKAN KITA GUNAKAN
      local: {
        //DIMANA ENDPOINTNYA ADALAH
        endpoints: {
          //UNTUK LOGIN PADA BAGIAN URL, KITA MASUKKAN URL LOGIN DARI API YANG SUDAH KITA BUAT
          //SEDANGKAN PROPERTYNAME ADALAH PROPERTY YANG INGIN KITA AMBIL VALUENYA
          //DALAM HAL INI, LOGIN MENGHARAPKAN TOKEN, SEDANGKAN PADA API KITA ME-RETURN TOKEN DI DALAM OBJECT DATA
          login: { url: '/login', method: 'post', propertyName: 'data' },
          logout: { url: '/logout', method: 'post' },
          user: { url: '/users/login', method: 'get', propertyName: 'data' }
        },
        tokenRequired: true,
        tokenType: 'Bearer '
      }
    }
  },

  //SET BASE URL PROJECT API KITA, SEHINGGA SEMUA REQUEST AKAN MENGARAH KESANA
  axios: {
    baseURL: 'http://dw-logistik-api.test'
  },

  //MIDDLEWARE UNTUK MENGECEK SUDAH LOGIN ATAU BELUM, KITA SET GLOBAL
  router: {
    middleware: ['auth']
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
