import Vue from 'vue';
import Router from 'vue-router';
import Goods from '@/components/Goods/Goods';
import Ratings from '@/components/Ratings/Ratings';

Vue.use(Router);

export default new Router({
  routes: [
    {path: '/goods', name: 'goods', component: Goods},
    {path: '/ratings', name: 'ratings', component: Ratings}
  ]
});
