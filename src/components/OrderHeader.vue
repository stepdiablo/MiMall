<template>
  <!-- 每个标签要有一个主类，保证各个组件之间的样式是隔离的。虽然可以是用scoped，但是webpack会增加很多冗余的标签，不优化 -->
  <div class="order-header">
    <div class="container clearfix">
      <div class="header-logo">
        <a href="/#/index"></a>
      </div>
      <div class="title">
        <h2>
          {{title}}
          <slot name="tip"></slot>
        </h2>
      </div>
      <div class="username">
        <a href="javascript:;">{{username}}</a>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "order-header",
  props: {
    title: {
      type: String
    }
  },
  computed: {
    ...mapState(["username"])
  }
};
</script>
<style lang="scss">
.order-header {
  padding: 30px 0;
  border-bottom: 2px solid #ff6600;
  .header-logo {
    float: left;
  }
  .title,
  .username {
    display: inline-block;
    height: 55px;
    line-height: 55px;
  }
  .title {
    font-size: 28px;
    float: left;
    color: #333333;
    margin-left: 54px;
    h2 {
      font-size: 28px;
      color: #333333;
    }
    span {
      font-size: 14px;
      margin-left: 17px;
      color: #999999;
      font-weight: 200;
    }
  }
  .username {
    float: right;
    a {
      color: #666666;
      font-size: 16px;
    }
  }
}
</style>