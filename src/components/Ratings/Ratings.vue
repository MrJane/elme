<template>
  <div class="ratings" ref="rating">
    <div class="rating-content">
      <div class="overview">
        <div class="overview-left">
          <h1 class="score">{{seller.score}}</h1>
          <div class="title">综合评分</div>
          <div class="rank">高于周边商家{{seller.rankRate}}%</div>
        </div>
        <div class="overview-right">
          <div class="score-wrapper">
            <span class="title">服务态度</span>
            <v-star size="36" :score="seller.serviceScore"></v-star>
            <span class="sore">{{seller.serviceScore}}</span>
          </div>
          <div class="score-wrapper">
            <span class="title">商品评分</span>
            <v-star size="36" :score="seller.foodScore"></v-star>
            <span class="sore">{{seller.foodScore}}</span>
          </div>
          <div class="delivery-wrapper">
            <span class="title">送达时间</span>
            <span class="delivery">{{seller.deliveryTime}}分钟</span>
          </div>
        </div>
      </div>
    </div>
    <div class="rating-wrapper">
      <ul>
        <li v-for="(rating,index) in ratings" :key="index" class="rating-item borderonepx">
          <div class="avatar">
            <img width="28" height="28" :src="rating.avatar" alt="">
          </div>
          <div class="content">
            <h1 class="name">{{rating.username}}1313</h1>
            <div class="star-wrapper">
              <v-star size="24" :score="rating.score"></v-star>
              <span class="deliveryTime">{{rating.deliveryTime}}分钟送达</span>
            </div>
            <p class="text">{{rating.text}}</p>
            <div class="recommend" v-show="rating.recommend && rating.recommend.length">
              <span class="icon-thumb_up"></span>
              <span class="tag" v-for="(item,index) in rating.recommend" :key="index">
                {{item}}
              </span>
            </div>
            <div class="time">{{rating.rateTime}}</div>
          </div>
        </li>
      </ul>
    </div>
  </div>
  <!--ratings在iphone5样式会错乱-->
</template>

<script>
  import Star from '../../components/Star/Star';
  import Bscroll from 'better-scroll';

  export default {
    name: 'Ratings',
    props: ['seller'],
    data () {
      return {
        ratings: []
      };
    },
    methods: {
      _initScroll () {
        this.ratingScroll = new Bscroll(this.$refs.rating, {
          click: true
        });
      }
    },
    components: {
      'v-star': Star
    },
    created () {
      this.$ajax.get('/ratings').then((res) => {
        this.ratings = res.data.result.ratings;
        this.$nextTick(() => {
          this._initScroll();
        });
      });
    }
  };
</script>

<style lang="less" scoped>
  .ratings {
    position: absolute;
    top: 174px;
    width: 100%;
    height: 100%;
    /*background: rebeccapurple;*/
    overflow: hidden;
    .overview {
      display: flex;
      padding: 18px 0;
      .overview-left {
        flex: 0 0 137px;
        width: 137px;
        text-align: center;
        padding: 6px 0;
        border-right: 1px solid rgba(7, 17, 27, .1);
        /*在iphone5样式会错乱，加上media*/
        @media only screen and(max-width: 320px) {
          flex: 0 0 120px;
        }
        /*background: aqua;*/
        .score {
          font-size: 24px;
          color: rgb(255, 153, 0);
          line-height: 28px;
          margin-bottom: 6px;
        }
        .title {
          font-size: 12px;
          color: rgb(7, 17, 27);
          line-height: 12px;
          margin-bottom: 8px;
        }
        .rank {
          font-size: 10px;
          line-height: 10px;
          color: rgb(147, 153, 159);
        }
      }
      .overview-right {
        flex: 1;
        padding-left: 24px;
        /*在iphone5样式会错乱，加上media*/
        @media only screen and(max-width: 320px) {
          padding-left: 6px;
        }
        .score-wrapper {
          font-size: 0px;
          margin-bottom: 8px;
          .title {
            display: inline-block;
            vertical-align: top;
            font-size: 12px;
            line-height: 18px;
            color: rgb(7, 17, 27);
          }
          .star {
            display: inline-block;
            vertical-align: top;
            margin: 0px 12px;
          }
          .sore {
            font-size: 12px;
            line-height: 18px;
            color: rgb(255, 153, 0);
          }
        }
        .delivery-wrapper {
          font-size: 0px;
          margin-bottom: 8px;
          .title {
            display: inline-block;
            font-size: 12px;
            line-height: 18px;
            color: rgb(7, 17, 27);
          }
          .delivery {
            display: inline-block;
            margin: 0px 12px;
            font-size: 12px;
            color: rgb(147, 153, 159);
          }
        }
      }
    }
    .rating-wrapper {
      padding: 0 18px;
      .rating-item {
        padding: 18px 0px;
        display: flex;
        .avatar {
          margin-right: 12px;
          img {
            border-radius: 50%;
          }
        }
        .content {
          position: relative;
          flex: 1;
          .name {
            font-size: 10px;
            color: rgb(7, 17, 27);
            line-height: 12px;
          }
          .star-wrapper {
            margin-top: 4px;
            font-size: 0px;
            margin-bottom: 6px;
            .star {
              display: inline-block;
              margin-right: 6px;
              vertical-align: top;
            }
            .deliveryTime {
              font-size: 10px;
              color: rgb(147, 153, 159);
            }
          }
          .text {
            font-size: 12px;
            color: rgb(7, 17, 27);
            line-height: 18px;
            margin-bottom: 8px;
          }
          .recommend {
            .icon-thumb_up {
              display: inline-block;
              vertical-align: top;
              color: rgb(0, 160, 220);
            }
            .tag {
              display: inline-block;
              font-size: 9px;
              margin-right: 8px;
              margin-bottom: 4px;
              line-height: 16px;
              padding: 0px 6px;
              border-radius: 1px;
              border: 1px solid rgba(7, 17, 27, .1);
              color: rgb(147, 153, 159);
            }
          }
        }
      }
    }
    .time {
      position: absolute;
      top: 0;
      right: 0;
      color: rgb(147, 153, 159);
      line-height: 12px;
      font-weight: 200;
    }
  }
</style>
