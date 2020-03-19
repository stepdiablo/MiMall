<template>
  <div class="nav-bar" :class="{'is_fixed': isFixed}">
    <div class="container">
      <div class="pro-title">{{title}}</div>
      <div class="pro-param">
        <a href="javascript:;">概述</a>
        <span>|</span>
        <a href="javascript:;">参数</a>
        <span>|</span>
        <a href="javascript:;" class="last-section">用户评价</a>
        <slot name="buy"></slot>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "nav-bar",
  props:{
      title:String
  },
  data() {
    return {
      isFixed: false
    };
  },
  mounted() {
    //监测浏览器滚动。
    window.addEventListener("scroll", this.initHeight);
  },
  methods: {
    initHeight() {
      //获取浏览器滚动条滚动的高度。
      let scrollTop =
        window.pageYOffset || //浏览器通用的属性
        document.body.scrollTop || // IE获取滚动条高度的属性
        document.documentElement.scrollTop; //chrome浏览器获取滚动条高度的属性。

      this.isFixed = scrollTop > 152;
    }
  },
  destroyed() {
    //当组件销毁时，移除监听事件，避免影响其他组件。
    //第三个参数是事件行为的处理方式 true（）捕获， false 冒泡
    window.removeEventListener("scroll", this.initHeight, false);
  }
};
</script>
<style lang="scss">
@import "./../assets/scss/config.scss";
@import "./../assets/scss/mixin.scss";
.nav-bar {
  height: 70px;
  line-height: 70px;
  border-top: 1px solid $colorH;
  z-index: 10;
  background-color: $colorG;
  &.is_fixed {
    position: fixed;
    top: 0;
    width: 100%; //为了撑满浏览器的宽度。
    box-shadow: 0 5px 5px $colorE;
  }
  .container {
    @include flex();
    .pro-title {
      font-size: $fontH;
      color: $colorB;
      font-weight: bold;
    }
    .pro-param {
      font-size: $fontJ;
      color: $colorC;
      span {
        margin: 0 10px;
      }
      a {
        color: $colorB;
      }
      a.last-section {
        margin-right: 17px;
      }
    }
  }
}
</style>