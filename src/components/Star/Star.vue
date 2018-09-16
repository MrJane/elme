<template>
  <div class="star" :class="starType">
    <span v-for="(itemClass,index) in itemClasses" :class="itemClass" class="star-item" :key="index"></span>
  </div>
</template>

<script>
  const LENGTH = 5;
  const CLS_ON = 'on';
  const CLS_HALF = 'half';
  const CLS_OFF = 'off';
  export default {
    name: 'Star',
    props: ['size', 'score'],
    computed: {
      starType () {
        return 'star-' + this.size;
      },
      // 难点
      itemClasses () {
        // itemClasses 应该是个数组 我们先定义个数组result
        let result = [];
        // Math.floor向下取整，我们先把分数乘以2取整再除以2
        let score = Math.floor(this.score * 2) / 2;
        // 判断是否半圆，看score是否有小数部分hasDecimal为布尔值
        let hasDecimal = score % 1 !== 0;
        // 向下取整
        let integer = Math.floor(score);
        for (let i = 0; i < integer; i++) {
          result.push(CLS_ON);
        }
        // 如果有小数就给他添加半圆，有半圆只会出现一个不会出现多个所以有就添加一个
        if (hasDecimal) {
          result.push(CLS_HALF);
        }
        // integer可能是小与5的,所以我们要给它不起灰色的off
        while (result.length < LENGTH) {
          result.push(CLS_OFF);
        }
        return result;
      }
    }
  };
</script>

<style lang="less" scoped>
  .star {
    .star-item {
      display: inline-block;
      background-repeat: no-repeat;
    }
    &.star-48 {
      .star-item {
        width: 20px;
        height: 20px;
        margin-right: 22px;
        background-size: 20px 20px;
        &:last-child {
          margin-right: 0px;
        }
        &.on {
          background-image: url("../../../static/img/star48_on@2x.png");
        }
        &.half {
          background-image: url("../../../static/img/star48_half@2x.png");
        }
        &.off {
          background-image: url("../../../static/img/star48_off@2x.png");
        }
      }
    }
    &.star-36 {
      .star-item {
        width: 15px;
        height: 15px;
        margin-right: 6px;
        background-size: 15px 15px;
        &:last-child {
          margin-right: 0px;
        }
        &.on {
          background-image: url("../../../static/img/star36_on@2x.png");
        }
        &.half {
          background-image: url("../../../static/img/star36_half@2x.png");
        }
        &.off {
          background-image: url("../../../static/img/star36_off@2x.png");
        }
      }
    }
    &.star-24 {
      .star-item {
        width: 10px;
        height: 10px;
        margin-right: 3px;
        background-size: 10px 10px;
        &:last-child {
          margin-right: 0px;
        }
        &.on {
          background-image: url("../../../static/img/star24_on@2x.png");
        }
        &.half {
          background-image: url("../../../static/img/star24_half@2x.png");
        }
        &.off {
          background-image: url("../../../static/img/star24_off@2x.png");
        }
      }
    }
  }
</style>
