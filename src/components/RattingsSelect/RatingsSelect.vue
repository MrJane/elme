<template>
  <div class="ratingSelect">
    <div class="rating-type">
      <span class="block positive">{{desc.all}}<span class="count">47</span></span>
      <span class="block positive">{{desc.positive}}<span class="count">20</span></span>
      <span class="block negative">{{desc.negative}}<span class="count">27</span></span>
    </div>
    <div class="switch">
      <span class="icon-check_circle"></span>
      <span class="text">只看有内容的评价</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'RatingsSelect',
    props: {
      desc: {
        type: Object,
        default () {
          return {
            all: '全部',
            positive: '满意',
            negative: '不满意'
          };
        }
      }
    }
  };
</script>

<style lang="less" scoped>
  .ratingSelect {
    .rating-type {
      padding: 18px 0px;
      margin: 0px 18px;
      border-bottom: 1px solid rgba(7, 17, 27, .1);
      font-size: 0;
      .block {
        display: inline-block;
        padding: 8px 12px;
        margin-right: 8px;
        border-radius: 1px;
        font-size: 12px;
        color: rgb(77,85,93);
        &.active{
          color: #fff;
        }
        &.positive {
          background: rgb(0,160,220);
          .count{
            font-size: 8px;
          }
        }
        &.negative{
          background: rgba(77,85,93,.2);
        }
      }
    }
    .switch {
      padding: 12px 18px;
      color: rgb(147, 153, 159);
      line-height: 24px;
      font-size: 0;
      .icon-check_circle {
        font-size: 24px;
        vertical-align: middle;
        margin-right: 4px;
      }
      .text {
        font-size: 12px;
        vertical-align: middle;
      }
    }
  }
</style>
