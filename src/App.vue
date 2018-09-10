<template>
  <div id="app">
    <Header></Header>
    <div class="tab">
      <div class="tab-item">
        <router-link :to="{name:'goods'}">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link :to="{name:'goods'}">评价</router-link>
      </div>
      <div class="tab-item">
        <router-link :to="{name:'goods'}">商家</router-link>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
  import Header from './components/Header/Header';

  export default {
    name: 'App',
    components: {
      Header
    }
  };
</script>

<style lang="less" scoped>
  .tab {
    display: flex;
    height: 40px;
    width: 100%;
    line-height: 40px;
    .tab-item {
      flex: 1;
      text-align: center;
    }
  }
</style>
