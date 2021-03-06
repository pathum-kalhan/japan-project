import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

import VueKonva from 'vue-konva'

Vue.use(VueKonva)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
