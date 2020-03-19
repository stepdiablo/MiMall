<template>
  <div class="product">
    <product-param v-bind:title="product.name">
      <template v-slot:buy>
        <button class="btn" @click="buy">立即购买</button>
      </template>
    </product-param>
    <div class="content">
      <div class="item-bg">
        <h2>{{product.name}}</h2>
        <h3>{{product.subtitle}}</h3>
        <p>
          <a href id>全球首款双频 GP</a>
          <span>|</span>
          <a href id>骁龙845</a>
          <span>|</span>
          <a href id>AI 变焦双摄</a>
          <span>|</span>
          <a href id>红外人脸识别</a>
        </p>
        <div class="price">
          <span>
            ￥
            <em>{{product.price}}</em>
          </span>
        </div>
      </div>
      <div class="item-bg-2"></div>
      <div class="item-bg-3"></div>
      <div class="item-swiper">
        <swiper :options="swiperOption">
          <swiper-slide>
            <img src="/imgs/product/gallery-2.png" alt />
          </swiper-slide>
          <swiper-slide>
            <img src="/imgs/product/gallery-3.png" alt />
          </swiper-slide>
          <swiper-slide>
            <img src="/imgs/product/gallery-4.png" alt />
          </swiper-slide>
          <swiper-slide>
            <img src="/imgs/product/gallery-5.jpg" alt />
          </swiper-slide>
          <swiper-slide>
            <img src="/imgs/product/gallery-6.jpg" alt />
          </swiper-slide>
          <!-- Optional controls -->
          <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
        <p class="desc">小米8 AI变焦双摄拍摄</p>
      </div>
      <div class="item-video">
        <h2>
          60帧超慢动作摄影
          <br />慢慢回味每一瞬间的精彩
        </h2>
        <p>
          后置960帧电影般超慢动作视频，将眨眼间的美妙展现得淋漓尽致！
          <br />更能AI 精准分析视频内容，15个场景智能匹配背景音效。
        </p>
        <!-- //不能使用v-if 否则没有动画效果 这是用transtion实现的。
        <div class="video-bg" @click="showSlide=true"></div>
        <div class="video-box">
          
          <div class="overlay" v-if="showSlide"></div>
          <div class="video" :class="{'slide': showSlide}">
            <span class="icon-close" @click="showSlide=false"></span>

            <video src="/imgs/product/video.mp4" muted autoplay controls="controls"></video>
          </div>     
        </div>-->
        <!-- //不能使用v-if 否则没有动画效果 这是用animation实现的。-->
        <div class="video-bg" @click="showSlide='slideDown'"></div>
        <!-- 当页面变小时，视频就会漏出来，需要隐藏box
        但是动画没有了，需要closevideo 延时让showSlide='' v-show 基于性能考虑-->
        <div class="video-box" v-show="showSlide">
          <div class="overlay"></div>
          <div class="video" v-bind:class="showSlide">
            <span class="icon-close" @click="closeVideo"></span>
            <!-- muted本来是静音功能，但有时由于兼容性的问题autoplay并不能自动播放，此时加上muted，辅助自动播放。 -->
            <video src="/imgs/product/video.mp4" muted autoplay controls="controls"></video>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { swiper, swiperSlide } from "vue-awesome-swiper";
