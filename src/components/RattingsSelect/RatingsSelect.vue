<template>
  <div class="ratingSelect">
    <div class="rating-type">
      <span>{{desc.all}}</span>
      <span>{{desc.positive}}</span>
      <span>{{desc.negative}}</span>
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
    }
    .switch {
      padding: 12px 18px;
      color: rgb(147,153,159);
      line-height: 24px;
      font-size: 0;
      .icon-check_circle{
        font-size: 24px;
        vertical-align: middle;
      }
      .text{
        font-size: 12px;
        vertical-align: middle;
      }
    }
  }
</style>
