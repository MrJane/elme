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
          <span class="icon" :class="classMap[seller.supports[0].type]"></span>
          <!--绑定类的时候可以根据返回seller.supports[0].type判定，类型是返回的01234，可以在下面建立对应的数组利用下标-->
          <span class="text">{{seller.supports[0].description}}</span>
        </div>
      </div>
      <!--左边的个数也根据seller.supports显示与否-->
      <div @click="showDetail" v-if="seller.supports" class="support-count">
        <span class="count">{{seller.supports.length}}个</span>
        <span class="iconfonts">></span>
      </div>
    </div>
    <div class="bulletin-wrapper">
      <span class="bulletin-title"></span><span class="bulletin-text">{{seller.bulletin}}</span>
    </div>
    <div class="background">
      <img :src="seller.avatar" alt="" width="100%" height="100%">
    </div>
    <transition name="fade">
      <div v-show="detailShow" class="detail">
        <!--transition 需要学习-->
        <div class="detail-wrapper ">
          <div class="detail-main">
            <h1 class="name">{{seller.name}}</h1>
            <!--星星组件是居中的，居中的样式不要在组件内写死，所以给包一层div居中-->
            <div class="star-wrapper">
              <v-star :size="48" :score="seller.score"></v-star>
            </div>
            <div class="title">
              <div class="line"></div>
              <div class="text">优惠信息</div>
              <div class="line"></div>
            </div>
            <ul v-if="seller.supports" class="supports">
              <li class="support-item" v-for="(item,index) in seller.supports" :key="index">
                <span class="icon" :class="classMap[item.type]"></span>
                <span class="text">{{item.description}}</span>
              </li>
            </ul>
            <div class="title">
              <div class="line"></div>
              <div class="text">商家公告</div>
              <div class="line"></div>
            </div>
            <div class="bulletin">
              <p>{{seller.bulletin}}</p>
            </div>
          </div>
        </div>
        <div @click="hideDetail" class="detail-close">
          <i class="icon-close"></i>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  import Star from '../Star/Star';

  export default {
    name: 'Header',
    // 这传过来的是个对象，应该设置props seller为对象属性 props不能是数组
    props: ['seller'],
    data () {
      return {
        detailShow: false
      };
    },
    methods: {
      showDetail () {
        this.detailShow = true;
      },
      hideDetail () {
        this.detailShow = false;
      }
    },
    mounted () {
    },
    created () {
      // 建立类名数组，当然还有其他方法使用
      this.classMap = ['decrease', 'discount', 'guarantee', 'invoice', 'special'];
    },
    components: {
      'v-star': Star
    }
  };
</script>

