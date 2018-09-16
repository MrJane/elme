<template>
  <transition name="move">
    <div class="food" v-show="showFlag" ref="food">
      <div class="food-content">
        <div class="img-header">
          <img :src="food.image" alt="">
          <div class="back" @click="hide">
            <i class="icon-arrow_lift"></i>
          </div>
        </div>
        <div class="content">
          <h1 class="title">{{food.name}}</h1>
          <div class="detail">
            <span class="sell-count">月售{{food.sellCount}}份</span>
            <span class="rating">好评率{{food.rating}}%</span>
          </div>
          <div class="price">
            ￥<span class="now">{{food.price}}</span>
            <span v-show="food.oldPrice" class="old">￥{{food.oldPrice}}</span>
          </div>
          <div v-show="food.count" class="control-wrapper">
            <v-control :food="food"></v-control>
          </div>
          <div @click="addFirst" class="buy" v-show="!food.count||food.count===0">加入购物车</div>
        </div>
        <v-split v-show="food.info"></v-split>
        <div class="info" v-show="food.info">
          <h1 class="title">{{food.name}}</h1>
          <p class="text">{{food.info}}</p>
        </div>
        <v-split></v-split>
        <div class="rating">
          <h1 class="title">商品评价</h1>
          <v-rating></v-rating>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  import CartControl from '../CartControl/CartControl';
  import Split from '../Split/Split';
  import RatingsSelect from '../RattingsSelect/RatingsSelect';
  import Vue from 'vue';
  import BScroll from 'better-scroll';

  export default {
    name: 'FoodDetail',
    props: ['food'],
    data () {
      return {
        showFlag: false
      };
    },
    methods: {
      show () {
        this.showFlag = true;
        this.$nextTick(() => {
          if (!this.scroll) {
            this.scroll = new BScroll(this.$refs.food, {
              click: true
            });
          } else {
            this.scroll.refresh();
          }
        });
      },
      hide () {
        this.showFlag = false;
      },
      addFirst () {
        Vue.set(this.food, 'count', 1);
      }
    },
    components: {
      'v-control': CartControl,
      'v-split': Split,
      'v-rating': RatingsSelect
    }
  };
</script>

<style lang="less" scoped>
  .food {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 48px;
    width: 100%;
    z-index: 30;
    background: #fff;
    &.move-enter-active, &.move-leave-active {
      transition: all .4s linear;
      transform: translate3d(0, 0, 0);
    }
    &.move-enter, &.move-leave-to {
      transform: translate3d(100%, 0, 0);
    }
    .img-header {
      position: relative;
      width: 100%;
      height: 0;
      padding-top: 100%;
      /*height设置为0 padding-top 100% 这就会根据他自身的宽度设置*/
      img {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
      }
      .back {
        position: absolute;
        top: 10px;
        left: 0;
        .icon-arrow_lift {
          display: block;
          padding: 18px;
          font-size: 20px;
          color: #fff;
        }
      }
    }
    .content {
      position: relative;
      padding: 18px;
      box-sizing: border-box;
      .title {
        font-size: 14px;
        font-weight: 700;
        color: rgb(7, 17, 27);
        line-height: 14px;
        margin-bottom: 8px;
      }
      .detail {
        margin-bottom: 18px;
        font-size: 10px;
        color: rgb(147, 153, 159);
      }
      .price {
        /*margin-bottom: 18px;*/
        font-size: 10px;
        color: rgb(240, 20, 20);
        .now {
          font-size: 14px;
          line-height: 24px;
          color: rgb(240, 20, 20);
          font-weight: 700;
        }
        .old {
          text-decoration: line-through;
          color: rgb(147, 153, 159);
        }
      }
      .control-wrapper {
        position: absolute;
        right: 12px;
        bottom: 12px;
      }
      .buy {
        position: absolute;
        right: 18px;
        bottom: 18px;
        height: 24px;
        width: 74px;
        border-radius: 12px;
        font-size: 10px;
        line-height: 24px;
        color: #fff;
        text-align: center;
        background: rgb(0, 160, 220);
      }
    }
    .info {
      padding: 16px;
      .title {
        font-size: 14px;
        line-height: 14px;
        margin-bottom: 6px;
        color: rgb(7, 17, 27);
      }
      .text {
        font-size: 12px;
        line-height: 24px;
        color: rgb(77, 85, 93);
      }
    }
    .rating {
      padding-top: 18px;
      .title {
        margin-left: 18px;
        font-size: 14px;
        line-height: 14px;
        color: rgb(7, 17, 27);
      }
    }
  }
</style>
