<template>
  <div class="detail">
    <header>
      <div class="header-returns" v-show="isShow">
        <div @click="goBack">
          <i class="iconfont icon-fanhui"></i>
        </div>
        <div>
          <i class="iconfont icon-kefu"></i>
        </div>
      </div>

      <div class="header-bar" v-show="!isShow" :style="styleOption">
        <div @click="goBack">
          <i class="iconfont icon-fanhui"></i>
        </div>
        <div>
          <span>商品详情</span>
          <span>商品评价</span>
        </div>
        <div>
          <i class="iconfont icon-kefu"></i>
        </div>
      </div>
    </header>
    <section ref="wrapper">
      <div>
        <div class="swiper-main">
          <swiper :options="swiperOption">
            <swiper-slide v-for="(item, index) in swiperList" :key="index">
              <img :src="item.imgUrl" alt="" />
            </swiper-slide>
          </swiper>
          <div class="swiper-pagination"></div>
        </div>
        <div class="goods-price">
          <div class="oprice">
            <span>¥</span>
            <b>{{ goods.price }}</b>
          </div>
          <div class="pprice">
            <span>价格:</span>
            <del>¥{{ goods.price * 1.4 }}</del>
          </div>
        </div>
        <div class="goods-name">
          <h1>{{ goods.bookName }}</h1>
          <div>{{ goods.author }}</div>
        </div>

        <div class="goods-detail">
          <div class="goods-images">
            <img :src="goods.imgUrl" alt="" />
          </div>
          <div class="goods-info">
            <div class="oinfo">
              <span class="info-name">【名称】</span>
              <span class="bookName">{{ goods.bookName }}</span>
            </div>
          </div>
          <div class="goods-info">
            <div class="oinfo">
              <span class="info-sign">【销量】</span>
              <span class="sales">{{ goods.sales }}</span>
            </div>
          </div>
          <div class="goods-info">
            <div class="oinfo">
              <span class="info-sign">【作者】</span>
              <span class="writer">{{ goods.author }}</span>
            </div>
          </div>
          <div class="goods-info">
            <div class="oinfo">
              <span class="info-sign">【出版社】</span>
              <span class="publisher">清华大学出版社</span>
            </div>
          </div>
          <div class="goods-info">
            <div class="oinfo">
              <span class="info-sign">【ISBN】</span>
              <span class="isbn">{{ goods.ISBN }}</span>
            </div>
          </div>
          <div class="goods-images">
            <img :src="goods.imgUrl" alt="" />
          </div>
        </div>
      </div>
    </section>
    <footer>
      <div class="add-cart" @click="addCart">加入购物车</div>
      <div>立即购买</div>
    </footer>
  </div>
</template>

<script>
import "swiper/dist/css/swiper.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";
import BetterScroll from "better-scroll";
import http from "@/common/api/request.js";
import { Toast } from "mint-ui";

export default {
  data() {
    return {
      id: 0,
      goods: {},
      styleOption: {},
      BetterScroll: "",
      isShow: true,
      swiperOption: {
        autoplay: 3000,
        speed: 1000,
        pagination: {
          el: ".swiper-pagination",
          type: "fraction",
        },
      },
      swiperList: [{}],
    };
  },
  components: {
    swiper,
    swiperSlide,
  },
  created() {
    this.id = this.$route.query.id;
    this.getData();
  },
  mounted() {
    this.BetterScroll = new BetterScroll(this.$refs.wrapper, {
      probeType: 3,
      bounce: false,
      click: true,
    });
    this.BetterScroll.on("scroll", (pos) => {
      let posY = Math.abs(pos.y);
      let opacity = posY / 180;

      opacity = opacity > 1 ? 1 : opacity;

      this.styleOption = {
        opacity: opacity,
      };

      if (posY >= 50) {
        this.isShow = false;
      } else {
        this.isShow = true;
      }
    });
  },
  activated() {
    //判断当前url , id和之前id是否一致
    if (this.$route.query.id != this.id) {
      this.getData();
      this.id = this.$route.query.id;
    }
  },
  methods: {
    async getData() {
      let id = this.$route.query.id;
      let res = await http.$axios({
        url: "/api/goods/id",
        params: {
          id,
        },
      });
      this.goods = res;
      this.swiperList[0].imgUrl = this.goods.imgUrl;
    },
    //加入购物车
    addCart() {
      let id = this.$route.query.id;
      http.$axios({
          url: "/api/addCart",
          method: "post",
          data: {
            goodsId: id,
          },
          headers: {
            token: true,
          },
        })
        .then((res) => {
          console.log("结果是")

          if (res.success) {
            Toast("添加购物车成功");
          }
          else{
            Toast("请先登录");
          }
        });
    },
    //返回上一页
    goBack() {
      this.$router.back();
    },
  },
};
</script>

