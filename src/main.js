import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import EdaHttp from './plugins/eda-http'
import VueKonva from 'vue-konva'
import common from './assets/css/common.css'
import style from './assets/css/style.css'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
import VueLodash from 'vue-lodash'
import lodash from 'lodash'
import VueLazyload from 'vue-lazyload'

Vue.config.productionTip = false;
Vue.use(EdaHttp)
Vue.use(common);
Vue.use(style);
Vue.use(VueKonva);
Vue.use(VueAwesomeSwiper)
Vue.use(VueLodash, { name: 'custom', lodash: lodash })
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: './images/error-image.png',
  loading: './images/loading-image.gif',
  attempt: 1
})

new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