<style lang="less" scoped>
  .header {
    position: relative;
    color: #fff;
    overflow: hidden; //下面背景加了模糊效果会有超出，所以设置overflow hidden
    background: rgba(7, 17, 27, .5);
    .content-wrapper {
      position: relative;
      padding: 24px 12px 18px 24px;
      box-sizing: border-box;
      font-size: 0px; //图片和文字不对齐 可以给父元素设置字体为0，然后再个子元素单独设置字体大小
      .avatar {
        display: inline-block;
        img {
          border-radius: 3px;
        }
      }
      .content {
        display: inline-block;
        font-size: 14px;
        margin-left: 16px;
        .title {
          margin: 2px 0px 8px 0px;
          .brand {
            display: inline-block;
            vertical-align: top; //块级元素和行内元素顶部对齐
            width: 30px;
            height: 18px;
            background-image: url("../../../static/img/brand@2x.png");
            background-size: 30px 18px;
            background-repeat: no-repeat;
          }
          .name {
            font-size: 16px;
            font-weight: bold;
            margin-left: 6px;
            line-height: 18px;
          }
        }
        .description {
          margin-bottom: 10px;
          line-height: 12px;
          font-size: 12px;
        }
        .support {
          font-size: 0px;
          .icon {
            display: inline-block;
            width: 12px;
            height: 12px;
            margin-right: 4px;
            vertical-align: top;
            /*background: url("../../../static/img/decrease_1@2x.png"); 这个背景图实际项目中应该是后台返回的，我们可以考虑添加:
            class类动态设置背景,可以把所有的类背景写好*/
            background-size: 12px 12px !important;
            &.decrease {
              background: url("../../../static/img/decrease_1@2x.png");

            }
            &.discount {
              background: url("../../../static/img/discount_1@2x.png");
            }
            &.guarantee {
              background: url("../../../static/img/guarantee_1@2x.png");
            }
            &.invoice {
              background: url("../../../static/img/invoice_1@2x.png");
            }
            &.special {
              background: url("../../../static/img/special_1@2x.png");
            }
          }
          .text {
            font-size: 12px;
            line-height: 12px;
          }
        }
      }
      .support-count {
        position: absolute;
        right: 12px;
        bottom: 18px;
        padding: 0px 18px;
        height: 24px;
        line-height: 24px;
        border-radius: 14px;
        color: red;
        background-color: rgba(0, 0, 0, .2);
        text-align: center;
        .count {
          font-size: 10px;
        }
        .iconfonts {
          font-size: 10px;
        }
      }
    }
    .bulletin-wrapper {
      height: 28px;
      line-height: 28px;
      padding: 0px 22px 0px 12px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      /*font-size: 0;  字体设置零会影响...这个效果，但是不零会影响子元素两span之间有距离，
      解决：span标签不要换行，字体不设零*/
      background: rgba(7, 17, 27, .2);
      .bulletin-title {
        display: inline-block;
        width: 22px;
        height: 12px;
        vertical-align: top;
        margin-top: 8px;
        background-image: url("../../../static/img/bulletin@2x.png");
        background-size: 22px 12px;
      }
      .bulletin-text {
        vertical-align: top;
        font-size: 12px;
        margin: 0 4px;
      }
    }
    .background {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: -1; //设置-1置于下方
      filter: blur(10px); //设置模糊
    }
    .detail {
      position: fixed;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      overflow: auto;
      transition: all 0.5s;
      opacity: 1;
      z-index: 1000;
      background: rgba(7, 17, 27, .8);
      &.fade-enter-active, &.fade-leave-active {
        transition: all 0.5s
      }
      &.fade-enter, &.fade-leave-to {
        opacity: 0;
        background: rgba(7, 17, 27, 0);
      }
      .detail-wrapper {
        min-height: 100%;
        width: 100%;
        overflow: hidden;
        .detail-main {
          margin-top: 64px;
          padding-bottom: 64px;
          box-sizing: border-box;
          .star-wrapper {
            text-align: center;
            margin-top: 18px;
            padding: 2px 0;
          }
          .name {
            line-height: 16px;
            font-size: 16px;
            text-align: center;
            //文字中心对齐并没有中心对齐是因为detail-wrapper 元素加了clearfix类设置inline-block,所以要给detail-wrapper
            //设置宽度100%
            font-weight: bold;
          }
          .title {
            display: flex;
            width: 80%;
            margin: 30px auto;
            .line {
              flex: 1;
              position: relative;
              top: -6px;
              border-bottom: 1px solid rgba(255, 255, 255, .2);
            }
            .text {
              padding: 0 12px;
              font-size: 14px;
            }
          }
          .supports {
            width: 80%;
            margin: 0px auto;
            .support-item {
              padding: 0 12px;
              margin-bottom: 12px;
              font-size: 0;
              &:last-child {
                margin-bottom: 0px;
              }
              .icon {
                display: inline-block;
                width: 16px;
                height: 16px;
                vertical-align: top;
                margin-right: 6px;
                background-size: 16px 16px !important;
                background-repeat: no-repeat;
                &.decrease {
                  background: url("../../../static/img/decrease_1@2x.png");

                }
                &.discount {
                  background: url("../../../static/img/discount_1@2x.png");
                }
                &.guarantee {
                  background: url("../../../static/img/guarantee_1@2x.png");
                }
                &.invoice {
                  background: url("../../../static/img/invoice_1@2x.png");
                }
                &.special {
                  background: url("../../../static/img/special_1@2x.png");
                }
              }
              .text {
                font-size: 12px;
                line-height: 16px;
              }
            }
          }
          .bulletin {
            width: 80%;
            margin: 0 auto;
            p {
              padding: 0 12px;
              line-height: 24px;
              font-size: 12px;
            }
          }
        }
      }
      .detail-close {
        position: relative;
        width: 32px;
        height: 32px;
        font-size: 32px;
        clear: both;
        margin: -64px auto 0 auto; //这个点需要注意因为父元素是整屏高度所以要设置-margin
      }
    }
  }
</style>
