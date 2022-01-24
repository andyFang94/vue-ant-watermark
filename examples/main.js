import Vue from 'vue';
import App from './App.vue';
import WaterMark from './../packages/index';

Vue.use(WaterMark);
Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
}).$mount('#app');
