<template>
  <div id="app">
    <v-header :seller="seller"></v-header>
    <div class="tab borderonepx">
      <div class="tab-item">
        <router-link :to="{name:'goods'}">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link :to="{name:'ratings'}">评价</router-link>
      </div>
      <div class="tab-item">
        <router-link :to="{name:'seller'}">商家</router-link>
      </div>
    </div>
    <router-view :seller="seller"></router-view>
    <!--router-view也可以传递属性-->
  </div>
</template>

<script>
  import Header from './components/Header/Header';

  export default {
    name: 'App',
    data () {
      return {
        seller: {}
      };
    },
    components: {
      'v-header': Header
    },
    created () {
      this.$ajax.get('/elme/seller').then((res) => {
        // 报错原因：this.seller = res.data.result 应该要seller赋值给它，
        this.seller = res.data.result.seller;
      });
    }
  };
</script>

<style lang="less" scoped>
  @import "../static/css/mixin.css";

  .tab {
    display: flex;
    height: 40px;
    width: 100%;
    line-height: 40px;
    /*border-bottom: 1px solid rgba(7,17,27,.1); 如果在手机端浏览就不是真实1px 手机端有个dbI概念，物理像素是设备像素两倍在iPhone6下面
    * 在iPhone6预览感觉是2px
    */
    .tab-item {
      flex: 1;
      text-align: center;
      & > a {
        display: block;
        font-size: 14px;
        color: rgb(77, 85, 93);
        &.active {
          color: rgb(240, 20, 20);
        }
      }
    }
  }
</style>
