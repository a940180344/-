<template>
  <div class="home">
    <header class="home-header wrap" :class="{ active: headerScroll }">
      <router-link tag="i" to="./category"
        ><i class="nbicon nbmenu2"></i
      ></router-link>
      <div class="header-search">
        <span class="app-name">lin图城</span>
        <i class="iconfont icon-search"></i>
        <router-link tag="span" class="search-title" to="./product-list"
          >上千图片，等你搜寻</router-link
        >
      </div>
      <router-link class="login" tag="span" to="./login" v-if="!isLogin"
        >登录</router-link
      >
      <router-link class="login" tag="span" to="./user" v-else>
        <van-icon name="manager-o" />
      </router-link>
    </header>
    <swiper :list="swiperList" style="height: 260px"></swiper>
    <div class="category-list">
      <div v-for="item in categoryList" v-bind:key="item.categoryId">
        <router-link to="/category"><i :class="item.imgUrl" @click="fenleidian(item.suo)" style="backgroundcolor: #6087f3" ></i></router-link>
        
        <span>{{ item.name }}</span>
      </div>
    </div>
    <div class="good">
      <header class="good-header">今日美狗</header>
      <div class="good-box">
        <div class="good-item" v-for="item in dogs" :key="item.goodsId">
          <img
            :src="item.urls.thumb"
            alt=""
            style="height: 170px; width: 150px"
          />
          <div class="good-desc">
            <div class="title">
              作者:{{ item.user.first_name }}-{{ item.user.last_name }}
            </div>
            <div class="price" @click="tiaozhang(item.links.html)">
              图片地址(点击跳转)
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="good">
      <header class="good-header">最新推荐</header>
      <div class="good-box">
        <div
          class="good-item"
          v-for="item in LatestPictures"
          :key="item.goodsId"
        >
          <img :src="item.urls.thumb" style="height: 170px; width: 150px" />
          <div class="good-desc">
            <div class="title">
              作者:{{ item.user.first_name }}-{{ item.user.last_name }}
            </div>
            <div class="price" @click="tiaozhang(item.links.html)">
              图片地址(点击跳转)
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="good" :style="{ paddingBottom: '100px' }">
      <header class="good-header">热门图片</header>
      <div class="good-box">
        <div
          class="good-item"
          v-for="item in PopularPictures"
          :key="item.goodsId"
        >
          <img :src="item.urls.thumb" style="height: 170px; width: 150px" />
          <div class="good-desc">
            <div class="title">
              作者:{{ item.user.first_name }}-{{ item.user.last_name }}
            </div>
            <div class="price" @click="tiaozhang(item.links.html)">
              图片地址(点击跳转)
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getLocal } from "@/common/js/utils";
import swiper from "@/components/Swiper";
import { Toast } from "vant";
import { reqHomeRemeng, reqHomexin, reqHomePou } from "../utils/unsplash";
export default {
  name: "Home",
  data() {
    return {
      headerScroll: false,
      isLogin: false,
      swiperList: [
        "https://images.unsplash.com/photo-1647627611823-d08fa901678e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzMTk3ODh8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NTAwOTU5OTA&ixlib=rb-1.2.1&q=80&w=200",
        "https://images.unsplash.com/photo-1647627611823-d08fa901678e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzMTk3ODh8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NTAwOTU5OTA&ixlib=rb-1.2.1&q=80&w=200",
      ],
      hots: [],
      categoryList: [
        {
          name: "美女",
          suo:"gril",
          imgUrl: "iconfont icon-nvren",
          categoryId: 100001,
        },
        {
          name: "风景",
          imgUrl: "iconfont icon-fengjing",
          categoryId: 100003,
          suo:"scenery",
        },
        {
          name: "大象",suo:"elephant",
          imgUrl: "iconfont icon-daxiang",
          categoryId: 100002,
        },
        {
          name: "老鹰",suo:"eagle",
          imgUrl: "iconfont icon-ying",
          categoryId: 100004,
        },
        {
          name: "企鹅",suo:"penguin",
          imgUrl: "iconfont icon-qie",
          categoryId: 100005,
        },
        {
          name: "蝴蝶",suo:"butterfly",
          imgUrl: "iconfont icon-hudie",
          categoryId: 100006,
        },
        {
          name: "老虎",suo:"tiger",
          imgUrl: "iconfont icon-laohu",
          categoryId: 100007,
        },
        {
          name: "鱼",suo:"fish",
          imgUrl: "iconfont icon-yu2",
          categoryId: 100008,
        },
        {
          name: "绵羊",suo:"sheep",
          imgUrl: "iconfont icon-mianyang",
          categoryId: 100009,
        },
        {
          name: "猴子",suo:"Monkey",
          imgUrl: "iconfont icon-gou",
          categoryId: 100010,
        },
      ],
      dogs: [],
      LatestPictures: [],
      PopularPictures: [],
    };
  },
  components: {
    swiper,
  },
  async mounted() {
    window.addEventListener("scroll", this.pageScroll);
    const token = getLocal("token");
    if (token) {
      this.isLogin = true;
    }
    Toast.loading({
      message: "加载中...",
      forbidClick: true,
    });
    let res = await reqHomeRemeng();
    this.dogs = res;
    let resxin = await reqHomexin();
    this.LatestPictures = resxin;
    let resPou = await reqHomePou();
    this.PopularPictures = resPou;
  },
  methods: {
    pageScroll() {
      let scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      scrollTop > 100
        ? (this.headerScroll = true)
        : (this.headerScroll = false);
    },
    tiaozhang(links) {
      window.location.href = links;
    },
    fenleidian(data) {
      this.$store.dispatch('getImg', data)
    },
  },
};
</script>
<style scoped>
  i{
    color: #6087f3;
    height: 30px;
    margin-top: 10px;
    font-size:28px
  }
