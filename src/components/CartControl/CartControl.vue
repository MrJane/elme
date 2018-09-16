<template>
  <div class="cart-control">
    <transition name="move">
      <div class="cart-decrease" v-show="food.count" @click="decreaseCart">
        <span class="icon-remove_circle_outline inner"></span>
      </div>
    </transition>
    <div v-show="food.count" class="cart-count">{{food.count}}</div>
    <div class="cart-add" @click="addCart">
      <span class="icon-add_circle"></span>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue';

  export default {
    name: 'CartControl',
    props: ['food'],
    created () {
      // console.log(this.food);
    },
    methods: {
      addCart () {
        // 需要在父组件goods为this.foodsScroll添加click:true属性，不然点击事件不会生效
        // console.log('添加');
        if (!this.food.count) {
          // Vue.set 方法需要学习
          Vue.set(this.food, 'count', 1);
        } else {
          this.food.count++;
        }
      },
      decreaseCart () {
        if (this.food.count) {
          this.food.count--;
        }
      }
    }
  };
</script>

<style lang="less" scoped>
  .cart-control {
    font-size: 0;
    .cart-decrease {
      transition: all .5s;
      /*动画需要加强练习*/
      .inner{
        transition: all .5s linear;
      }
      &.move-enter-active, &.move-leave-active {
        opacity: 1;
        transform: translate3d(0, 0, 0);
        .inner{
          display: inline-block;
          transform: rotate(0);
        }
      }
      &.move-enter, &.move-leave-to {
        opacity: 0;
        transform: translate3d(24px, 0, 0);
        .inner{
          transform: rotate(180deg);
        }
      }
    }
    .cart-decrease, .cart-add {
      font-size: 24px;
      line-height: 24px;
      padding: 6px;
      color: rgb(0, 160, 220);
      display: inline-block;
    }
    .cart-count {
      display: inline-block;
      padding: 6px;
      width: 12px;
      line-height: 24px;
      font-size: 10px;
      text-align: center;
      vertical-align: top;
      color: rgb(147, 153, 159);
    }
    .cart-add {
    }
  }
</style>
