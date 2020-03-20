<template>
  <div>
    <order-header title="我的订单">
      <template v-slot:tip>
        <span>温馨提示，以最终交易为准</span>  
      </template>
    </order-header>
    <router-view></router-view>
    <nav-footer></nav-footer>
  </div>
</template>
<script>
import OrderHeader from "./../components/OrderHeader";
import NavFooter from "./../components/NavFooter";
export default {
  name: "order",
  components: { OrderHeader, NavFooter }
};
</script>