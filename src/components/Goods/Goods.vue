<template>
  <div class="goods">
    <div class="menu-wrapper" ref="menuWrapper">
      <ul>
        <li v-for="(item,index) in goods" :key="index" class="menu-item" :class="{'current':currentIndex===index}"
            @click="selectMenu(index)">
          <span class="text borderonepx">
            <span v-if="item.type>0" class="icon" :class="classMap[item.type]"></span>{{item.name}}
          </span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" ref="foodsWrapper">
      <ul>
        <li v-for="(item,index) in goods" :key="index" class="food-list-hook">
          <h1 class="title">{{item.name}}</h1>
          <ul>
            <li v-for="(food,index) in item.foods" :key="index" class="food-item borderonepx" @click="selectFood(food)">
              <div class="icon">
                <img width="57" height="57" :src="food.icon" alt="">
              </div>
              <div class="content">
                <h2 class="name">{{food.name}}</h2>
                <p class="desc">{{food.description}}</p>
                <div class="extra">
                  <span class="count">月售{{food.sellCount}}份</span><span>好评率{{food.rating}}%</span>
                </div>
                <div class="price">
                  <span class="now">￥{{food.price}}</span>
                  <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                </div>
                <div class="control-wrapper">
                  <v-control :food="food"></v-control>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <v-cart :select-foods="selectFoods" :deliveryPrice="seller.deliveryPrice" :minPrice="seller.minPrice"></v-cart>
    <!--需要传配送费及起送费参数到子组件-->
    <v-food :food="selectedFood" ref="food"></v-food>
  </div>
</template>

<script>
  import Bscroll from 'better-scroll';
  import ShopCart from '../ShopCart/ShopCart';
  import CartControl from '../CartControl/CartControl';
  import FoodDetail from '../FoodDetail/FoodDetail';

  export default {
    name: 'Goods',
    data () {
      return {
        goods: [],
        listHeight: [],
        scrollY: 0,
        selectedFood: {}
      };
    },
    props: ['seller'],
    computed: {
      currentIndex () {
        for (let i = 0; i < this.listHeight.length; i++) {
          let preHeight = this.listHeight[i];
          let nextHeight = this.listHeight[i + 1];
          // preHeight 前一个区间的低点度 nextHeight一个区间的高点，当scrollY处于这个之间就能判断处于哪一个区间就返回当前索引
          // 但是i遍历到最后一个值得时候this.listHeight[i + 1]可能是undefined，还要加判断！this.listHeight[i + 1]
          if (!nextHeight || (this.scrollY >= preHeight && this.scrollY < nextHeight)) {
            return i;
          }
          // 没有我们就返回0
          // return 0;
        }
      },
      selectFoods () {
        let foods = [];
        this.goods.forEach((good) => {
          good.foods.forEach((food) => {
            if (food.count) {
              foods.push(food);
            }
          });
        });
        return foods;
      }
    },
    // 我们要实时跟踪这个变量scrollY查看滚动的高度，后面我们利用Bscoll一个方法
    created () {
      this.classMap = ['decrease', 'discount', 'guarantee', 'invoice', 'special'];
      this.$ajax.get('/elme/goods').then((res) => {
        this.goods = res.data.result.goods;
        this.$nextTick(() => {
          this._initScroll();
          this._calHeight();
        });
      });
    },
    mounted () {

    },
    methods: {
      _initScroll () {
        this.menuScroll = new Bscroll(this.$refs.menuWrapper, {
          click: true
        });
        this.foodsScroll = new Bscroll(this.$refs.foodsWrapper, {
          click: true,
          probeType: 3
        });
        // 传一个probeType：3就是为了让foodsScroll告诉我们实时滚动的位置
        this.foodsScroll.on('scroll', (pos) => {
          // 我们还要取这个数的绝对值
          this.scrollY = Math.abs(Math.round(pos.y));
          // 接下来我们要scrollY和listHeigh数组做一个映射，利用计算属性
          console.log(this.currentIndex, 'this.currentIndex');
          console.log('scroll', this.scrollY);
        });
      },
      _calHeight () {
        // 原理首先计算出每个区间的高度即设置类food-list-hook每个元素的高度生成一个数组 listHeight
        // 通过元素获取food-list-hookDom对象
        let foodlist = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook');
        let height = 0;
        // 先添加第一个0高度
        this.listHeight.push(height);
        for (let i = 0; i < foodlist.length; i++) {
          let item = foodlist[i];
          height += item.clientHeight;
          // 后面元素的高度应该是前面元素累加和 多理解
          this.listHeight.push(height);
        }
        // console.log('this.height', this.listHeight);
      },
      selectMenu (index) {
        // 获取所有元素
        let foodlist = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook');
        // 利用index获取滚到对应的元素
        let el = foodlist[index];
        //
        this.foodsScroll.scrollToElement(el, 300);
        console.log(index);
        // console.log(index);this.menuScroll没有初始化click的话点击没效果
      },
      selectFood (food) {
        this.selectedFood = food;
        this.$refs.food.show();
      }
    },
    components: {
      'v-cart': ShopCart,
      'v-control': CartControl,
      'v-food': FoodDetail
    }
  };
