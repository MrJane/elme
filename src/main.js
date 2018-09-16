// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import Axios from 'axios';
import '../static/css/reset.css';
import '../static/css/icon.less';
import '../static/css/index.less';
Vue.prototype.$ajax = Axios;
Axios.defaults.baseURL = ' https://www.easy-mock.com/mock/5b97da6fa7e9571f105d3f97/';

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {App},
  template: '<App/>'
});
