<template>
  <div class="header">
    <div class="content-wrapper">
      <div class="avatar">
        <img width="64" height="64" :src="seller.avatar" alt="">
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{seller.name}}</span>
        </div>
        <div class="description">
          {{seller.description}}/{{seller.deliveryTime}}分钟送达
        </div>
        <div v-if="seller.supports" class="support">
          <!--这加个v-if是防止报错，一开始父组件会把seller传给子组件，但数据是异步请求，所以会把seller默认空对像传过来，就会导致下面seller.supports[0]
          是undfined-->
          <span class="icon"></span>
          <span class="text">{{seller.supports[0].description}}</span>
        </div>
      </div>
    </div>
    <div class="bulletin-wrapper"></div>
  </div>
</template>

<script>
  export default {
    name: 'Header',
    // 这传过来的是个对象，应该设置props seller为对象属性 props不能是数组
    props: ['seller'],
    mounted () {
    }
  };
</script>

<style lang="less" scoped>
  .header {
    color: #fff;
    background-color: red;
    .content-wrapper{
      padding: 24px 12px 18px 24px;
      box-sizing: border-box;
      font-size: 0px;//图片和文字不对齐 可以给父元素设置字体为0，然后再个子元素单独设置字体大小
      .avatar{
        display: inline-block;
      }
      .content{
        display: inline-block;
        font-size: 14px;
        margin-left: 16px;
        .title{
          margin: 2px 0px 8px 0px;
          .brand{
            display: inline-block;
            vertical-align: top;//块级元素和行内元素顶部对齐
            width: 30px;
            height: 18px;
            background-color: green;
          }
          .name{
            font-size: 16px;
            font-weight: bold;
            margin-left: 6px;
            line-height: 18px;
          }
        }
      }
    }
  }
</style>
