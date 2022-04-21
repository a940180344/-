<template>
  <div class="product-list-wrap">
    <div class="product-list-content">
      <header class="category-header wrap">
        <i class="nbicon nbfanhui" @click="goBack"></i>
        <div class="header-search">
          <i class="nbicon nbSearch"></i>
          <input type="text" class="search-title" v-model="keyword" />
        </div>
        <span class="search-btn" @click="getSearch">搜索</span>
      </header>
      <van-tabs type="card" color="#6087f3" @click="changeTab">
        <van-tab title="推荐" name=""></van-tab>
        <van-tab title="新品" name="new" ></van-tab>
        <van-tab title="类型" name="price"></van-tab>
      </van-tabs>
    </div>
    <van-pull-refresh
      v-model="refreshing"
      @refresh="onRefresh"
      class="product-list-refresh"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        @offset="300"
      >
        <!-- <p v-for="item in list" :key="item">{{ item }}</p> -->
        <div
          style="height:130px"
          class="product-item"
          v-for="(item, index) in productList"
          :key="index"
          
        >
          <img :src="item.urls.thumb" />

          <div class="product-info" @click = "tiaozhuan(item.links.html)">
            <h3>《{{ item.alt_description }}》</h3>
            <div>
              <p class="name">喜欢数：{{ item.likes }}</p>
              <span class="price">作者:{{ item.user.first_name }}-{{ item.user.last_name }}</span>
            </div>
          </div>
          <van-button
            slot="right"
            square
            icon="like-o"
            type="default"
            class="shouchangbutton"
            v-model="color"
            @click="shouchang(item)"
          ></van-button>
        </div>
      </van-list>
    </van-pull-refresh>
  </div>
</template>
<script>
import { reqSear } from "../utils/unsplash";
import { Toast } from 'vant'
export default {
  data() {
    return {
      keyword: this.$route.query.keyword || "", // 关键词搜索
      refreshing: false, // 是否是下拉刷新
      loading: false,
      finished: false, // 是否没有更多
      productList: [], // 列表数据
      totalPage: 1000, // 页码总数
      page: 1, // 页码
      orderBy: "",
      query: "", //关键词搜索
      per_page: "6", //一次请求数量
      color:"red",
      arr:[],
      in:0
    };
  },
  mounted() {},
  methods: {
    async init() {
      const { categoryId, from } = this.$route.query;
      if (!categoryId && !this.keyword) {
        // Toast.fail('请输入关键词')
        this.finished = true;
        this.loading = false;
        return;
      }
      const data = await reqSear({
        page: this.page,
        query: this.keyword,
        per_page: "10",
      });
      this.productList = this.productList.concat(data);
      this.loading = false;
      
      if (this.page >= data.totalPage) this.finished = true;
      
    },
    goBack() {
      this.$router.go(-1);
    },
    tiaozhuan(links) {
      window.location.href = links;
    },
    getSearch() {
      this.onRefresh();
    },
    shouchang(item){
      this.$store.commit('shouchangimg', item);
    },
    onLoad() {
      if (!this.refreshing && this.page < this.totalPage) {
        this.page = this.page + 1;
      }
      if (this.refreshing) {
        this.productList = [];
        this.refreshing = false;
      }
      this.init();
    },
    onRefresh() {
      this.refreshing = true;
      this.finished = false;
      this.loading = true;
      this.page = 1;
      this.onLoad();
    },
    changeTab(name, title) {
       let that = this
       let i = 0;
       
      this.arr = document.getElementsByClassName("shouchangbutton");
      for(let y = 0;y<this.arr.length;y++){
        this.arr[y].addEventListener("click",function(){
          var p = that.arr[y];
          
          if(p.classList.contains('active-button')){
            p.classList.remove("active-button")
             Toast.fail("已取消")
          }else{
            p.classList.add("active-button")
            Toast.fail("收藏成功")
          }
          
        })
      }
    },
  },
};
</script>
<style scoped>
#shouchangbutton:hover{
  background-color: rgb(243, 23, 23);
}
.active-button{
  background-color: red;
}
</style>
<style lang="less" scoped>
@import "../common/style/mixin";
.product-list-content {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  z-index: 1000;
  background: #fff;
  .category-header {
    .fj();
    width: 100%;
    height: 50px;
    line-height: 50px;
    padding: 0 15px;
    .boxSizing();
    font-size: 15px;
    color: #656771;
    z-index: 10000;
    &.active {
      background: @primary;
    }
    .icon-left {
      font-size: 25px;
      font-weight: bold;
    }
    .header-search {
      display: flex;
      width: 76%;
      height: 20px;
      line-height: 20px;
      margin: 10px 0;
      padding: 5px 0;
      color: #232326;
      background: #f7f7f7;
      .borderRadius(20px);
      .nbSearch {
        padding: 0 5px 0 20px;
        font-size: 17px;
      }
      .search-title {
        font-size: 12px;
        color: #666;
        background: #f7f7f7;
      }
    }
    .icon-More {
      font-size: 20px;
    }
    .search-btn {
      height: 28px;
      margin: 8px 0;
      line-height: 28px;
      padding: 0 5px;
      color: #fff;
      background: @primary;
      .borderRadius(5px);
      margin-top: 10px;
    }
  }
}
.product-list-refresh {
  margin-top: 78px;
  .product-item {
    .fj();
    width: 100%;
    height: 120px;
    padding: 10px 0;
    border-bottom: 1px solid #dcdcdc;
    img {
      width: 140px;
      height: 120px;
      padding: 0 10px;
      .boxSizing();
    }
    .product-info {
      width: 56%;
      height: 120px;
      padding: 5px;
      text-align: left;
      .boxSizing();
      p {
        margin: 0;
      }
      .name {
        width: 100%;
        max-height: 40px;
        line-height: 20px;
        font-size: 15px;
        color: #333;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .subtitle {
        width: 100%;
        max-height: 20px;
        padding: 10px 0;
        line-height: 25px;
        font-size: 13px;
        color: #999;
        overflow: hidden;
      }
      .price {
        color: @primary;
        font-size: 16px;
      }
    }
  }
}
</style>