</script>

<style lang="less" scoped>
  @import "../../../static/css/mixin.css";

  .goods {
    display: flex;
    width: 100%;
    position: absolute;
    top: 174px; //174px 是header134px 加上tab40px
    bottom: 46px; //46px 是购物车的高度46px
    overflow: hidden;
    .menu-wrapper {
      flex: 0 0 80px;
      width: 80px; //flex 需要加强学习
      background: #f3f5f7;
      .menu-item {
        display: table; //考虑的文字有多行也要垂直居中，所以考虑用table不用block
        height: 54px;
        width: 56px;
        line-height: 14px;
        padding: 0 12px;
        &.current {
          position: relative;
          z-index: 10;
          background-color: #fff;
          margin-top: -1px;
          font-weight: 700;
          .text {
            border: none;
          }
        }
        .icon {
          display: inline-block;
          width: 12px;
          height: 12px;
          margin-right: 2px;
          vertical-align: top;
          /*background: url("../../../static/img/decrease_1@2x.png"); 这个背景图实际项目中应该是后台返回的，我们可以考虑添加:
          class类动态设置背景,可以把所有的类背景写好*/
          background-size: 12px 12px !important;
          &.decrease {
            background: url("../../../static/img/decrease_3@2x.png");

          }
          &.discount {
            background: url("../../../static/img/discount_3@2x.png");
          }
          &.guarantee {
            background: url("../../../static/img/guarantee_3@2x.png");
          }
          &.invoice {
            background: url("../../../static/img/invoice_1@2x.png");
          }
          &.special {
            background: url("../../../static/img/special_3@2x.png");
          }
        }
        .text {
          display: table-cell;
          text-align: center;
          width: 56px;
          vertical-align: middle;
          font-size: 12px;
        }
      }
    }
    .foods-wrapper {
      flex: 1;
      .title {
        padding-left: 14px;
        height: 26px;
        line-height: 26px;
        font-size: 12px;
        border-left: 2px solid #d9dde1;
        color: rgb(147, 153, 159);
        background-color: #f3f5f7;
      }
      .food-item {
        display: flex;
        margin: 18px;
        padding-bottom: 18px;
        &:last-child:after {
          display: none;
          margin-bottom: 0px;
        }
        .icon {
          flex: 0 0 57px;
          margin-right: 10px;
        }
        .content {
          flex: 1;
          .name {
            margin: 2px 0px 8px 0px;
            font-size: 14px;
            line-height: 14px;
            color: rgb(7, 17, 27);
          }
          .desc, .extra {
            font-size: 10px;
            color: rgb(147, 153, 159);
            line-height: 10px;
          }
          .desc {
            margin-bottom: 8px;
          }
          .extra {
            .count {
              margin-right: 12px;
            }
          }
          .price {
            font-weight: 700;
            line-height: 24px;
            .now {
              margin-right: 8px;
              font-size: 14px;
              color: rgb(240, 20, 20);
            }
            .old {
              text-decoration: line-through;
              font-size: 10px;
              color: rgb(147, 153, 159);
            }
          }
          .control-wrapper {
            position: absolute;
            right: 0px;
            bottom: 7px;
          }
        }
      }
    }
  }
</style>