</style>
<style lang="less" scoped>
@import "../common/style/mixin";
.home {
  .home-header {
    position: fixed;
    left: 0;
    top: 0;
    .wh(100%, 50px);
    .fj();
    line-height: 50px;
    padding: 0 15px;
    .boxSizing();
    font-size: 15px;
    color: #fff;
    z-index: 10000;
    .nbmenu2 {
      color: @primary;
    }
    &.active {
      background: @primary;
      .nbmenu2 {
        color: #fff;
      }
      .login {
        color: #fff;
      }
    }

    .header-search {
      display: flex;
      .wh(74%, 20px);
      line-height: 20px;
      margin: 10px 0;
      padding: 5px 0;
      color: #232326;
      background: rgba(255, 255, 255, 0.7);
      border-radius: 20px;
      .app-name {
        padding: 0 10px;
        color: @primary;
        font-size: 20px;
        font-weight: bold;
        border-right: 1px solid #666;
      }
      .icon-search {
        padding: 0 10px;
        font-size: 17px;
      }
      .search-title {
        font-size: 12px;
        color: #666;
        line-height: 21px;
      }
    }
    .login {
      color: @primary;
      line-height: 52px;
      .van-icon-manager-o {
        font-size: 20px;
        vertical-align: -3px;
      }
    }
  }
  .category-list {
    display: flex;
    flex-shrink: 0;
    flex-wrap: wrap;
    width: 100%;
    padding-bottom: 13px;
    div {
      display: flex;
      flex-direction: column;
      width: 20%;
      text-align: center;
      img {
        .wh(40px, 40px);
        margin: 13px auto 8px auto;
      }
    }
  }
  .good {
    .good-header {
      background: #f9f9f9;
      height: 50px;
      line-height: 50px;
      text-align: center;
      color: @primary;
      font-size: 16px;
      font-weight: 500;
    }
    .good-box {
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
      .good-item {
        box-sizing: border-box;
        width: 50%;
        border-bottom: 1px solid #e9e9e9;
        padding: 10px 0;
        img {
          display: block;
          width: 120px;
          margin: 0 auto;
        }
        .good-desc {
          text-align: center;
          font-size: 14px;
          padding: 10px 10px;
          .title {
            color: #222333;
          }
          .price {
            color: @primary;
          }
        }
        &:nth-child(2n + 1) {
          border-right: 1px solid #e9e9e9;
        }
      }
    }
  }
}
</style>