import ProductParam from "./../components/ProductParam";
export default {
  name: "product",
  components: { swiper, swiperSlide, ProductParam },
  data() {
    return {
      //showSlide: false, 这是transtion实现的
      showSlide: "", //控制动画效果  animation动画是通过增减样式实现的。
      //所以showSlide是字符串。
      product: {}, //商品信息
      swiperOption: {
        autoplay: true,
        slidesPerView: 3,
        spaceBetween: 30,
        freeMode: true,
        pagination: {
          el: ".swiper-pagination",
          clickable: true
        }
      }
    };
  },
  mounted() {
    this.getProductInfo();
  },
  methods: {
    getProductInfo() {
      let id = this.$route.params.id;
      this.axios.get(`/products/${id}`).then(res => {
        this.product = res;
      });
    },
    buy() {
      let id = this.$route.params.id;
      this.$router.push(`/detail/${id}`);
    },
    closeVideo() {
      this.showSlide = "slideUp";
      setTimeout(() => {
        this.showSlide = "";
      }, 600);
    }
  }
};
</script>
<style lang="scss">
@import "./../assets/scss/mixin.scss";
.product {
  .content {
    .item-bg {
      background: url("/imgs/product/product-bg-1.png") no-repeat center;
      height: 718px;
      text-align: center;
      h2 {
        font-size: 80px;
        padding-top: 55px;
      }
      h3 {
        font-size: 24px;
        letter-spacing: 10px;
      }
      p {
        margin-top: 21px;
        margin-bottom: 40px;
        a {
          font-size: 16px;
          color: #333333;
        }
        span {
          margin: 0 15px;
        }
      }
      .price {
        font-size: 30px;
        color: #333333;
        em {
          font-style: normal;
          font-size: 38px;
        }
      }
    }
    .item-bg-2 {
      background: url(/imgs/product/product-bg-2.png) no-repeat center;
      height: 480px;
      background-size: 1226px 397px;
    }
    .item-bg-3 {
      background: url(/imgs/product/product-bg-3.png) no-repeat center;
      height: 638px;
      background-size: cover;
    }
    .item-swiper {
      margin: 36px auto 52px;
      .desc {
        font-size: 18px;
        color: #333333;
        text-align: center;
      }
      img {
        width: 100%;
      }
    }
    .item-video {
      height: 1044px;
      background-color: #070708;
      margin-bottom: 76px;
      color: #ffffff;
      text-align: center;
      h2 {
        font-size: 60px;
        padding-top: 82px;
        margin-bottom: 47px;
      }
      p {
        font-size: 24px;
        margin-bottom: 58px;
      }
      .video-bg {
        background: url("/imgs/product/gallery-1.png") no-repeat center;
        background-size: cover;
        width: 1226px;
        height: 540px;
        margin: 0 auto 120px;
        cursor: pointer;
      }
      .video-box {
        .overlay {
          @include position(fixed);
          background-color: #333333;
          opacity: 0.4;
          z-index: 10;
        }
        //下面是使用animation实现的动画效果，animation实现必然是成对出现的
        //有下拉就有上移，有淡入就有淡出。使用@keyframes定义
        //注意，animation只是动画，不会影响属性值。
        @keyframes slideDown {
          from {
            top: -50%;
            opacity: 0;
          }
          to {
            top: 50%;
            opacity: 1;
          }
        }
        @keyframes slideUp {
          from {
            top: 50%;
            opacity: 1;
          }
          to {
            top: -50%;
            opacity: 0;
          }
        }
        .video {
          position: fixed;
          top: -50%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: 10;
          width: 1000px;
          height: 536px;
          // 下面是使用transtion实现的下拉效果。
          // opacity: 0;
          // transition: all .6s;
          // &.slide{
          //   top: 50%;
          //   opacity: 1;
          // }
          //下面是使用animation实现的
          //注意此时opacity一定是1， 动画是通过增减样式实现的。
          opacity: 1;
          &.slideDown {
            animation: slideDown 0.6s linear;
            top: 50%; //动画不影响属性值，所以需要自己更新属性值。
          }
          &.slideUp {
            animation: slideUp 0.6s linear;
            //同理动画不影响属性值，所以不需要更新属性值。
          }
          .icon-close {
            @include bgImg(20px, 20px, "/imgs/icon-close.png");
            position: absolute;
            top: 20px;
            right: 20px;
            cursor: pointer;
            z-index: 11;
          }
          video {
            height: 100%;
            width: 100%;
            object-fit: cover;
            outline: none;
          }
        }
      }
    }
  }
}
</style>