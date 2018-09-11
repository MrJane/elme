<template>
  <div class="header">
    <div class="content-wrapper">
      <div class="avatar">
        <img width="64" height="64" src="" alt="">
      </div>
      <div class="content">
        <div class="title">
          <span class="brand">{{seller.name}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Header',
    props: ['seller'],
    mounted () {
      console.log('seller' + this.seller);
    }
  };
</script>

<style scoped>

</style>