<style scoped lang="scss">
.detail {
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}
header {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 999;
  width: 100%;
  height: 1.173333rem;
  .header-returns {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 1.173333rem;
    div {
      margin: 0 0.266666rem;
      width: 0.933333rem;
      height: 35px;
      line-height: 0.906666rem;
      text-align: center;
      background-color: rgba(0, 0, 0, 0.3);
      border-radius: 50%;
      display: flex;
      align-content: center;
      justify-content: center;
    }
    i {
      font-size: 0.693333rem;
      color: #fff;
    }
  }
  .header-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 1.173333rem;
    font-size: 0.426666rem;
    background-color: #fff;
    span {
      padding: 0 0.266666rem;
    }
    i {
      padding: 0 0.266666rem;
      font-size: 0.586666rem;
    }
  }
}
section {
  flex: 1;
  overflow: hidden;
}
.swiper-main {
  position: relative;
  width: 100%;
  height: 10rem;
  overflow: hidden;
  border-bottom: 2px solid #cccccc;
}
.swiper-container {
  width: 100%;
  height: 10rem;
}
.swiper-container img {
  width: 100%;
  height: 10rem;
}
.swiper-pagination {
  bottom: 0.266666rem;
  width: 100%;
  text-align: right;

  color: #ffffff;
  font-size: 0.426666rem;
}
.swiper-pagination-fraction,
.swiper-pagination-custom,
.swiper-container-horizontal > .swiper-pagination-bullets {
  text-align: center;
  width: 1.0667rem;
  background-color: #b0352f;
  left: 8.4rem;
}
.goods-price {
  padding: 0.2rem 0.266666rem;
  .oprice {
    color: red;
    span {
      font-size: 0.32rem;
    }
  }
  .pprice {
    color: #999999;
    font-size: 0.373333rem;
  }
}
.goods-name {
  padding: 0 0.266666rem;
  border-bottom: 1px solid #cccccc;
  h1 {
    font-size: 0.533333rem;
    font-weight: 500;
  }
  div {
    padding: 0.08rem 0;
    font-size: 0.373333rem;
    color: #999999;
  }
}
.goods-detail {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  > div {
    width: 100%;
  }
  .goods-images {
    img {
      display: block;
      margin: 0 auto;
      width: 9.6rem;
      height: 9.6rem;
    }
  }
  .goods-info {
    padding: 5px 1px;
    border-bottom: 1px solid #cccccc;
    .oinfo {
      span:first-of-type {
        font-size: 22px;
        color: rgb(86, 80, 80);
      }
      span:last-of-type {
        color: rgb(86, 80, 80);
        margin-left: 38px;
        font-size: 20px;
      }
    }
  }
  .publisher {
    color: rgb(86, 80, 80);
    margin-left: 16px;
    font-size: 20px;
  }
  .isbn {
    color: rgb(86, 80, 80);
    margin-left: 30px;
    font-size: 20px;
  }
}

footer {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 1.306666rem;
  border-top: 1px solid #cccccc;
  background-color: #fff;
  div {
    width: 50%;
    line-height: 1.306666rem;
    font-size: 0.426666rem;
    text-align: center;
    color: #fff;
    background-color: red;
    &.add-cart {
      background-color: #ff9500;
    }
  }
}
</style>
