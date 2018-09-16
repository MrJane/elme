<template>
  <div class="shopcart">
    <div class="content" @click="toggleList">
      <div class="content-left">
        <div class="logo-wrapper">
          <div class="logo" :class="{'highlight':totalCount>0}">
            <i class="icon-shopping_cart"></i>
          </div>
          <div v-show="totalCount>0" class="num">{{totalCount}}</div>
        </div>
        <div class="price" :class="totalPrice>0">￥{{totalPrice}}</div>
        <div class="desc">另需配送费￥{{deliveryPrice}}元</div>
      </div>
      <div class="content-right">
        <div class="pay" :class="{highlight:payDesc==='去结算'}">{{payDesc}}</div>
        <!--也可以用计算属性payClass
        <div class="pay" :class="payClass">{{payDesc}}</div>
        -->
      </div>
    </div>
    <div class="ball-wrapper">
      <transition name="drop" v-for="(ball,index) in balls" v-show="ball.show" :key="index">
        <div class="ball"></div>
      </transition>
    </div>
    <transition name="fold">
      <div class="shopcart-list" v-show="listShow">
        <div class="list-header">
          <h1 class="title">购物车</h1>
          <span class="empty" @click="empty">清空</span>
        </div>
        <div class="list-content">
          <ul>
            <li v-for="(food,index) in selectFoods" :key="index" class="food">
              <span class="name">{{food.name}}</span>
              <div class="price">￥{{food.price*food.count}}</div>
              <div class="control-wrapper">
                <v-control :food="food"></v-control>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  import CartControl from '../CartControl/CartControl';

  export default {
    name: 'ShopCart',
    // selectFoods是父组件goods选中多少个商品传递过来的，是个数组
    data () {
      return {
        balls: [
          {show: false},
          {show: false},
          {show: false},
          {show: false},
          {show: false}
        ],
        fold: true
      };
    },
    // fold: false这变量用于点击是否展开
    props: {
      deliveryPrice: {default: 0},
      minPrice: {default: 20},
      selectFoods: {
        default () {
          return [{
            price: 10,
            count: 3
          }];
        }
      }
    },
    computed: {
      // totalPrice计算属性依赖selectFoods计算已选商品总价
      totalPrice () {
        let total = 0;
        this.selectFoods.forEach((food) => {
          total += food.price * food.count;
        });
        return total;
      },
      totalCount () {
        let count = 0;
        this.selectFoods.forEach((food) => {
          count += food.count;
        });
        return count;
      },
      payDesc () {
        if (this.totalPrice === 0) {
          return `￥${this.minPrice}元起送`;
        } else if (this.totalPrice < this.minPrice) {
          let diff = this.minPrice - this.totalPrice;
          return `还差￥${diff}元起送`;
        } else {
          return '去结算';
        }
      },
      payClass () {
        if (this.totalPrice < this.minPrice) {
          return 'highlight';
        } else {
          return '';
        }
      },
      listShow () {
        if (!this.totalCount) {
          this.fold = true;
          return false;
        }
        let show = !this.fold;
        return show;
      }
    },
    components: {
      'v-control': CartControl
    },
    methods: {
      toggleList () {
        if (!this.totalCount) {
          return;
        }
        this.fold = !this.fold;
        console.log('1', this.listShow);
        console.log('2', this.fold);
      },
      empty () {
        this.selectFoods.forEach((food) => {
          food.count = 0;
          // 这我们只要把数量清空即可
        });
      }
    }
  };
</script>

<style lang="less" scoped>
  .shopcart {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 48px;
    z-index: 40;
    .content {
      display: flex;
      background-color: #141d27;
      .content-left {
        flex: 1;
        .logo-wrapper {
          display: inline-block;
          position: relative;
          top: -10px;
          padding: 6px;
          margin: 0px 12px;
          width: 56px;
          height: 56px;
          vertical-align: top;
          box-sizing: border-box;
          background-color: #141d27;
          border-radius: 50%;
          .logo {
            width: 100%;
            height: 100%;
            border-radius: 50%;
            text-align: center;
            background-color: #2b343c;
            &.highlight {
              background-color: rgb(0, 160, 220);
              .icon-shopping_cart {
                color: #fff;
              }
            }
            .icon-shopping_cart {
              line-height: 44px;
              font-size: 24px;
              color: rgba(255, 255, 255, .4);
            }
          }
          .num {
            position: absolute;
            top: 0;
            right: 0;
            width: 24px;
            height: 16px;
            line-height: 16px;
            text-align: center;
            border-radius: 16px;
            font-size: 9px;
            color: #fff;
            background: rgb(240, 20, 20);
            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, .4);
          }
        }
        .price {
          display: inline-block;
          vertical-align: top;
          line-height: 24px;
          margin-top: 12px;
          padding-right: 12px;
          box-sizing: border-box;
          border-right: 1px solid rgba(255, 255, 255, .1);
          font-size: 16px;
          font-weight: 700;
          color: rgba(255, 255, 255, .4);
          &.highlight {
            color: #ffffff;
          }
        }
        .desc {
          display: inline-block;
          vertical-align: top;
          line-height: 24px;
          margin-top: 12px;
          margin-left: 12px;
          color: rgba(255, 255, 255, .4);
          font-size: 10px;
        }
      }
      .content-right {
        flex: 0 0 105px;
        width: 105px;
        background-color: #2b333b;
        .pay {
          height: 48px;
          width: 100%;
          line-height: 48px;
          font-size: 12px;
          font-weight: 700;
          text-align: center;
          color: rgba(255, 255, 255, .4);
          &.highlight {
            color: #ffffff;
            background: #00b43c;
          }
        }
      }
    }
    .ball-wrapper {
      .ball {
        position: fixed;
        left: 32px;
        bottom: 22px;
        z-index: 200;
        &.drop-enter-active, &.drop-leave-active {
          transition: all 0.4s linear;
          .inner {
            width: 16px;
            height: 16px;
            border-radius: 50%;
            background-color: rgb(0, 160, 220);
            transition: all .4s;
          }
        }
      }
    }
    .shopcart-list {
      position: absolute;
      top: 0px;
      left: 0px;
      z-index: -1;
      width: 100%;
      /*transition: all .4s;*/
      transform: translate3d(0, -100%, 0);
      /*&.fold-enter-active{*/
      /*transform: translate3d(0,-100%,0);*/
      /*}*/
      /*&.fold-leave-active{*/
      /*transform: translate3d(0,0,0);*/
      /*}*/
      /*&.fold-enter, &.fold-leave-to{*/
      /*transform: translate3d(0,-100%,0);*/
      /*}*/
      .list-header {
        height: 40px;
        padding: 0 18px;
        background-color: #f3f5f7;
        line-height: 40px;
        border-bottom: 1px solid rgba(7, 17, 27, .1);
        .title {
          float: left;
          font-size: 14px;
          color: rgb(7, 17, 27);
        }
        .empty {
          float: right;
          font-size: 12px;
          color: rgb(0, 160, 220);
        }
      }
      .list-content {
        max-height: 217px;
        padding: 0 18px;
        background: #ffffff;
        overflow: hidden;
        .food {
          position: relative;
          padding: 12px 0px;
          box-sizing: border-box;
          border-bottom: 1px solid rgba(7, 17, 27, .1);
          .name {
            font-size: 14px;
            line-height: 24px;
            color: rgb(7, 17, 27);
          }
          .price {
            position: absolute;
            right: 100px;
            bottom: 12px;
            line-height: 24px;
            font-size: 14px;
            color: rgb(240, 20, 20);
            font-weight: 700;
          }
          .control-wrapper {
            position: absolute;
            right: 0px;
            bottom: 6px;
          }
        }
      }
    }
  }
</style>
